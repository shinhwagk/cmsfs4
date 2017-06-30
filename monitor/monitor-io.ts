import { getSshServers, SshServer } from './api-config'
import { getSshConnect, SshConnect } from './api-connect'
import { ConnectConfig, executeCommand } from './execute-command';
import { sendEs } from './api-es';
import { sendMonitorError } from './api-error'

const monitorName = "io"

const command = `iostat -d -k -x 5 2 | sed '/^$/d' | sed '1d' | grep -v "^Device"`

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
      formatResult(rs).forEach(m => {
        m["@timestamp"] = timestamp
        m["@metric"] = monitorName
        m["@host"] = name
        console.info(m)
        actionEs(name, m)
      })
    }).catch(e => sendMonitorError(monitorName, `ssh execute error: ${e}`))
  })
}

function actionEs(name, content) {
  // const mon = <number[]>JSON.parse(rs);
  // const content = { total: mon[0], free: mon[1], "@timestamp": timestamp, "@metric": monitorName, "@host": host }
  // console.info(content)
  sendEs("monitor", "os", content).then(p => console.info(`es ${name} send success`))
}

function formatResult(rs: string) {
  const lines = rs.split("\n").filter(p => p.length >= 1);
  const formatLines = lines.map(line => line.split(/\s+/))
  const map = new Map<string, string[]>()
  formatLines.forEach(f => map.set(f[0], f))
  const result = []
  map.forEach((v: string[], k: string) => {
    // Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await  svctm  %util
    const m = {
      "Device": v[0], "rrqm/s": Number(v[1]), "wrqm/s": Number(v[2]), "r/s": Number(v[3]), "w/s": Number(v[4]), "rkB/s": Number(v[5]), "wkB/s": Number(v[6]),
      "avgrq-sz": Number(v[7]), "avgqu-sz": Number(v[8]), "await": Number(v[9]), "svctm": Number(v[10]), "util": Number(v[11])
    }
    result.push(m)
  })
  return result
}

setInterval(() => {
  console.info("cron ", new Date())
  boot().catch(e => sendMonitorError(monitorName, e))
}, 1000 * 5)
