require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//bands in town - artist, song name, preview link of song from spotify, album, default to the sign, ace of base
//omdb - title, year, IMDB rating, rotten tomatoes rating, country produced, language, plot, actors, default to Mr. Nobody
//do what it says - takes random.txt file

//OMDB Query
var omdbFunction = function (movieName) {
  var movieQueryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&tomatoes=true&apikey=trilogy";

  axios.get(movieQueryUrl).then(function (response) {
    var data = response.data;
    if (response.data === true) {
      console.log("title: " + data.Title);
      console.log("Year: " + data.Year);
      console.log("Rated: " + data.Rated);
      console.log("IMDB Rating: " + data.imdbRating);
      console.log("Country: " + data.Country);
      console.log("Language: " + data.Language);
      console.log("Plot: " + data.Plot);
      console.log("Actors: " + data.Actors);
      console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
    } else {
      movieName = "Mr. Nobody";
    }
  });
};

//spotify search and function
var spotifyFunction = function (songName) {
    
  spotify.search({ type: "track", query: songTitle }, function (err, data) {
    if (err) {
      return console.log("Error occured: " + err);
    }
  });
};

//switch statementfor each of the commands for each of the calls
var command = function (caseData, functionData) {
  switch (casedata) {
    case "concert-this":
      bandsintownFunction();
      break;
    case "spotify-this-song":
      spotifyFunction();
      break;
    case "movie-this":
      omdbFunction();
      break;
    case "do-what-it-says":
      doWhatItSaysFunction();
      break;
    default:
      console.log("LIRI doesn't know that");
      break;
  }
};
