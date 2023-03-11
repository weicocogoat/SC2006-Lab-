var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#register').onclick = function() {
        // temporary, to be replaced
        var validate = validateForm();
        if (validate) {
            window.location.href = 'homescreen(signed in).html'
        }
    }

    document.querySelector('.showPassword').onclick = function() {
        if (x) {
            document.querySelector('#password').type = 'text';
            x = false;
        }
        else {
            document.querySelector('#password').type = 'password';
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
    if (username === "") {
      // alert("Username must be filled out");
      return false;
    }

    if (email === "") {
        // alert("Email must be filled out");
        return false;
      }

    if (password === "") {
        // alert("Password must be filled out");
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
    return true;
}