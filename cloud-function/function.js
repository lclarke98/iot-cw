const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 1,
    socketPath: '/cloudsql/iot-cw:europe-west2:iot',
    user: '*******',
    password: '************',
    database: 'climateSensor'
});
exports.handler = function handler(req, res) {
    // converts message sent from nodeMCU
    const data = JSON.parse(Buffer.from(req.data, 'base64').toString());
   try{
    pool.query("INSERT INTO data(humidity, tempC, sensor_ID, room_ID) VALUES (?,?,?,?)", [data.humidity, data.temperature, data.sensorID, data.roomID])
   }catch(error){
       console.log(error)
   }
};