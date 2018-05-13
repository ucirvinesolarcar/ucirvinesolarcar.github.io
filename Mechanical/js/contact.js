
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTOHKKcWirfCnKX0ORvitGyI60eOHmUHw",
    authDomain: "contact-b24c4.firebaseapp.com",
    databaseURL: "https://contact-b24c4.firebaseio.com",
    projectId: "contact-b24c4",
    storageBucket: "contact-b24c4.appspot.com",
    messagingSenderId: "109859751739"
};
firebase.initializeApp(config);

console.log('Contact'); 
// Reference messages collection
var messagesRef = firebase.database().ref('Contact');

// Listen for form submit
var x = document.getElementById('contactForm');
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var first = getInputVal('first');
    var last = getInputVal('last');
    var email = getInputVal('email');
    var message = getInputVal('message');

    proceed = true;
    if (first == "") {
        $('input[name=first]').css('border-color', 'red')
        proceed = false;
    }
    if (last == "") {
        $('input[name=last]').css('border-color', 'red')
        proceed = false;
    }
    if (email == "") {
        $('input[name=email]').css('border-color', 'red')
        proceed = false;
    }
    if (message == "") {
        $('textarea[name=message]').css('border-color', 'red');
        proceed = false;
    }

    if (proceed) {

        // Save message
        saveMessage(first + " " + last, email, message); 

        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').style.display = 'none';
        }, 3000);

        // Clear form
        document.getElementById('contactForm').reset();
    }


}

// Function to get get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message
    });
}

$("#contactForm input, #contactForm textarea").keyup(function() {
    $('textarea[name=message]').css('border-color', '');
    $("#contactForm input").css('border-color', '');
});
