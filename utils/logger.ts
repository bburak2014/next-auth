// utils/logger.ts
import pino from 'pino';

interface LogMetadata {
  [key: string]: unknown;
}

interface AuthEventData extends LogMetadata {
  userId?: string;
  email?: string | null;
  role?: string;
  provider?: string;
}

interface ApiEventData extends LogMetadata {
  method: string;
  path: string;
  status: number;
  duration: number;
  userId?: string;
}

interface SecurityEventData extends LogMetadata {
  ip?: string;
  path?: string;
  method?: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const createLogger = () => {
  if (typeof window !== 'undefined') {
    return {
      info: (obj: object, msg?: string) => {
        if (isDevelopment) {
          // eslint-disable-next-line no-console
          console.log(msg || 'INFO', obj);
        }
      },
      warn: (obj: object, msg?: string) => {
        console.warn(msg || 'WARN', obj);
      },
      error: (obj: object, msg?: string) => {
        console.error(msg || 'ERROR', obj);
      },
      debug: (obj: object, msg?: string) => {
        if (isDevelopment) {
          // eslint-disable-next-line no-console
          console.log(msg || 'DEBUG', obj);
        }
      }
    };
  }

  return pino({
    level: process.env.LOG_LEVEL || (isProduction ? 'error' : 'debug'),
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => ({ pid: bindings.pid, hostname: bindings.hostname }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    ...(isProduction && {
      redact: ['password', 'email', 'token', 'authorization', 'cookie']
    })
  });
};

export const logger = createLogger();

export const logAuthEvent = (event: string, userId?: string, data?: AuthEventData) => {
  logger.info({ 
    type: 'auth', 
    event, 
    userId,
    ...data 
  }, `Auth event: ${event}`);
};

export const logApiCall = (data: ApiEventData) => {
  if (data.status >= 500) {
    logger.error({ type: 'api', ...data }, `API Error: ${data.method} ${data.path}`);
  } else if (data.status >= 400) {
    logger.warn({ type: 'api', ...data }, `API Warning: ${data.method} ${data.path}`);
  } else if (isDevelopment) {
    logger.info({ type: 'api', ...data }, `API Call: ${data.method} ${data.path}`);
  }
};

export const logError = (error: Error | unknown, context?: string) => {
  if (error instanceof Error) {
    logger.error({ 
      type: 'error',
      message: error.message,
      stack: isProduction ? undefined : error.stack,
      context 
    }, `Error in ${context}: ${error.message}`);
  } else {
    logger.error({ 
      type: 'error',
      error: String(error),
      context 
    }, `Error in ${context}: ${String(error)}`);
  }
};

export const logSecurityEvent = (event: string, data: SecurityEventData) => {
  logger.warn({ 
    type: 'security',
    event,
    ...data 
  }, `Security event: ${event}`);
};