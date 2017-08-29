
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
  var player1 = database.ref("p1Game");
  var player2 = database.ref("p2Game");
  var currentGame = database.ref("currentGame");

  //initialize Values
  var playerName = "";
  var playerCount = 0;
  var p1win = 0;
  var p1lose = 0;
  var p2win = 0;
  var p2lose = 0;
  var playerNum = 0;
  var opponentChoice = "";

//-------------------------------------------------------------

  //Capture Submit button click
  $("#startGame").on("click", function(event) {
    event.preventDefault();

    //Retrieving data 
    playerName = $("#playerName").val().trim();
    //increment playerCount
    playerCount++;
    console.log("playerCount", playerCount);

    if(playerCount == 1) {
      playerNum = "1";
      player1.set({
        playerName: playerName,
        losses: 0,
        wins: 0,
        playerCount: playerNum,
        choice: "",
      });
      currentGame.set({
        numOfPlayers: playerCount,
      });
    }
    else if(playerCount == 2) {
      playerNum = "2";
      $("#startGame").prop("disabled", true);
      player2.set({
        playerName: playerName,
        losses: 0,
        wins: 0,
        playerCount: playerNum,
        choice: "",
      });
      currentGame.set({
        numOfPlayers: playerCount,
      });
    }

  //Empty add player form
  $("#playerName").val("");

  });

//-------------------------------------------------------------
  //listener for when currentGame value changes
  currentGame.on("value", function(snapshot) {
    //if a value exists in numOfPlayers
    if(snapshot.child("numOfPlayers").exists()) {
      //database tells playercount value of numOfPlayers
      playerCount = snapshot.val().numOfPlayers;
      //disable add player button if 2 players are present
      if(playerCount >= 2){
        $("#startGame").prop("disabled", true);
      }else {
        $("#startGame").prop("disabled", false);
      }
    }
  });  

  player1.on("value", function(snapshot) {
    if(snapshot.child("playerName").exists()) {
      $("#p1Player").html("Player 1: " + playerName);
    }
    if(snapshot.child("losses").exists()) {
      $("#p1Lose").html(snapshot.val().losses);
    }
    if(snapshot.child("wins").exists()) {
      $("#p1Wins").html(snapshot.val().wins);
    }
    // if(snapshot.child("choice").exists()) {
    //   $("#p1Choice").html(snapshot.val().losses);
    // }
    if(snapshot.child("choice").exists() && snapshot.val().numOfPlayers !== playerNum) {
      opponentChoice = snapshot.val().choice;
      console.log("opponentChoice", opponentChoice);
    }
  });

  player2.on("value", function(snapshot) {
    if(snapshot.child("playerName").exists()) {
      $("#p2Player").html("Player 2: " + playerName);
    }
    if(snapshot.child("losses").exists()) {
      $("#p2Lose").html(snapshot.val().losses);
    }
    if(snapshot.child("wins").exists()) {
      $("#p2Wins").html(snapshot.val().wins);
    }
    // if(snapshot.child("choice").exists()) {
    //   $("#p1Choice").html(snapshot.val().losses);
    // }
    if(snapshot.child("choice").exists() && snapshot.val().numOfPlayers !== playerNum) {
      opponentChoice = snapshot.val().choice;
      console.log("opponentChoice", opponentChoice);
    }
  });
    // database.ref().on("child_added", function(childSnapshot) {

   	//   console.log("snapshot", childSnapshot.val());
   	//   console.log("Player "+ playerCount, childSnapshot.val().numOfPlayers);

    //   //if playerCount == 1 or 2
    //   if(playerCount == 1){
    //     waitingForPlayer(playerCount);
    //     $(".yourTurn").hide();
    //     $(".waitingTurn").hide();

    //   }else if(playerCount == 2){

    //     waitingForPlayer(playerCount);

    //   }

      
      
    //Handles the errors
    // }, function(errorObject) {
    //  	console.log("The read failed: " + errorObject.code);
    // });



//-------------------------------------------------------------
  //Player selects choice rock
  $(".p"+ playerCount +"rock").on("click", function(event) {
    console.log("click");
    $(".p"+ playerCount +"paper").hide();
    $(".p"+ playerCount +"sissors").hide();

    database.ref().push({
      playerChoice: Rock,
    })
    
  });
  //Player selects choice paper
  $(".p"+ playerCount +"paper").on("click", function(event) {
    console.log("click");
    $(".p"+ playerCount +"rock").hide();
    $(".p"+ playerCount +"sissors").hide();
    
  });
  //Player selects choice sissors
  $(".p"+ playerCount +"sissors").on("click", function(event) {
    console.log("click");
    $(".p"+ playerCount +"rock").hide();
    $(".p"+ playerCount +"paper").hide();
    
  });
//-------------------------------------------------------------

//display non takes it away but does not remove, hid takes space.

function beforeGame() {
  //see waitingForPlayer(player1)
  //see waitingForPlayer(player2)
  //display none rock, paper, sissors
  $(".p1choice").hide();
  $(".p2choice").hide();

  //display none wins & losses
  $("#p1WinLose").hide();
  $("#p2WinLose").hide();
  //display non results panel
  $(".yourTurn").hide();
  $(".waitingTurn").hide();
  
}

function waitingForPlayer(player) {
  //display none rock, paper, sissors
  //display none wins & losses
  $("#p"+ playerNum +"Player").html("Player 1: " + playerName);
  $("#p"+ playerCount +"Waiting").hide();
  playerPanel(playerCount);
};

function playerPanel(player) {
    rpsDisplay(player);
    //display none wins & losses
    $("#p"+ player +"WinLose").show();
    //display non results panel
    $(".yourTurn").show();
}

function rpsDisplay(player) {
  //display rock, paper, sissors for player
  $(".p"+ player +"rock").show();
  $(".p"+ player +"paper").show();
  $(".p"+ player +"sissors").show();
}


function playerTurn() {

}

function playerWait() {

}

beforeGame();
