const db = require('../db/database.js');
const Bluebird = require('bluebird');

exports.createTrip = async (data) => {
  try {
    let query = `INSERT INTO hosts (origin, destination, "when", username, capacity) VALUES ($1,$2,$3,$4,$5)`;
    await db.query(query, [data.origin, data.destination, data.when, data.username, data.capacity]);
    return {
      success: true,
      message: "Added Successfully"
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

let getRequestsData = async (rideId) => {
  let query = `SELECT DISTINCT R.id AS requestId, R.username, U.name,
    U.phone, U.email, CASE WHEN R.status = 1 THEN 'accepted'
    WHEN R.status = 2 THEN 'rejected'
    ELSE 'pending' END AS status
    FROM requests R
    lEFT JOIN users U ON U.username = R.username
    WHERE R.rideId = $1`;
  let requestData = await db.query(query, [rideId]);
  let arr = []
  return requestData.rows;
}

let getPassengerDetails = async (rideId) => {
  let query = `SELECT U.name
    FROM passengers P
    LEFT JOIN users U ON U.username = P.username
    WHERE P.rideId = $1`;
  let passengerData = await db.query(query, [rideId]);
  let passengersData = passengerData.rows;
  let passengers = []
  await Bluebird.each(passengersData, async (element) => {
    passengers.push(element.name);
  })
  return passengers;
}

exports.getAllTripsOfHost = async (username) => {
  try {
    let query = `SELECT H.id AS rideId, H.capacity, H.origin, H.destination, H.when,
    U.name, U.email, U.phone,
    CASE WHEN H.when < current_timestamp THEN 1
    ELSE 0 END AS isCompleted
    FROM hosts H
    LEFT JOIN users U ON U.username = H.username
    WHERE H.username=$1`;
    let tripsData = await db.query(query, [username]);
    let trips = Object.assign([], tripsData.rows);
    await Bluebird.each(trips, async (trip) => {
      let passengerData = await getPassengerDetails(trip.rideid);
      trip.passengers = Object.assign([], passengerData);
      let requestsData = await getRequestsData(trip.rideid);
      trip.requests = Object.assign([], requestsData);
    })
    return {
      success: true,
      trips
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
