const { spawn, spawnSync } = require('child_process');
const { setTimeout } = require('timers/promises');
const path = require('path');
const kill = require('tree-kill');
const net = require('net');
const http = require('http');

const PORT = 3002;
const SERVER_TIMEOUT = 30000;
const POLL_INTERVAL = 500;

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

const waitForServer = async (port, timeout = SERVER_TIMEOUT) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
          res.resume();
          resolve();
        });
        req.on('error', reject);
        req.setTimeout(1000, () => {
          req.destroy();
          reject(new Error('timeout'));
        });
      });
      return true;
    } catch {
      await setTimeout(POLL_INTERVAL);
    }
  }
  return false;
};

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

  const isReady = await waitForServer(PORT);
  if (!isReady) {
    console.error(`[test] ❌ Server did not start within ${SERVER_TIMEOUT / 1000}s`);
    kill(server.pid, 'SIGTERM');
    process.exit(1);
  }

  console.log(`[test] ✅ Server is ready`);

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
