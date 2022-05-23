import {connect} from "mqtt";
import config from "../config/config";

export default class LockerService {
  constructor() {}

  static connection = async () => {
    try {
      let result: string = "";
      const {MQTT_HOST, MQTT_CLIENTID, MQTT_PORT} = config;
      const clientId = MQTT_CLIENTID;

      const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;
      const client = await connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: "public",
        password: "public",
        keepalive: 30,
        reconnectPeriod: 1000,
      });

      await client.on("connect", () => {
        console.log("client connected");
        client.publish("devlock", "Hello mqtt");
        client.subscribe("devlock", (err: Error) => {});
      });

      await client.on("message", (topic: string, message: Buffer) => {
        // message is Buffer
        console.log(topic, message.toString());
        result = message.toString();
        client.end();
      });
      return result;
    } catch (error) {
      return null;
    }
  };
}
