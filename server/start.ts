import MainServer from './index';

// Start the server or run tests
if (process.argv[2] !== 'test') {
  const server = new MainServer();
  server.start(3001);
}
