var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#register').onclick = function() {
        // temporary, to be replaced
        var validate = validateForm();
        if (validate) {
            //window.location.href = 'transition.html'
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
      toastr.error("Username must be at least 8 characters.");
      return false;
    }

    if (!ValidateEmail(email)){
        toastr.error("You have entered an invalid email address!");
        return false;
    }

    if (password.length < 8) {
        toastr.error("Password must be at least 8 characters.");
        return false;
    }

    if (confirmpassword === "") {
        toastr.error("Please confirm your password.");
        return false;
    }

    if (password !== confirmpassword) {
        toastr.error("Passwords do not match!");
        return false;
    }

    if (weight <= 0 || weight.length == 0) {
        toastr.error("Please enter a valid weight.");
        return false;
    }

    if (height <= 0 || height.length == 0) {
        toastr.error("Please enter a valid height.");
        return false;
    }

    //Add code to validate with db (check for dupes)
    createUser();

    return true;
}

function ValidateEmail(mail) 
{
    /*Email Regex */
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    }

    return false;
}

function createUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    const bmi = calculateBmi(height, weight);

    const currDate = new Date().convertToLocal();

    const newUser = {
        username: username,
        password: password,
        email: email,
        height: height,
        weight: weight,
        bmi: bmi.toString(),
        recipeBookmarks: [],
        dateJoined: new Date().convertToLocal().toDateInputValue()
    };

    console.log(newUser);

    fetch('http://localhost:8080/api/auth/register', {
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
                 //'X-CSRFToken': $('input[name="_csrf"]').val()
             },
             body: JSON.stringify(newUser)
         })
         .then(data => {
             console.log('Success:', data);
         })
         .catch((error) => {
             console.error('Error:', error);
         });
         
}

function calculateBmi(height, weight) {
    return ((weight/height/height) * 10000).toFixed(2);
}