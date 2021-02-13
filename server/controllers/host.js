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
