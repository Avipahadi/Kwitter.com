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

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    message = document.getElementById("msg").value;
    console.log(document.getElementById("msg").value);
    firebase.database().ref(room_name).push({
        user_name: user_name,
        mesage: message,
        like: 0
    });
    notifyMe();
    document.getElementById("msg").value = "";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

{
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                u_n = message_data['user_name'];
                m_s_g = message_data['mesage'];
                lks = message_data['like'];
                name_tag = "<h4>" + u_n + "<img id='tick' onmouseover='show_div();' src='tick.png'>" + "</h4>";
                message_tag = "<h4 class='text-muted'>" + m_s_g + "</h4>";
                button_tag = "<button class='btn btn-warning' onclick='updateLike(this.id);' id='" + firebase_message_id + "' value=" + lks + "><span class='glyphicon glyphicon-thumbs-up'>Likes: " + lks + "</span></button><hr>";
                row = name_tag + message_tag + button_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}

getdata();

function updateLike(likes) {
    current_likes = document.getElementById(likes).value;
    updated_likes = Number(current_likes) + 1;
    firebase.database().ref(room_name).child(likes).update({
        like: updated_likes
    });
}

document.addEventListener('contextmenu', event => event.preventDefault());

if (!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    console.log('Browser support notifications.');
}

if (!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    if (Notification.permission === 'granted') {
    } else {
        Notification.requestPermission().then(function (p) {
            if (p === 'granted') {
            } else {
                console.log('User blocked notifications.');
            }
        }).catch(function (err) {
            console.error(err);
        });
    }
}

var notify = new Notification(user_name);

var notify = new Notification(user_name, {
    body: message,
    icon: 'https://bit.ly/2DYqRrh',
});

function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        if (Notification.permission === 'granted') {
            var notify = new Notification(user_name, {
                body: message,
                icon: 'https://bit.ly/2DYqRrh',
            });
        } else {
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    var notify = new Notification(user_name, {
                        body: message,
                        icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}