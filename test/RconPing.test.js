const RconPing = require('../lib/RconPing');
const assert = require('assert');

describe('RconPing', () => {
  it('should fail with incorrect password', async () => {
    const rconPing = new RconPing('127.0.0.1', 25575, 'wrong_password');
    try {
      await rconPing.connect();
    } catch (error) {
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.message.includes('Authentication failed'), true);
    }
  });
});
