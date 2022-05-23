import {connect, MqttClient} from "mqtt";
import config from "../config/config";
export default class LockerService {
  constructor() {}

  static connection = async (): Promise<MqttClient | undefined> => {
    try {
      const {MQTT_HOST, MQTT_CLIENTID, MQTT_PORT} = config;
      const clientId = MQTT_CLIENTID;

      const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;
      const client: MqttClient = await connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: "public",
        password: "public",
        keepalive: 30,
        reconnectPeriod: 1000,
      });
      return client;
    } catch (error) {
      console.log(error);
    }
  };
}
