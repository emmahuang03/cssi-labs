let count = 0;

const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        // console.log(data);

        const passcodeAttempt = document.querySelector("#passcode").value;

        for (const recordKey in data){
            console.log(recordKey);
            console.log(data[recordKey]);

            const record = data[recordKey];

            const storedPasscode = record.passcode;
            console.log(count);
            if (count >= 5){
                renderMessageAsHtml("Too many attempts. Cannot try again");
            } else if (passcodeAttempt === storedPasscode) {
                console.log(`Message is: ${record.message}`);
                renderMessageAsHtml(record.message);
            } else {
                count++;
                renderMessageAsHtml("Sorry your passcode is wrong.");
            }
        }

    })
}



const renderMessageAsHtml = (message) => {
    const passCodeInput = document.querySelector("#passcode");
    passCodeInput.value = "";

    const messageDisplay = document.querySelector("#message");
    messageDisplay.innerHTML = message;
}