  
const fs = require('fs');
const mysql = require('mysql2/promise')
const config = require('./db-config')
const connection = mysql.createConnection(config.mysql)

module.exports.getData = async (room) => {
    let con = await connection
    let [list] = await con.query("SELECT * FROM data")
    return list
}

module.exports.getRooms = async () => {
    let con = await connection
    let [list] = await con.query("SELECT * FROM room")
    return list
}
