<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/rcon-ping"><img src="https://img.shields.io/npm/dt/rcon-ping?color=4B68F6&style=for-the-badge" alt="NPM Downloads" /></a>
		<a href="https://www.npmjs.com/package/rcon-ping"><img src="https://img.shields.io/npm/v/rcon-ping?color=04DCC6&style=for-the-badge" alt="npm Version" /></a>
	</p>
</div>

# RconPing

A Node.js client for checking if a Minecraft server's RCON is live and exists with the given hostname, port, and password.
Developed by Mehran1022

## Features

- Connect to a Minecraft server using RCON
- Authenticate with the server
- Handle errors and timeouts gracefully
- Modular and maintainable code structure

## Installation
Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):
```sh
npm install rcon-ping
yarn add rcon-ping
pnpm add rcon-ping
```

## Usage
Here’s an example of how to use the RconPing class:

```javascript
const RconPing = require('../lib/RconPing');

const hostname = '0.0.0.0'; // Should be enable-rcon=true in server.properties
const port = 25575; // rcon.port in server.properties
const password = 'yourpassword'; // rcon.password in server.properties

async function main() {
	const client = new RconPing(hostname, port, password)
	try {
		const result = await client.connect()
		console.log(result)
	} catch (error) {
		console.log(error.message)
	}
}
main()
```

## Methods

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
