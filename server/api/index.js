  
const express = require('express');
const api = express.Router();
const db = require('../db-function');
const bodyParser = require('body-parser')
module.exports = api;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.get('/data', async (req, res) => {
    const room = req.query.room
    console.log(room)
    try {
        res.send(await db.getData(room)) 
    }catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  api.get('/rooms', async (req, res) => {
    try {
        res.send(await db.getRooms()) 
    }catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });