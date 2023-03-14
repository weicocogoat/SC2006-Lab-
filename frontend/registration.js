var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#register').onclick = function() {
        // temporary, to be replaced
        var validate = validateForm();
        if (validate) {
            window.location.href = 'transition.html'
        }
    }

    document.querySelector('.showPassword').onclick = function() {
        if (x) {
            document.querySelector('#password').type = 'text';
            document.querySelector('#confirm-password').type = 'text';
            x = false;
        }
        else {
            document.querySelector('#password').type = 'password';
            document.querySelector('#confirm-password').type = 'password';
            x = true;
        }
    }
});

function validateForm() {
    const username = document.forms["userDetails"]["username"].value;
    const email = document.forms["userDetails"]["email"].value;
    const password = document.forms["userDetails"]["password"].value;
    const confirmpassword = document.forms["userDetails"]["confirm-password"].value;
    const weight = document.forms["userDetails"]["weight"].value;
    const height = document.forms["userDetails"]["height"].value;

    //TODO
    //code to check user and pass against database

    //Empty username, email and password
    if (username.length < 8) {
      alert("Username must be at least 8 characters");
      return false;
    }

    if (!ValidateEmail(email)){
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }

    if (confirmpassword === "") {
        // alert("Password must be filled out");
        return false;
    }

    if (password !== confirmpassword) {
        alert('Passwords do not match!');
        return false;
    }

    //Add code to validate with db (check for dupes)

    const userInfo = {
        username : username,
        password : password
    }
    window.sessionStorage.setItem('user', JSON.stringify(userInfo));

    //Add code to store username, password, height, weight to DB


    return true;
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