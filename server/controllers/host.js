const db = require('../db/database.js');

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

exports.getAllTripsOfUser = async (username) => {
  try {
    let query = `SELECT H.capacity, H.origin, H.destination, H.when,
    H.passengers, U.name, U.email, U.phone,
    CASE WHEN H.when < current_timestamp THEN 1
    ELSE 0 END AS isCompleted
    FROM hosts H
    LEFT JOIN users U ON U.username = H.username
    WHERE H.username=$1`;
    let trips = await db.query(query, [username]);
    return {
      success: true,
      trips: trips.rows
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
