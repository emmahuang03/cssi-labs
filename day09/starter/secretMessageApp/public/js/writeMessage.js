const submitMessage = () => {
    console.log('Submitting message...');
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector('#message');
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    // Send to firebase
    if (messageValue.length > 10 || passcodeValue === passcodeValue.toLowerCase()){
        alert("Error:" + passcodeValue);
    } else {
        firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    // clear value from inputs
    passcodeInput.value = ""; 
    messageInput.value = "";
    }
    
};

// const sendMessageButton = document.querySelector('button');
// console.log(sendMessageButton)
// sendMessageButton.addEventListener('click', e => submitMessage)