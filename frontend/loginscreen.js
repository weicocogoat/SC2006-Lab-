var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector("#signin2").onclick = function() {
        //temp code. will be replaced later
        validateForm();
    }

    document.querySelector(".showPassword").onclick = function() {
        if (x){
            document.querySelector("#password").type = "text";
            x = false;
        }
        else{
            document.querySelector("#password").type = "password";
            x = true;
        }
    }



});

function validateForm() {
    username = document.forms["userDetails"]["username"].value;
    password = document.forms["userDetails"]["password"].value;

    //code to check user and pass against database





    //Empty username and password
    if (username == "") {
      alert("Username must be filled out");
      return false;
    }

    if (password == "") {
        alert("Password must be filled out");
        return false;
    }
    return true;
}