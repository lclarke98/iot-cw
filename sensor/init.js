load('api_config.js');
load('api_dht.js');
load('api_mqtt.js');
load('api_timer.js');

// sets the topic type to state
let topic = '/devices/' + Cfg.get('device.id') + '/state';
// defines the pin
let dht = DHT.create(4, DHT.DHT22);

// timer to send message on interval
Timer.set(50000, true, function() {
  // prepared message
  let msg = JSON.stringify({ temperature: dht.getTemp(), humidity: dht.getHumidity(), roomID: "bedroom", sensorID: "1" });
  // mqtt module used to send the message to the IoT core
  let ok = MQTT.pub(topic, msg, 1);
  print(ok, msg);
}, null);