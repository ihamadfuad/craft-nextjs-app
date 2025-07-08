// lib/logger.ts

type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private isProd = process.env.NODE_ENV === 'production';

  private format(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }

  info(message: string) {
    if (!this.isProd) console.info(this.format('info', message));
  }

  warn(message: string) {
    if (!this.isProd) console.warn(this.format('warn', message));
  }

  error(message: string) {
    // always log errors
    console.error(this.format('error', message));
  }
}

const logger = new Logger();
export default logger;