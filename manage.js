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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (QueryString().id != "") {
  var room = firebase.database().ref('webBuzzer/' + QueryString().id)
  room.child('name').once('value', function(name) {
    document.getElementById('title').innerHTML = "<u>Manage Web Buzzer</u><br> " + name.val()
    document.getElementById('instructions').innerHTML = "Give your players this code: " + QueryString().id
  })
  room.child('mostRecentBuzz').on('value', function(data) {
    if (data.val() == 0) {
      document.getElementById('mostRecentBuzz').innerHTML = "Waiting for Buzz"
    } else {
      room.child('people').child(data.val()).once('value', function(name) {
        document.getElementById('mostRecentBuzz').innerHTML = name.val()
      })
    }
  })
} else {
  window.open('index.html', '_self')
}

function resetBuzz() {
  firebase.database().ref('webBuzzer/' + QueryString().id + '/mostRecentBuzz').set(0)
}

function QueryString() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}
