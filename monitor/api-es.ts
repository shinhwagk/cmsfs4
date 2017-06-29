import axios from 'axios'

import { sendSystemError } from './api-error'

export function sendEs(_index: string, _type: string, content) {
  const url: string = `http://elasticsearch.cmsfs.org:9200/${_index}/${_type}`;
  return axios.post(url, content, { headers: { Authorization: "Basic ZWxhc3RpYzpjaGFuZ2VtZQ==" } })
    .catch((error) => console.info(`es send error: ${error}}`));
}
