import axios from 'axios'

import { sendSystemError } from './api-error'

export function sendEs(_index, _type, content): void {
  const url: string = `http://elasticsearch.cmsfs.org:9200/${_index}/${_type}`;
  axios.post(url, content)
    .then((response) => console.log(response))
    .catch((error) => sendSystemError(`es send error: ${error}}`));
}