var firebaseConfig = {
    apiKey: "AIzaSyAJc9PpySDNFOUA8Odjq9YSvBA4hCiES5k",
    authDomain: "kwitter-practice-a.firebaseapp.com",
    databaseURL: "https://kwitter-practice-a-default-rtdb.firebaseio.com",
    projectId: "kwitter-practice-a",
    storageBucket: "kwitter-practice-a.appspot.com",
    messagingSenderId: "635654695464",
    appId: "1:635654695464:web:60e7411cc8a392a884231d",
    measurementId: "G-NBNL539QBW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function add_user() {
    user_name = document.getElementById("user_name").value;
    firebase.database().ref("/").child(user_name).update({
        purpose: "Adding User"
    });
}