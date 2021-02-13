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
exports.verifyAndAuthorize = async (data) => {
  try {
    let condition = data.username ? ` U.username=$1` : ` U.email=$1`
    let query = `SELECT U.id, U.username, U.name FROM users U WHERE${condition} AND U.password=$2`
    let user = await db.query(query, [data.username || data.email, data.password]);
    if (user.rows && user.rows.length) {
      return util.addToken({ id: user.rows[0].id, name: user.rows[0].name, username: user.rows[0].username });
    } else {
      return {
        success: false,
        message: "Not Authorized"
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
exports.getProfile = async (username) => {
  try {
    let query = `SELECT U.id, U.username, U.email, U.name, U.phone FROM users U WHERE U.username=$1`;
    let user = await db.query(query, [username]);
    return {
      data: user.rows[0]
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
