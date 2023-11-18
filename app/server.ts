import 'dotenv/config';
import { createServer } from 'http';
import app from './application';
import winston from 'winston';

const server = createServer(app);
const { PORT, HOST } = process.env;

server.listen(PORT, () => {
  winston.info(`Server running on ${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  winston.info('Shutting down server gracefully...');
  server.close(() => {
    winston.info('Server shut down.');
    process.exit(0);
  });
});

// Error handling
process.on('uncaughtException', err => {
  winston.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  winston.error('Unhandled Rejection', reason);
  process.exit(1);
});
