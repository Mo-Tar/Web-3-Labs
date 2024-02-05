const fs = require('fs');
const path = require('path');
const express = require('express');

// create an express app
const app = express();

// define the API routes

const router = require('./scripts/artist-router.js');

router.handleAllArtrist(app);
router.handleSingleID(app);
router.handleNationality(app);
router.handleNameSearch(app);

// Use express to listen to port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});