function add_name() {
    user = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome" + " " + user;
}

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

function go_to_room() {
    user = localStorage.getItem("user_name");
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: room_name
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_message_page.html";
}

function getdata() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log(Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redit(this.id);'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}

getdata();

function redit(name) {
    localStorage.setItem("room_name", name);
    window.location = "kwitter_message_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}