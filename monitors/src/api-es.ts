import * as axios from 'axios'

export function sendEs(_index, _type, content) {
  const url = `http://elasticsearch.cmsfs.org:9200/${_index}/${_type}`;
  axios.post(url, content)
    .then((response) => console.log(response))
    .catch((error) => sendError(`send es error: ${error}}`));
}