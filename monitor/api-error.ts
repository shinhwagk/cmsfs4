import axios from 'axios';

export function sendMonitorError(monitor: string, content: string): void {
  const body = { phones: ["13917926210"], content: `error monitor ${monitor}: ${content}` }
  axios.post(`http://notice.cmsfs.org:3000/v1/notice/phone`, body).catch(e => console.error(e))
  return
}

export function sendSystemError(content: string) {
  axios.post(`http://notice.cmsfs.org:3000/v1/notice/phone`, content).catch(e => console.error(e)).catch(e => console.error(e))
  return
}