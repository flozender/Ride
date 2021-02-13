var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser({limit: '50mb'}));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require('./db/database.js');
// const userController = require('./controllers/user.js')
// app.get("/index", async (req, res) => {
//     try {
//         let query = `INSERT INTO users (name, username, email, phone, password) VALUES ($1,$2,$3,$4,$5)`;
//         let users = await db.query(query, ['Aisha', 'ash', 'aisha@gmail.com', '7951364895', 'krish']);
//         res.send(users)
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
// })
require('./routes/user.js')(app);


app.listen(5000,()=>console.log('Server @ port 5000'));