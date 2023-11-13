import 'dotenv/config';
import { createServer } from 'http';
import app from './application';

const server = createServer(app);
const { PORT, HOST } = process.env;

server.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server shut down.');
    process.exit(0);
  });
});

// Error handling
process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection', reason);
  process.exit(1);
});
