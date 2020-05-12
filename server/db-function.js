const mysql = require('mysql2/promise')
const config = require('./db-config')
const connection = mysql.createConnection(config.mysql)

module.exports.getData = async (room) => {
    let con = await connection
    let [list] = await con.query("SELECT datetime, tempC, humidity, room.room_id FROM data INNER JOIN room ON data.room_id = room.room_id  where room_name = ? ",[room])
    return list
}

module.exports.getRooms = async () => {
    let con = await connection
    let [list] = await con.query("SELECT * FROM room")
    return list
}
