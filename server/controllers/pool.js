const db = require('../db/database.js');
const Bluebird = require('bluebird');

exports.getTripsForPool = async (data) => {
  try {
    data.when = new Date(data.when);
    let query = `SELECT H.id AS rideId, H.capacity, H.origin, H.destination, H.when,
    U.name, U.email, U.phone,
    CASE WHEN H.when < current_timestamp THEN 1
    ELSE 0 END AS isCompleted
    FROM hosts H
    LEFT JOIN users U ON U.username = H.username
    WHERE H.origin = $1 AND H.destination = $2 AND H.capacity > 0
    AND H.when >= current_timestamp AND H.when <= $3`;
    let trips = await db.query(query, [data.origin, data.destination, data.when]);
    return {
      success: true,
      trips: trips.rows
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

let getPassengerDetails = async (rideId) => {
  let query = `SELECT P.username
    FROM passengers P
    WHERE P.rideId = $1`;
  let passengerData = await db.query(query, [rideId]);
  let passengersData = passengerData.rows;
  let passengers = []
  await Bluebird.each(passengersData, async (element) => {
    passengers.push(element.username);
  })
  return passengers;
}

let getHostDetails = async (rideId) => {
  let query = `SELECT U.name, U.username, U.phone, U.email
    FROM hosts H
    LEFT JOIN users U ON U.username = H.username
    WHERE H.id = $1`;
  let hostData = await db.query(query, [rideId]);
  return hostData.rows[0];
}

exports.getAllPools = async (username) => {
  try {
    let query = `SELECT H.id AS rideId, H.capacity, H.origin, H.destination, H.when,
    CASE WHEN H.when < current_timestamp THEN 1
    ELSE 0 END AS isCompleted,
    CASE WHEN R.status = 1 THEN 'accepted'
    	 WHEN R.status = 2 THEN 'rejected'
    	 ELSE 'pending' END AS status
    FROM hosts H
    LEFT JOIN requests R ON R.rideId = H.id
    WHERE R.username = $1`;
    let poolsData = await db.query(query, [username]);
    let pools = Object.assign([], poolsData.rows);
    await Bluebird.each(pools, async (pool) => {
      let hostData = await getHostDetails(pool.rideid);
      pool.host = Object.assign({}, hostData);
      let passengersData = await getPassengerDetails(pool.rideid);
      pool.passengers = Object.assign([], passengersData);
    })
    return {
      success: true,
      pools
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.createRequest = async (rideId, username) => {
  try {
    let query = `INSERT INTO requests (rideId, username, status) VALUES ($1,$2,$3)`;
    await db.query(query, [rideId, username, 0]);
    return {
      success: true,
      message: 'Request Sent Successfully'
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
