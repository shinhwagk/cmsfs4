import { ConnectConfig, executeCommand } from './execute-command'
import { getSshServers, SshServer, getSshProcess } from './api-config'
import { getSshConnect, SshConnect } from './api-connect'

interface InterfaceCommandToActions {
  monitorName: string
  collectCommand: string
  actions: Map<string, any>
  servers: string[]
  processes: string[]

  timestamp: string
}

class AbstractCommandToActions<T, U> implements InterfaceCommandToActions {
  monitorName: string
  collectCommand: string
  actions: Map<string, any>
  servers = []
  processes = []

  timestamp: string = new Date().toISOString()

  registerActions(name, action) {
    this.processes.push(name)
    this.actions.set(name, action)
  }

  constructor(monitorName: string, collectCommand: string, actions: Map<string, any>) {
    this.monitorName = monitorName
    this.collectCommand = collectCommand
    this.actions = actions
  }

  setServers(): Promise<string[]> {
    return getSshServers(this.monitorName).then(servers => servers.map(s => s.name))
  }

  getConnect(name): Promise<SshConnect> {
    return getSshConnect(name)
  }

  executeCommand(conn: SshConnect): Promise<string> {
    const connConfig: ConnectConfig = { host: conn.ip, port: conn.port, username: conn.user, privateKey: require('fs').readFileSync('/root/.ssh/id_rsa') }
    return executeCommand(connConfig, this.collectCommand)
  }

  formatResult(result: string): T {
    return

  }

  executeAction<Z>(result: T, process: string, name: string, action: Z) {
    getSshProcess(this.monitorName, process, name)
  }
}

interface CommandToActions<T, U> extends AbstractCommandToActions<T, U> {
  select(): void;
}
