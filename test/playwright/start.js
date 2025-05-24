const { spawn, spawnSync } = require('child_process');
const { setTimeout } = require('timers/promises');
const path = require('path');
const kill = require('tree-kill');
const net = require('net');

const PORT = 3002;

const isPortAvailable = async (port) => {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.close();
        resolve(true);
      })
      .listen(port);
  });
}

(async () => {
  const rootDir = path.resolve(__dirname, '../..');
  const playwrightConfigPath = path.resolve(__dirname, './playwright.config.js')

  const available = await isPortAvailable(PORT);
  if (!available) {
    console.error(`[test] ❌ Port ${PORT} is already in use`);
    process.exit(1);
  }

  const server = spawn('npx', ['serve', rootDir, '--listen', `${PORT}`], {
    stdio: 'inherit',
    shell: true
  });

  console.log(`[test] ✅ Server is starting at http://localhost:${PORT}`);

  await setTimeout(2000); // wait for serve to start

  const result = spawnSync('npx', ['playwright', 'test', '--config', playwrightConfigPath], {
    stdio: 'inherit',
    shell: true
  });

  console.log('[test] 🔻 Stopping the server...');
  kill(server.pid, 'SIGTERM', (err) => {
    if (err) {
      console.error('[test] Failed to kill server:', err);
      process.exit(1);
    } else {
      process.exit(result.status);
    }
  });
})();
