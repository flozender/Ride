const db = require('../db/database.js');

exports.acceptRejectPassenger = async (data) => {
  try {
    let query = ``;
    let response = {};
    if (data.status == 1) {
      query = `INSERT INTO passengers (rideId, username, status) VALUES ($1,$2,$3)`;
      await db.query(query, [data.rideId, data.username, data.status]);
      response = {
        success: true,
        message: "Accepted Request"
      }
    } else {
      query = `UPDATE requests SET status = 2 WHERE id=$2`;
      await db.query(query, [data.requestId]);
      response = {
        success: true,
        message: "Rejected Request"
      }
    }
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
