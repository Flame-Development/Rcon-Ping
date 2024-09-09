const RconPing = require('../lib/RconPing');
const CommandExecutionExtension = require('./extensions/CommandExecutionExtension');

// const rcon = new RconPing('localhost', 25575, 'your_password');
const rcon = new RconPing('localhost', 25575, 'happy');
const commandExtension = new CommandExecutionExtension('ban me');

rcon.extensionManager.register(commandExtension);

rcon.connect().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error.message);
});
