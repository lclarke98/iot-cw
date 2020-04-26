CREATE DATABASE if not exists climateSensor;

CREATE TABLE if not exists climateSensor.room(
  room_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name VARCHAR(88) NOT NULL
);

CREATE TABLE if not exists climateSensor.data(
  weatherDataID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  datetime timestamp NOT NULL,
  humidity VARCHAR(88) NOT NULL,
  tempC VARCHAR(88) NOT NULL,
  sensor_ID INT NOT NULL,
  room_id INT NOT NULL,
  FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);

use climateSensor

insert into room (room_name) values ('bedroom1');