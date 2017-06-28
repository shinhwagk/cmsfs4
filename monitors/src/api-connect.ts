import axios from 'axios';

export function getJdbcConnect(kind: string, name: string): Promise<JdbcConnect> {
  return axios.get(`/v1/connect/jdbc/${kind}/${name}`).then(p => <JdbcConnect>p.data)
}

export function getSshConnect(name: string): Promise<SshConnect> {
  return axios.get(`/v1/connect/ssh/${name}`).then(rep => <SshConnect>rep.data)
}

export interface JdbcConnect {
  name: string
  kind: string
  ip: string
  port: number
  protocol: string
  service: string
  user: string
  password: string
}

export interface SshConnect {
  name: string
  ip: string
  port: number
  user: string
  password: string
  privateKey: string
}