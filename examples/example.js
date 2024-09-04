const RconPing = require('../lib/RconPing');

const hostname = '127.0.0.1';
const port = 25575; // default RCON port
const password = 'your_password';

const rconPing = new RconPing(hostname, port, password);
rconPing.connect()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(`Error validating RCON hostname and port: ${error.message}`);
  });