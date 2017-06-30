import { getSshServers, SshServer } from './api-config'
import { getSshConnect, SshConnect } from './api-connect'
import { ConnectConfig, executeCommand } from './execute-command';
import { sendEs } from './api-es';
import { sendMonitorError } from './api-error'

const monitorName = "io"

const command = `iostat -d -k -x 1 2 | sed '/^$/d' | sed '1d' | grep -v "^Device"`

async function boot() {
  const timestamp = new Date().toISOString()
  const servers: SshServer[] = await getSshServers(monitorName);

  console.info("monitor server number", servers.length)

  for (const server of servers) {
    processMonitor(server.name, timestamp)
  }
}

function processMonitor(name: string, timestamp: string) {
  getSshConnect(name).then((conn: SshConnect) => {
    const connConfig: ConnectConfig = {
      host: conn.ip,
      port: conn.port,
      username: conn.user,
      privateKey: require('fs').readFileSync('/root/.ssh/id_rsa'),
      readyTimeout: 60 * 1000
    }
    executeCommand(connConfig, command).then((rs: string) => {
      // actionEs(name, rs, timestamp)
      formatResult(rs)
    }).catch(e => sendMonitorError(monitorName, `ssh execute error: ${e}`))
  })
}

function actionEs(host: string, rs: string, timestamp: string) {
  const mon = <number[]>JSON.parse(rs);
  const content = { total: mon[0], free: mon[1], "@timestamp": timestamp, "@metric": monitorName, "@host": host }
  console.info(content)
  sendEs("monitor", "os", content).then(p => console.info(`es ${host} send success`))
}

function formatResult(rs: string) {
  const lines = rs.split("\n");
  const formatLines = lines.map(line => line.split("\s+"))
  console.info(formatLines)
}

setInterval(() => {
  console.info("cron ", new Date())
  boot().catch(e => sendMonitorError(monitorName, e))
}, 1000 * 5)
