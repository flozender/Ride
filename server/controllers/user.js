const db = require('../db/database.js');
const util = require('../helpers/utils.js')

let checkUserExists = async (data) => {
  try {
    let query = `SELECT U.id, U.username, U.email FROM users U WHERE U.username=$1 OR U.email=$2`;
    let users = await db.query(query, [data.username, data.email]);
    return {
      users: users.rows
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
exports.createUser = async (data) => {
  try {
    let users = await checkUserExists(data);
    if (users.users && users.users.length) {
      return {
        success: false,
        message: "User Already exists"
      }
    } else {
      let query = `INSERT INTO users (name, username, email, phone, password) VALUES ($1,$2,$3,$4,$5)`;
      await db.query(query, [data.name, data.username, data.email, data.phone, data.password]);
      let user = await db.query(`SELECT U.id FROM users U WHERE U.username=$1 AND U.email=$2`, [data.username, data.email])
      return util.addToken({ id: user.rows[0].id, name: data.name, username: data.username });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
