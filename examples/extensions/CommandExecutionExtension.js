class CommandExecutionExtension {
  constructor(command) {
    this.command = command;
  }

  execute(context) {
    return new Promise((resolve, reject) => {
      context.rcon.sendCommand(this.command)
        .then((result) => {
          console.log(`Command executed: ${this.command}`);
          console.log(`Response: ${result.response}`);
          resolve(result);
        })
        .catch((error) => {
          console.error(`Error executing command: ${error.message}`);
          reject(error);
        });
    });
  }
}

module.exports = CommandExecutionExtension;