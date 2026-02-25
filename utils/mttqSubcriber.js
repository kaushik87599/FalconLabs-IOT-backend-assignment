import mqtt from 'mqtt';
import Sensor from '../models/Sensor.js';

const connectMQTT = () => {
  const client = mqtt.connect('mqtt://broker.hivemq.com');

  client.on('connect', () => {
    console.log('Connected to MQTT Broker 📡');
    // Subscribe to topic with wildcard (+) for deviceId
    client.subscribe('iot/sensor/+/temperature', (err) => {
      if (!err) {
        console.log('Subscribed to topic: iot/sensor/+/temperature');
      }
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const topicParts = topic.split('/');
      const deviceId = topicParts[2];

      const temperature = parseFloat(message.toString());

      if (isNaN(temperature)) throw new Error('Invalid temperature received');

      const newReading = new Sensor({
        deviceId,
        temperature,
        timestamp: Date.now() 
      });

      await newReading.save();
      console.log(`MQTT Ingest: Saved ${temperature}°C for ${deviceId}`);
    } catch (error) {
      console.error('MQTT Processing Error:', error.message);
    }
  });
};

export default connectMQTT;