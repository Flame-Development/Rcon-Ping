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
