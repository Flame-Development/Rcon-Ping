const net = require('net');
const ExtensionManager = require('./ExtensionManager');

class RconPing {
  constructor(hostname, port, password) {
    this.hostname = hostname;
    this.port = port;
    this.password = password;
    this.socket = new net.Socket();
    this.socket.setTimeout(20000); // 20-second timeout
    this.extensionManager = new ExtensionManager();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket.connect(this.port, this.hostname, () => {
        const authRequestPacket = this.createAuthRequestPacket();
        this.socket.write(authRequestPacket);

        let response = Buffer.alloc(0);
        this.socket.on('data', (chunk) => {
          response = Buffer.concat([response, chunk]);
          this.handleData(response, resolve, reject);
        });

        this.socket.on('end', () => {
          if (response.length < 12) {
            this.handleError(`Port ${this.port} is not responding as an RCON server.`, reject);
          }
        });
      });

      this.socket.on('error', (error) => {
        this.handleError(`Error connecting to RCON server: ${error.message}`, reject, error);
      });

      this.socket.on('timeout', () => {
        this.handleError(`Timeout connecting to RCON server at ${this.hostname}:${this.port}`, reject);
      });
    });
  }

  createAuthRequestPacket() {
    const packet = Buffer.alloc(14 + this.password.length);
    packet.writeInt32LE(10 + this.password.length, 0); // Packet size
    packet.writeInt32LE(0, 4); // Request ID
    packet.writeInt32LE(3, 8); // Type (3 = AUTH)
    packet.write(this.password, 12, this.password.length, 'utf8');
    packet.writeInt16LE(0, 12 + this.password.length); // Two null bytes
    return packet;
  }

  handleData(response, resolve, reject) {
    if (response.length >= 12) {
      const requestId = response.readInt32LE(4);
      const type = response.readInt32LE(8);

      if (requestId === -1) {
        this.handleError(`Authentication failed: Incorrect password for RCON server at ${this.hostname}:${this.port}`, reject);
      } else if (type === 2) {
        const result = {
          success: true,
          message: `Successfully authenticated with RCON server at ${this.hostname}:${this.port}`,
          details: { hostname: this.hostname, port: this.port },
          rcon: this,
        };
        this.extensionManager.executeAll(result).then(() => {
          this.cleanup();
          resolve(result);
        }).catch((err) => {
          this.handleError(`Error executing extensions: ${err.message}`, reject, err);
        });
      } else {
        this.handleError(`Invalid response from RCON server at ${this.hostname}:${this.port}`, reject);
      }
    }
  }

  handleError(message, reject, error = null) {
    const result = {
      success: false,
      message,
      details: { hostname: this.hostname, port: this.port, error: error ? error.message : undefined },
    };
    this.cleanup();
    reject(result);
  }

  sendCommand(command) {
    return new Promise((resolve, reject) => {
      const commandPacket = this.createCommandPacket(command);
      this.socket.write(commandPacket);

      let response = Buffer.alloc(0);
      this.socket.on('data', (chunk) => {
        response = Buffer.concat([response, chunk]);
        this.handleCommandResponse(response, resolve, reject);
      });

      this.socket.on('error', (error) => {
        this.handleError(`Error sending command to RCON server: ${error.message}`, reject, error);
      });

      this.socket.on('timeout', () => {
        this.handleError(`Timeout sending command to RCON server at ${this.hostname}:${this.port}`, reject);
      });
    });
  }

  createCommandPacket(command) {
    const packet = Buffer.alloc(14 + command.length);
    packet.writeInt32LE(10 + command.length, 0); // Packet size
    packet.writeInt32LE(1, 4); // Request ID
    packet.writeInt32LE(2, 8); // Type (2 = COMMAND)
    packet.write(command, 12, command.length, 'utf8');
    packet.writeInt16LE(0, 12 + command.length); // Two null bytes
    return packet;
  }

  handleCommandResponse(response, resolve, reject) {
    if (response.length >= 12) {
      const requestId = response.readInt32LE(4);
      const type = response.readInt32LE(8);

      if (requestId === 1 && type === 0) {
        const body = response.slice(12, response.length - 2).toString('utf8');
        const result = {
          success: true,
          message: `Command executed successfully on RCON server at ${this.hostname}:${this.port}`,
          response: body,
        };
        resolve(result);
      } else {
        this.handleError(`Invalid response from RCON server at ${this.hostname}:${this.port}`, reject);
      }
    }
  }

  cleanup() {
    this.socket.destroy();
  }
}

module.exports = RconPing;