window.onload = () => {
    // when page loads, check user logged in state
    firebase.auth().onAuthStateChanged(function (user){
        if (user) {
            const googleUserId = user.uid;
            getNotes(googleUserId);
            const ideaTitle = document.querySelector("#ideaTitle");
            ideaTitle.innerHTML = `Some of ${user.displayName}'s Greatest Ideas Started Here`;
        } else {
            // if not logged in redirect to log in page
            window.location = 'index.html';
        }
    });
    

};

// Get user's notes from db, display notes on page

const getNotes = (userId) => {
    console.log(userId);
    // Get user's notes from db
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        writeNotesToHtml(snapshot.val());
    })
};

const writeNotesToHtml = (data) => {
    const noteRenderArea = document.querySelector('#app');
    
    for (let noteKey in data){
        // Create html string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        noteRenderArea.appendChild(noteHtml);
    }
    // Put all html into page at once
};

const createHtmlForNote = (note) => { 
    // TODO: create elements and put into note
    const color = ["has-background-primary-light",
                    "has-background-link-light",
                    "has-background-info-light",
                    "has-background-success-light",
                    "has-background-warning-light",
                    "has-background-danger-light"
                ];

    // const options = document.querySelector("select");
    // if (select)


    let columnDiv = document.createElement("div");
    columnDiv.classList.add("column");
    columnDiv.classList.add("is-one-quarter");
    let cardDiv = document.createElement("div");
    cardDiv.classList.add(`${color[Math.floor(Math.random() * color.length)]}`);
    cardDiv.classList.add(`card`);
    cardDiv.classList.add(`all`);
    cardDiv.classList.add(`is-hidden`);
    columnDiv.appendChild(cardDiv);
    let header = document.createElement("header");
    header.classList.add("card-header");
    let p = document.createElement("p");
    p.classList.add("card-header-title");
    header.appendChild(p);
    cardDiv.appendChild(header);
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("card-content");
    cardDiv.appendChild(contentDiv);
    let content = document.createElement("div");
    content.classList.add("content");
    contentDiv.appendChild(content);
    content.innerHTML = `${note.note}`;
    p.innerHTML = `${note.title}`;


    // return `<div class="column is-one-quarter ">
    //             <div class="all card ${color[Math.floor(Math.random() * color.length)]}">
    //                 <header class="card-header">
    //                     <p class="card-header-title">
    //                         ${note.title}
    //                     </p>
    //                 </header>
    //                 <div class="card-content">
    //                     <div class="content">
    //                         ${note.note}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;
    return columnDiv;

};