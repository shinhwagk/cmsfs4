import axios from 'axios';

export function getJdbcServers(monitor: string): Promise<JdbcServer[]> {
  return axios.get(`http://config.cmsfs.org:3000/v1/monitor/${monitor}/server`).then(rep => <JdbcServer[]>rep.data)
}

export function getSshServers(monitor: string): Promise<SshServer[]> {
  return axios.get(`http://config.cmsfs.org:3000/v1/monitor/${monitor}/server`).then(rep => <SshServer[]>rep.data)
}

export function getSshProcess(monitor: string, process: string, name: string) {
  return axios.get(`http://config.cmsfs.org:3000/v1/monitor/${monitor}/process/:process/:name`).then(rep => <SshServer[]>rep.data)
}

export interface JdbcServer {
  kind: string
  name: string
}

export interface SshServer {
  name: string
}