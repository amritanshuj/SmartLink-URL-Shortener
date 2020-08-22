//Import modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//Import db module
const db = require('./models/db.js');

//Call the express function to initiate an express app
const app = express();

//Connect to database by calling our connect method
db.connect();

//Import controllers
const { createShortLink, openShortLink } = require('./controllers/url.controller.js');


//To tell express to parse incoming requests
app.use(bodyParser.json());

//To tell express we are serving static files (front end files)
app.use(express.static(path.join(__dirname, 'public')));

//USE CONTROLLERS
//route to create short link
app.post('/createShortLink', createShortLink);
//route to open short link, ':' means unique_name is a param
app.get('/:unique_name', openShortLink);

/** NB: process.env.PORT is required as we would 
not be able to set the port manually in production */
const PORT = process.env.PORT || 3000;

//app to listen to specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  