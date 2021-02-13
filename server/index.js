var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser({limit: '50mb'}));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/user.js')(app);

app.listen(5000,()=>console.log('Server @ port 5000'));