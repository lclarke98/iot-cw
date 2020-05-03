const express = require('express');
const api = express.Router();
const db = require('../db-function');
const bodyParser = require('body-parser')
const KalmanFilter = require('kalmanjs')
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
  
  const room = req.query.room
  console.log(room)
  try {
    let data = await db.getData(room)
    let currentData = []
    let firstReading = data.pop()
    currentData.push(firstReading)
    let secondReading = data.pop()
    currentData.push(secondReading)
    test()
    test1()
    res.send(currentData)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})


async function test(){
  var kf = new KalmanFilter()
  let data = await db.getData("bedroom")
  let temp
  for(let i = 0; i < data.length; i++){
    temp = kf.filter(parseInt(data[i].tempC))
  }
  
  console.log(temp)
}

async function test1(){
  var kf = new KalmanFilter()
  let data = await db.getData("bedroom")
  let humi
  for(let i = 0; i < data.length; i++){
    humi = kf.filter(parseInt(data[i].humidity))
  }
  
  console.log(humi)
}