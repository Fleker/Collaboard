const KEY_GOOGLE_PHOTOS = "ext_photos";
const KEY_GIT_REPO = "ext_git";
const KEY_TODO = "widget_todo";
const KEY_NOTES = "widget_notes";
const KEY_BOOKMARKS = "widget_bookmarks";
const KEY_MARKDOWN = "widget_markdown";
const FB_PATH = "/alpha";

function hasFirebaseItem(key, onvalue) {
    getFirebaseItem(key, function(value) {
        if (value == undefined) {
            onvalue(false, value);   
        } else {
            onvalue(true, value);
        }
    });
}

function getFirebaseItem(key, onvalue) {
    firebase.database().ref(FB_PATH + "/" + retrieveGet(GET_KEY)).once('value').then(function(snapshot) {
        console.log(snapshot);
      onvalue(snapshot.val()[key]);
    });
}

function addFirebaseListener(key, onvalue) {
    firebase.database().ref(FB_PATH + "/" + retrieveGet(GET_KEY) + "/" + key).on('value', function(snapshot) {
      onvalue(snapshot.val());
    });
}

function setFirebaseItem(key, value) {
    var object = {};
    object[key] = value;
    console.log(object);
    firebase.database().ref(FB_PATH + "/" + retrieveGet(GET_KEY)).update(object);
}

function init() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAw1DRPzKmITrL36pi1vDMyWbgzkYX4nD0",
    authDomain: "collaboard-d02d7.firebaseapp.com",
    databaseURL: "https://collaboard-d02d7.firebaseio.com",
    storageBucket: "collaboard-d02d7.appspot.com",
    messagingSenderId: "1022508509622"
  };
  firebase.initializeApp(config);
    
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    
/*  var commentsRef = firebase.database().ref(FB_PATH + "/" + retrieveGet(GET_KEY));
    commentsRef.on('child_changed', function(data) {
      
    });*/
}

function getStarted() {
    var key = firebase.database().ref(FB_PATH).push().key;
    console.log("Key is " + key);
//    alert("Key is " + key);
    window.location.href = "board.html?key=" + key;
}