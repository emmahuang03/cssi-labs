let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
                userId = googleUser.uid;
                // alert("Successfully logged in!");

            } else {
                window.location = "index.html";
            }
        });
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         var user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ..
        //     });
};

const submitNote = () => {
    const note = document.querySelector("#noteText").value;
    const title = document.querySelector("#noteTitle").value;
    const label = document.querySelector("#noteLabel").value;
    let arr = label.split(", ");
    const today = Date.now();

    firebase.database().ref(`users/${userId}`).push({
        title: title,
        note: note,
        created: today,
        label: arr
    })

    .then(() => {
        document.querySelector("#noteText").value = "";
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteLabel").value = "";
        // alert("Note and title successfully stored!");
    })
    
    .catch(error => {
        console.log(`Something bad happened ...\n${error}`);
    });
    
};