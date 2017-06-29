import axios from 'axios';

export function sendMonitorError(monitor: string, content: any): void {
  axios.post(`http://notice.cmsfs.org:3000/v1/notice/phone`, content).catch(e => console.error(e))
  return
}

export function sendSystemError(content: string) {
  axios.post(`http://notice.cmsfs.org:3000/v1/notice/phone`, content).catch(e => console.error(e)).catch(e => console.error(e))
  return
}