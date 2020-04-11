
const express = require('express');
const api = express.Router();
const db = require('../db-function');
const bodyParser = require('body-parser')
var KalmanFilter = require('kalmanjs')
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

api.get('/data', async (req, res) => {
  const room = req.query.room
  try {
    res.send(await db.getData(room))
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

api.get('/currentData', async (req, res) => {
  var kf = new KalmanFilter()
  const room = req.query.room
  console.log(room)
  try {
    let data = await db.getData(room)
    let currentData = []
    let firstReading = data.pop()
    currentData.push(firstReading)
    let secondReading = data.pop()
    currentData.push(secondReading)
    console.log(kf.filter(46.25))
    console.log(kf.filter(28.64))
    res.send(currentData)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})
