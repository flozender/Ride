const fs = require("fs");
const pg = require("pg");

const config = {
  user: "tayeeb",
  host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
  database: "pesky-marmot-661.defaultdb",
  password: 'L7ObQnJoUsNfdZsd',
  port: 26257,
  ssl: {
    ca: fs.readFileSync('config/cc-ca.crt').toString(),
  },
};

var db = new pg.Pool(config);
module.exports = db;