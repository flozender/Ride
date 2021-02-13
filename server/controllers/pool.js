const db = require('../db/database.js');

exports.getTripsForLoop = async (data) => {
  try {
    let query = `SELECT H.capacity, H.origin, H.destination, H.when,
    H.passengers, U.name, U.email, U.phone,
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
