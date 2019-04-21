import express from 'express'
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
//
// // create express app
const app = express();
//
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.js');


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notifications System."});
});

require('./app/routes/routes.js')(app);

app.on('listening',function(){
    console.log('ok, server is running');
});

// // listen for requests
app.listen(3000, () => {

    console.log("Server is listening on port 3000");
});
module.exports = app; // for testing