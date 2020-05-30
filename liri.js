require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var functionCall = process.argv[3];

//bands in town - artist, song name, preview link of song from spotify, album, default to the sign, ace of base
//omdb - title, year, IMDB rating, rotten tomatoes rating, country produced, language, plot, actors, default to Mr. Nobody
//do what it says - takes random.txt file

//OMDB Query
var omdbFunction = function (movieName) {
  var movieQueryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&tomatoes=true&apikey=trilogy";
  //axios call and then return of data
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
  var songs = data.tracks.items;
  for (let i = 0; i < songs.length; i++) {
    const songsData = songs[i];
    console.log(i);
    console.log("artist(s): " + songsData[i].artists);
    console.log("song name: " + songsData[i].name);
    console.log("preview song: " + songsData[i].preview_url);
    console.log("album: " + songsData[i].album.name);
  }
};

//bands in town function
var bandsintownFunction = function (artist) {
  var concertQueryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  //axios call and return of data
  axios.get(concertQueryUrl).then(function (response) {
    var data = response.data;
    for (let i = 0; i < data.length; i++) {
      const concert = data[i];
      console.log(artist);
      console.log(concert.venue.city);
      console.log(show.venue.region);
      console.log(moment(show.datetime).format("MM/D/YYYY"));
    }
  });
};

//switch statementfor each of the commands for each of the calls

switch (command) {
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
