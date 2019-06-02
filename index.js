// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC-txh3qBRKI7IwpaY6gOTH-mCoVkPVpLc",
  authDomain: "webbuzzer-3bdcc.firebaseapp.com",
  databaseURL: "https://webbuzzer-3bdcc.firebaseio.com",
  projectId: "webbuzzer-3bdcc",
  storageBucket: "webbuzzer-3bdcc.appspot.com",
  messagingSenderId: "287617141605",
  appId: "1:287617141605:web:5406b02458ee0e22"
  };
  firebase.initializeApp(firebaseConfig);

function joinRoom() {
  var roomCode = document.getElementById('joinRoom').value;
  if (roomCode != "") {
    firebase.database().ref('webBuzzer/' + roomCode).once('value', function(data) {
      if (data.val()) {
        window.open('room.html?id=' + roomCode, '_self')
      } else {
        alert('The room code you entered isn\'t valid.')
      }
    })
  } else {
    alert('A 5 digit room code is required.')
  }
}

function createRoom() {
  var roomName = document.getElementById('createRoom').value
  if (roomName != "") {
    var roomCode = generate5digitCode()
    firebase.database().ref('webBuzzer/' + roomCode).set({'name': roomName,mostRecentBuzz:0}, function(err) {
      if (err) {
        alert('An error occured. Try again later.')
      } else {
        window.open('manage.html?id=' + roomCode, '_self')
      }
    })
  } else {
    alert('A valid room name is required.')
  }
}

function generate5digitCode() {
  var roomCode = ""
  while (roomCode.length != 5) {
    roomCode = "" + Math.floor(Math.random()*100000)
  }
  return roomCode;
}
