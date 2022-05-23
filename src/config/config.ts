import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  DB_HOST: string | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  MQTT_HOST: string | undefined;
  MQTT_PORT: string | undefined;
  MQTT_CLIENTID: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  MQTT_HOST: string;
  MQTT_PORT: string;
  MQTT_CLIENTID: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    MQTT_HOST: process.env.MQTT_HOST,
    MQTT_PORT: process.env.MQTT_PORT,
    MQTT_CLIENTID: process.env.MQTT_CLIENTID,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

let config = getConfig();

config = getSanitzedConfig(config);

export default config;
