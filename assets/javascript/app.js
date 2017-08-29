
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
  var me;

  //initialize Values
  var playerName = "";
  var playerCount = 0;
  var p1win = 0;
  var p1lose = 0;
  var p2win = 0;
  var p2lose = 0;
  var playerNum = 0;
  var choice = "";
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

    //after click disable button
    $("#startGame").prop("disabled", true);

    //if playerCount is 1 then 
    if(playerCount == 1) {
      //set playerNum to 1
      playerNum = "1";
      //set variable me to p1Game
      me = database.ref("p1Game");
      console.log("p1", me);
      //set database object player1
      player1.set({
        playerName: playerName,
        losses: 0,
        wins: 0,
        playerCount: playerNum,
        choice: "",
      });
      //set numberOfPlayers to current playerCount to reference later
      currentGame.set({
        numOfPlayers: playerCount,
      });
      $("#startGame").prop("disabled", true);
    }
    else if(playerCount == 2) {
      playerNum = "2";
      $("#startGame").prop("disabled", true);
      me = database.ref("p2Game");
      console.log("p2", me);
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

  //listener for when player1 value changes
  player1.on("value", function(snapshot) {
    //if value exists in playerName
    if(snapshot.child("playerName").exists()) {
      //display player1 name
      $("#p1Player").html("Player 1: " + playerName);
      //$("#p2Player").html("Player 2: " + player2.playerName);
      console.log(player2.playerName);
      //display waitingForPlayer function with parameter playerNum, which is 1
      waitingForPlayer("player2", playerCount);
    }
    //if value exists in losses
    if(snapshot.child("losses").exists()) {
      //diplay player1 losses
      $("#p1Lose").html(snapshot.val().losses);
      //database tells p1Lose value of losses
      p1Lose = snapshot.val().losses;
      console.log("p1 losses", p1Lose);
    }
    if(snapshot.child("wins").exists()) {
      $("#p1Wins").html(snapshot.val().wins);
      //database tells p1Wins value of wins
      p1Wins = snapshot.val().wins;
      console.log("p1 wins", p1Wins);
    }
    // if(snapshot.child("choice").exists()) {
    //   $("#p1Choice").html(snapshot.val().choice);
    // }
    if(snapshot.child("choice").exists() && snapshot.val().numOfPlayers !== playerNum) {
      opponentChoice = snapshot.val().choice;
      console.log("p1s opponentChoice", opponentChoice);
    }
  });

  player2.on("value", function(snapshot) {
    if(snapshot.child("playerName").exists()) {
      //$("#p1Player").html("Player 1: " + player1.playerName);
      $("#p2Player").html("Player 2: " + playerName);
      waitingForPlayer(playerCount);
    }
    if(snapshot.child("losses").exists()) {
      $("#p2Lose").html(snapshot.val().losses);
      p2Lose = snapshot.val().losses;
      console.log("p1 losses", p2Lose);
    }
    if(snapshot.child("wins").exists()) {
      $("#p2Wins").html(snapshot.val().wins);
      p2Wins = snapshot.val().wins;
      console.log("p2 wins", p2Wins);
    }
    // if(snapshot.child("choice").exists()) {
    //   $("#p1Choice").html(snapshot.val().losses);
    // }
    if(snapshot.child("choice").exists() && snapshot.val().numOfPlayers !== playerNum) {
      opponentChoice = snapshot.val().choice;
      console.log("p2s opponentChoice", opponentChoice);
    }
  });


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
  //$("#p"+ player +"Player").html("Player 1: " + playerName);
  $("#p"+ player +"Waiting").hide();
  playerShowPanel(playerNum);
};

function playerShowPanel(player) {
    rpsShowDisplay(player);
    //display none wins & losses
    $("#p"+ player +"WinLose").show();
    //display non results panel
    if(player == 1){
      $(".waitingTurn").show();
    }
    else if(player == 2){
      $(".yourTurn").show();
      //whos turn, player1 or player2's turn
    }
}

function rpsShowDisplay(player) {
  //display rock, paper, sissors for player
  $(".p"+ player +"rock").show();
  $(".p"+ player +"paper").show();
  $(".p"+ player +"sissors").show();
}

function choiceResults() {

}

function winner() {

}

function loser() {

}

beforeGame();
