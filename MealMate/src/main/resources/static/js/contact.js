function saveFeedback(){
    const author = document.getElementById("author").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (author.length == 0){
        toastr.error("Please enter your name.");
        return;
    }

    if (!ValidateEmail(email)){
        toastr.error("Please enter a valid email.");
        return;
    }

    if (message == 0){
        toastr.error("Please enter a valid feedback message.");
        return;
    }

    //Can add code for backend here
    SubmitFeedback();
}

function ValidateEmail(mail) 
{
    /*Email Regex */
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    }
    alert("You have entered an invalid email address!")
    return false;
}

function SubmitFeedback()
{
    const formData = new FormData();

    const feedback = {
        author: document.getElementById("author").value,
        email:document.getElementById("email").value,
        message: document.getElementById("message").value,
        dateSent: new Date().toISOString()}

        console.log(feedback);

    fetch('http://localhost:8080/feedback', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify(feedback)
    })
    .then(response => {

        return response;
     })
    .then(data => {
        // Show Success Modal
        let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
        myModal.show();

        // Clear Form
        document.getElementById("author").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

     })
    .catch((error) => {
        toastr.error("An error occurred, please try again!", "Failed to Send Feedback");
        console.log('error');
        console.log(error);
    });
}