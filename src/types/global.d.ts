namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    MQTT_HOST: string;
    MQTT_PORT: string;
    MQTT_CLIENTID: string;
  }
}
