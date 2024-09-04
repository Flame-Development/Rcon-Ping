# RconPing

A Node.js client for checking if a Minecraft server's RCON is live and exists with the given hostname, port, and password.
Developed by Mehran1022

## Features

- Connect to a Minecraft server using RCON
- Authenticate with the server
- Handle errors and timeouts gracefully
- Modular and maintainable code structure

## Installation

To install the package, use npm:

```bash
npm install rcon-ping
```

## Usage
Here’s an example of how to use the RconPing class:

```javascript
const RconPing = require('rcon-ping');

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
```

## API

`RconPing`
`constructor(hostname, port, password)`

Creates a new instance of the RconPing class.

- `hostname` (string): The hostname of the Minecraft server.
- `port` (number): The port of the Minecraft server.
- `password` (string): The RCON password for the Minecraft server.

`connect()`
Connects to the Minecraft server and authenticates using the provided hostname, port, and password.
Returns a promise that resolves with a success message or rejects with an error message.

## Error Handling
The connect method provides detailed error messages for various scenarios, such as incorrect passwords, connection timeouts, and invalid responses from the server.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes.
