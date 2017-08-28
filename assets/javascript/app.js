
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4EgKV1qfvMP_Bs-qi7GKxbL84IXPAQoM",
    authDomain: "rpsmultiplayer-dfd4b.firebaseapp.com",
    databaseURL: "https://rpsmultiplayer-dfd4b.firebaseio.com",
    projectId: "rpsmultiplayer-dfd4b",
    storageBucket: "",
    messagingSenderId: "284170138021"
  };
  firebase.initializeApp(config);
//-------------------------------------------------------------

  var database = firebase.database();

  //initialize Values
  var playerName = "";
  var playerCount = 0;

//-------------------------------------------------------------

 //Capture Submit button click
  $("#startGame").on("click", function(event) {
 	  event.preventDefault();

    //Retrieving data 
  	playerName = $("#playerName").val().trim();
    //increment playercount
    playerCount++;
    console.log("playerCount", playerCount);

    //Push
  	database.ref().push({
 	  	playerName: playerName,

  	});

  //Empty add player form
  $("#playerName").val("");

  });
//-------------------------------------------------------------
  //Firebase watcher & initial loader
  database.ref().on("child_added", function(childSnapshot) {

 	  console.log("snapshot", childSnapshot.val());
 	  console.log(childSnapshot.val().playerName);

    //If playerCount == 1 
    //Full list of items
    $("#firstPlayer").html("Player 1: " + playerName);

    //else, player count ==2
    $("#secondPlayer").html("Player 2: " + playerName);
    
  //Handles the errors
  }, function(errorObject) {
   	console.log("The read failed: " + errorObject.code);
  });

//-------------------------------------------------------------

//display non takes it away but does not remove, hid takes space.

function beforeGame() {
  //see waitingForPlayer(player1)
  //see waitingForPlayer(player2)
  //display none rock, paper, sissors
  //display none wins & losses
  //display non results panel
}

function waitingForPlayer(player) {
  //display none rock, paper, sissors
  //display none wins & losses
};

//if (playerCount == 1) {
//  rpsDisplay(player1)
//  display none rock paper sissors at player 2
//}else{
//  rpsDisplay(player1);
//  rpsDisplay(player2);  


//if (playeCount >= 2) {
  //jquery .prop(disable), disable jquery property to click button
//}
// $("#submit").prop('disabled', true);
// <button class="btn btn-default" id="submit" type="submit">Submit</button>

function rpsDisplay(player) {
  //display rock, paper, sissors for player
}