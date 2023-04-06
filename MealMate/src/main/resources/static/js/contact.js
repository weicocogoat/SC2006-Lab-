function saveFeedback(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const user_feedback = document.getElementById("user_feedback").value;

    if (name.length == 0){
        alert("Please input your name");
        return;
    }

    if (!ValidateEmail(email)){
        return;
    }

    if (user_feedback == 0){
        alert("Feedback is not filled up yet");
        return;
    }

    //Can add code for backend here
    console.log(name);
    console.log(email);
    console.log(user_feedback);


    let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    myModal.show();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("user_feedback").value = "";

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