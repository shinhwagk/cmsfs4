import { getSshServers, SshServer } from './api-config'
import { getSshConnect, SshConnect } from './api-connect'
import { ConnectConfig, executeCommand } from './execute-command';
import { sendEs } from './api-es';

const command = `free | sed -n "2p" | awk '{ print "[" $2 "," $4 + $6 "]" }'`

async function boot() {
  const timestamp = new Date().toISOString()

  const servers: SshServer[] = await getSshServers("memoryUsage");
  for (const server of servers) {
    const conn: SshConnect = await getSshConnect(server.name);
    const connConfig: ConnectConfig = {
      host: conn.ip,
      port: conn.port,
      username: conn.user,
      password: conn.password,
      privateKey: require('fs').readFileSync('~/.ssh/id_rsa')
    }
    const rs = await executeCommand(connConfig, command);

    const mon = <number[]>JSON.parse(rs);

    const content = { total: mon[0], free: mon[1], "@timestamp": timestamp, "@metric": "memoryUsage", "@host": conn.name }

    sendEs("monitor", "os", content)
  }
}