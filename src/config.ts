import * as dotenv from 'dotenv';
interface Environment {
  [key: string]: string;
}

const requiredEnv = [
  'OPEN_WEATHER_API_KEY',
  'OPEN_WEATHER__BASE_URL',
  'CRON_INTERVAL',
  'MONGO_URL',
];

const initConf = () => {
  dotenv.config();
  const missingKeys: string[] = [];
  const env = {} as Environment;
  for (const key of requiredEnv) {
    if (key in process.env && process.env[key]) {
      env[key] = process.env[key];
    } else {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    console.error(`Missing env vars: ${missingKeys.join(',')}`);
    console.error(
      `Terminating Weather Application!! Please update your environment`,
    );
    process.exit(0);
  }
  if (!parseInt(env['CRON_INTERVAL'])) {
    console.error(
      `Invalid Cron Interval Value [Cron Value = ${env['CRON_INTERVAL']}]`,
    );
    console.error(
      `Terminating Weather Application!! Please update your environment`,
    );
    process.exit(0);
  }
  return env;
};

export const environment: Environment = initConf();
