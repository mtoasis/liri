

var inquirer = require("inquirer");
var Twitter = require('twitter');
var request = require("request");
var movieName="";

action();

function action(){

  console.log("What would you like to do?")

inquirer.prompt([

    {
      type: "list",
      message:"Choose the function",
      choices: ["Twitter", "Movie_info", "Exit"],
      name: "action"
    },
    ]).then(function(n){

      if (n.action === "Twitter"){
        load_twitter();

      }

      else if (n.action ==="Movie_info"){
        movie_name();        
      }
      else if(n.action === "Exit"){
        console.log("Bye")
      }


function movie_name(){
  inquirer.prompt([

  {
    type: "input",
    message: "What is the movie name?",
    name: "movie_input"
  }
    ]).then(function(p){
      movieName = p.movie_input;
      console.log(movieName)
      load_movie();
        

    })
}
 function load_twitter(){
    var client = new Twitter({
      consumer_key: 'KEiKMo39Ur0OvwUtEGdFf57Vb',
      consumer_secret: 'W6HZkpjbpOTRt9PNxrpWaSprs59nhvOKhXIXOJ7UieaZWOWKYF',
      access_token_key: '937093269862850560-z6dEQ9CcmNXuHVw70aO5kAUy5L0iVFf',
      access_token_secret: 'iHNcii59UoxlZ8XDPS266NABnAjs3O5E1esEVUSOkUvJK'
    });
     
    var params = {screen_name: 'MegaJulian0'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
      	// console.log(tweets)
         for (var i=0; i<tweets.length; i++){
         	var date = tweets[i].created_at;
         	var text = tweets[i].text
         	var numb = i+1;
          console.log("\n")
         	console.log(numb+". "+text + "....." + date)

          
         }
         console.log("\n")
         action();
       }   

  })


};

  function load_movie(){


  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    // console.log(response)

    var movie_response = JSON.parse(body);
    // console.log(movie_response)

    console.log(
      "\n--------------------------------------------\n"+
      "\nMovie Name: "+ movie_response.Title+
      "\nReleased Date: " + movie_response.Released+
      "\nRating: "+ movie_response.Rated+
      "\nDirector: "+ movie_response.Director+
      "\nImdbRating: "+ movie_response.imdbRating);

    action();   
  }
});


  }

});
  };

// client.stream('user', {},  function(stream) {

//   stream.on('data', function(tweet) {
//     console.log("----" + tweet.text);
//   });

//   stream.on('error', function(error) {
//     throw error;
//   });


// });