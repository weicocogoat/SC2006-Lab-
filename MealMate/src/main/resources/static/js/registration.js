var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#register').onclick = function() {
        var validate = validateForm();
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

    // Submit Form on Enter Key Up (once user releases key)
    $(document).on('keyup', function(e) {
        if(e.key === 'Enter' || e.key === 13) {
            if(window.location.pathname.includes("login") || window.location.pathname.includes("register")) {
                validateForm();
            }
        }
    });
});

function validateForm() {
    const username = document.forms["userDetails"]["username"].value;
    const email = document.forms["userDetails"]["email"].value;
    const password = document.forms["userDetails"]["password"].value;
    const confirmpassword = document.forms["userDetails"]["confirm-password"].value;
    const weight = document.forms["userDetails"]["weight"].value;
    const height = document.forms["userDetails"]["height"].value;

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
    // Email Regex
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

    fetch('http://localhost:8080/api/auth/register', {
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify(newUser)
         })
        .then((response) => {
            if(!response.ok) {
                return response.text().then(body => {
                    throw new Error(body);
                });
            }

            return response.json();
        })
         .then(data => {
             toastr.success("Account successfully created.", "Account Created!");
             //console.log('Result:', data);
         })
         .catch(error => {
             if(error.message == "username_in_use")
                 toastr.error("Username is taken, please try again!", "Username Taken");
             else if(error.message == "email_in_use")
                 toastr.error("Email is taken, please try again!", "Email Taken");
             else
                 toastr.error("Registration failed, please try again!", "Failed to Register");

         });
         
}

function calculateBmi(height, weight) {
    return ((weight/height/height) * 10000).toFixed(2);
}