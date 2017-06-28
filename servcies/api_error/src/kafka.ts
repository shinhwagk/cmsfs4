import * as kafka from 'kafka-node';

const HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.Client('zookeeper-server.cmsfs.org:2181');
const producer = new HighLevelProducer(client);

let kafkaReady = false;

function genPayloads(monitor, error) {
  return [
    { topic: 'notice-phone', messages: JSON.stringify({ phones: ['13917926210'], content: parseError(monitor, error) }) }
  ];
}

function parseError(monitor, content): string {
  const error = content["error"]
  return `monitor:${monitor} - ${error}`
}

producer.on('ready', () => kafkaReady = true);
producer.on('error', (err) => console.error('error', err));

export function sendKafka(monitor, error): void {
  if (kafkaReady) {
    producer.send(genPayloads(monitor, error), (err, data) => {
      if (err) { console.error(err); } else { console.log(data); }
    });
  }
}