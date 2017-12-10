

var inquirer = require("inquirer");
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var movieName="";

action();

function action(){

  console.log(
    "\n--------------------------------------------\nWhat would you like to do?\n--------------------------------------------\n")

inquirer.prompt([

    {
      type: "list",
      message:"Choose the function",
      choices: ["Twitter", "Movie_info", "Music_search", "Exit"],
      name: "action"
    },
    ]).then(function(n){

      if (n.action === "Twitter"){
        load_twitter();

      }

      else if (n.action ==="Movie_info"){
        load_movie();        
      }
      else if (n.action ==="Music_search"){
        load_spotify();
      }
      else if(n.action === "Exit"){
        console.log(
          "\n--------------------------------------------\nBye\n--------------------------------------------\n")
      }


 function load_twitter(){

    inquirer.prompt([

  {
    type: "input",
    message: "What is twitter account? (Default: MegaJulian0)",
    name: "twitter_input",
    default: "MegaJulian0"
  }
    ]).then(function(p){
        screen_name = p.twitter_input;

    var client = new Twitter({
      consumer_key: 'KEiKMo39Ur0OvwUtEGdFf57Vb',
      consumer_secret: 'W6HZkpjbpOTRt9PNxrpWaSprs59nhvOKhXIXOJ7UieaZWOWKYF',
      access_token_key: '937093269862850560-z6dEQ9CcmNXuHVw70aO5kAUy5L0iVFf',
      access_token_secret: 'iHNcii59UoxlZ8XDPS266NABnAjs3O5E1esEVUSOkUvJK'
    });

     
    var params = {screen_name: screen_name};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
         for (var i=0; i<tweets.length; i++){
         	var date = tweets[i].created_at;
         	var text = tweets[i].text
         	var numb = i+1;
          
         	var output = "\n"+numb+". "+text + "....." + date;
          console.log(output)
          var type="<Type: Twitter>";
          append_log(output, type)
          
         }
         
         action();
       }   

  })


});
  }

  function load_movie(){

      inquirer.prompt([

  {
    type: "input",
    message: "What is the movie name? (Default: Mr. Nobody)",
    name: "movie_input",
    default: "Mr.Nobody"
  }
    ]).then(function(p){


      movieName = p.movie_input;



  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {


    var movie_response = JSON.parse(body);


    var output = 
      "\n--------------------------------------------\n"+
      "\nMovie Title: "+ movie_response.Title+
      "\nReleased Date: " + movie_response.Released+
      "\nImdbRating: "+ movie_response.Ratings[0].Value+
      "\nRotten Tomatoes Rating: "+ movie_response.Ratings[1].Value+
      "\nCountry Produced: "+ movie_response.Country+
      "\nLanguage: "+ movie_response.Language+
      "\nPlot: " + movie_response.Plot+
      "\nActors: " + movie_response.Actors+   
      "\n--------------------------------------------\n"
      ;
    console.log(output)
    var type="<Type: Movie Search>";
    append_log(output, type)
    action();   
  }
});

})

  }

  function load_spotify() {

    inquirer.prompt([

    {
      type: "input",
      message: 'Type your music search (Default: "The Sign")',
      name: "music_input",
      default: "The Sign"
    }
      ]).then(function(p){
        var music_input="";


        music_input = p.music_input; 


        var spotify = require('node-spotify-api');

        var spotify = new spotify({
          id: "0433e810bdbe4e70944bc4adc8315d95",
          secret: "f865ce461dc744d68bba9eefc4ba440c"
           });
         

        spotify
          .search({ type: 'track', query: music_input, limit: 3})
          .then(function(response) {

            console.log("\nTop 3 with searched term: "+ music_input+ " are:...")

            for (var i=0; i<response.tracks.items.length; i++){
            var data = response.tracks.items[i];

            var output = 
              "\n--------------------------------------------\n"+
              "\nSong Name: "+data.name+
              "\nArtist: "+ data.artists[0].name+
              "\nAlbum Name: "+data.album.name+
              "\nPreview_Url: "+data.preview_url+
              "\n--------------------------------------------\n";
              console.log(output)
              
              var type="<Type: Spotify Search>";
              append_log(output, type)
          }
          

            action();
          })
            .catch(function(err) {
              console.log(err);
            });


          })
       }

    });

    function append_log(output, type){
        fs.appendFile("log.txt",type+output, function(err) {
        if (err) {
      return console.log(err);
    }
  });
    }
  };


