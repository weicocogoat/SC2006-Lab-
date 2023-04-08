function saveFeedback(){
    const author = document.getElementById("author").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (author.length == 0){
        alert("Please input your name");
        return;
    }

    if (!ValidateEmail(email)){
        return;
    }

    if (message == 0){
        alert("Feedback is not filled up yet");
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

        // return some response from the backend (can either be success (200) or failure (e.g. 404, 401, 500 etc.))

        return response;     // can be in different formats e.g. json, text etc.
     })
    .then(data => {

            let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
            myModal.show();

            document.getElementById("author").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        // if i'm not wrong this is when if there's a success, state what else do you want it to do here

     })
    .catch((error) => {

        console.log('error');
        console.log(error);
        // otherwise if there's an error, do your error msgs here
    });
}