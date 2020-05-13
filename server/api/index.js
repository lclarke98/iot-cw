const express = require('express');
const api = express.Router();
const db = require('../db-function');
const bodyParser = require('body-parser')
const KalmanFilter = require('kalmanjs') // npm package used for kalman filter
module.exports = api;

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.get('/rooms', async (req, res) => {
  try {
    res.send(await db.getRooms())
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
});

//gets all data for a room to display history
api.get('/data', async (req, res) => {
  const room = req.query.room
  try {
    res.send(await db.getData(room))
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

// gets all data for a room to then be filtered
api.get('/currentData', async (req, res) => {
  const room = req.query.room
  try {
    let temp = await kalmanTemp(room)
    let humi = await kalmanHumidity(room)
    res.status(200).json({tempC:temp, humidity:humi})
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

// filters all temp data for a room returns a filtered value
async function kalmanTemp(room){
  // new filter created
  var kf = new KalmanFilter()
  let data = await db.getData(room)
  let temp
  // loop to increment through the array passing data to filter
  for(let i = 0; i < data.length; i++){
    temp = kf.filter(parseInt(data[i].tempC))
  }
  return temp
}

// filters all humidity data for a room returns a filtered value
async function kalmanHumidity(room){
  var kf = new KalmanFilter()
  let data = await db.getData(room)
  let humi
  // loop to increment through the array passing data to filter
  for(let i = 0; i < data.length; i++){
    humi = kf.filter(parseInt(data[i].humidity))
  }
  return humi
}