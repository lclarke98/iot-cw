CREATE DATABASE if not exists climateSensor;

CREATE TABLE if not exists climateSensor.room(
  room_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name VARCHAR(88) NOT NULL
)

CREATE TABLE if not exists climateSensor.data(
  weatherDataID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  datetime timestamp NOT NULL,
  humidity VARCHAR(88) NOT NULL,
  tempC VARCHAR(88) NOT NULL,
  room_name VARCHAR(88) NOT NULL,
  FOREIGN KEY (room_name) REFERENCES room(room_name) ON DELETE CASCADE
)

insert into room (room_name) values ('bedroom');