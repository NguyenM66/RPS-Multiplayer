
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

  var database = firebase.database();

 //initialize Values
 var playerName = "";
 var playerCount = 0;


 database.ref("/playerData").on("value", function(snapshot) {
 	console.log("snapshot", snapshot.val());
 	console.log(snapshot.playerName);

 }, function(errorObject) {
 	console.log("The read failed: " + errorObject.code);
 });

 //-----------------------------------------------------------



 //Capture Submit button click
 $("#startGame").on("click", function(event) {
 	event.preventDefault();

  //Retrieving data 
 	playerName = $("#playerName").val().trim();

  //Push
 	database.ref().push({
 		playerName: playerName,

 	});

  //Empty add player form
  $("#playerName").val("").trim();

 });

 //Firebase watcher & initial loader
 database.ref().on("child_added", function(childSnapshot) {

 	console.log("snapshot", childSnapshot.val());
 	console.log(childSnapshot.val().playerName);

  //Full list of items
  $("#firstPlayer").html(playerName);
  $("#playerName").val().trim().html.empty();

  //Handles the errors
  }, function(errorObject) {
   	console.log("The read failed: " + errorObject.code);
   });


