const fs = require("fs");
const path = require("path");

// for now, we will get our data by reading the provided json file
const file = "artists.json";
const jsonPath = path.join(__dirname, "data", file);
// read file contents synchronously
const jsonData = fs.readFileSync(jsonPath, "utf8");
// convert string data into JSON object
const artist = JSON.parse(jsonData);

// error messages need to be returned in JSON format
const jsonMessage = (msg) => {
  return { message: msg };
};

const handleAllArtrist = (app) => {
  // return all the stocks when a root request arrives
  app.get("/api/artists", (req, resp) => {
    resp.json(artist);
  });
};

// return just the requested artists
const handleSingleID = (app) => {
  // return just the requested artist
  app.get("/api/artists/:ArtistID", (req, resp) => {
    // change user supplied id to upper case
    const idToFind = req.params.ArtistID;
    // search the array of objects for a match
    const matches = artist.filter((obj) => idToFind === obj.ArtistID);
    // return the matching artist
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`ArtistID ${idToFind} not found`));
    }
  });
};

// return just the requested artists
const handleNationality = (app) => {
  // return just the requested artist
  app.get("/api/artists/nationality/:Nationality", (req, resp) => {
    // change user supplied id to upper case
    const nationalityToFind = req.params.Nationality.toLowerCase();
    // search the array of objects for a match
    const matches = artist.filter(
      (obj) => nationalityToFind === obj.Nationality.toLowerCase()
    );
    // return the matching artist
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`Nationality ${nationalityToFind} not found`));
    }
  });
};

// return all the artist whose name contains the supplied text
const handleNameSearch = (app) => {
  // return all the artist whose name contains the supplied text
  app.get("/api/artists/name/:substring", (req, resp) => {
    // change user supplied substring to lower case
    const substring = req.params.substring.toLowerCase();
    // search the array of objects for a match
    const matches = artist.filter((obj) =>
      obj.LastName.toLowerCase().includes(substring));
    // return the matching artist

    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`No name matches found for ${substring}`));
    }
  });
};

// function checkName(obj, substring) {
//   if (
//     obj.FirstName != null &&
//     obj.FirstName.toLowerCase().includes(substring)
//   ) {
//     return obj;
//   } else if (
//     obj.LastName != null &&
//     obj.LastName.toLowerCase().includes(substring)
//   ) {
//     return obj;
//   }
// }

module.exports = {
  handleAllArtrist,
  handleSingleID,
  handleNationality,
  handleNameSearch,
};
