import { getSshServers, SshServer } from './api-config'
import { getSshConnect, SshConnect } from './api-connect'
import { ConnectConfig, executeCommand } from './execute-command';
import { sendEs } from './api-es';
import { sendMonitorError } from './api-error'

const monitorName = "memoryUsage"

const command = `free | sed -n "2p" | awk '{ print "[" $2 "," $4 + $6 "]" }'`

async function boot() {
  const timestamp = new Date().toISOString()

  const servers: SshServer[] = await getSshServers(monitorName);
  for (const server of servers) {
    const conn: SshConnect = await getSshConnect(server.name);
    const connConfig: ConnectConfig = {
      host: conn.ip,
      port: conn.port,
      username: conn.user,
      privateKey: require('fs').readFileSync('~/.ssh/id_rsa')
    }
    const rs = await executeCommand(connConfig, command);

    const mon = <number[]>JSON.parse(rs);

    const content = { total: mon[0], free: mon[1], "@timestamp": timestamp, "@metric": monitorName, "@host": conn.name }

    sendEs("monitor", "os", content)
  }
}

setInterval(() => boot().catch(e => sendMonitorError(monitorName, e)), 1000 * 60)
