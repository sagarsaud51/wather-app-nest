import * as assert from 'assert';
import * as dotenv from 'dotenv';

dotenv.config();
const validateEnvConfig = (): void => {
  assert(
    process.env['OPEN_WEATHER_API_KEY'],
    'OPEN_WEATHER_API_KEY key in env file is missing!',
  );
  assert(
    process.env['OPEN_WEATHER__BASE_URL'],
    'OPEN_WEATHER__BASE_URL key in env file is missing!',
  );
  assert(
    process.env['CRON_INTERVAL'],
    'CRON_INTERVAL key in env file is missing!',
  );
  assert(process.env['MONGO_URL'], 'MONGO_URL key in env file is missing!');
};

validateEnvConfig();
const environment = {
  OPEN_WEATHER_API_KEY: process.env['OPEN_WEATHER_API_KEY'],
  OPEN_WEATHER__BASE_URL: process.env['OPEN_WEATHER__BASE_URL'],
  CRON_INTERVAL: process.env['CRON_INTERVAL'],
  MONGO_URL: process.env['MONGO_URL'],
  PORT: parseInt(process.env['PORT']) | 3000,
  LOG_LEVEL: process.env['LOG_LEVEL'] ? process.env['LOG_LEVEL'] : 'info',
};
export default environment;
