var x = true;
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector("#signin2").onclick = function() {
        //temp code. will be replaced later
        var validate = validateForm();
        if (validate){
            window.location.href="homescreen(signed in).html";
        }
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
    const user_name = document.forms["userDetails"]["username"].value;
    const pass_word = document.forms["userDetails"]["password"].value;

    const userInfo = {
        username : user_name,
        password : pass_word
    }
    window.sessionStorage.setItem('user', JSON.stringify(userInfo));

    //TODO
    //code to check user and pass against database





    //Empty username and password
    if (user_name.length < 8) {
      alert("Username must be at least 8 characters");
      return false;
    }

    if (pass_word.length < 8 ) {
        alert("Password must be at least 8 characters");
        return false;
    }
    return true;
}