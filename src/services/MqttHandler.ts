import {connect, MqttClient} from "mqtt";
import config from "../config/config";

class MqttHandler {
  mqttClient: MqttClient | null;
  username: string;
  password: string;
  subscribeTopics: string[];
  status: string | null;
  constructor() {
    this.mqttClient = null;
    this.username = "YOUR_USER"; // mqtt credentials if these are needed to connect
    this.password = "YOUR_PASSWORD";
    this.subscribeTopics = ["lock/#"];
    this.status = null;
  }
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    const {MQTT_HOST, MQTT_PORT} = config;

    const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;

    this.mqttClient = connect(connectUrl, {
      username: this.username,
      password: this.password,
    });

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient?.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
      this.mqttClient?.publish("hello world", "");
    });

    // mqtt subscriptions

    this.subscribeTopics.forEach((topic) => {
      this.mqttClient?.subscribe(topic);
    });

    // When a message arrives, console.log it
    this.mqttClient.on("message", (topic, message) => {
      console.log(message.toString());
      let [_, lockId, msesageType] = topic.split("/");
      if (msesageType === "opened") {
        this.status = "opened";
      }
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic
  openLock(topic: string, message: string = "") {
    this.mqttClient?.publish(topic, message);
  }

  sendLockStatus() {
    return this.status;
  }
}

export default MqttHandler;
