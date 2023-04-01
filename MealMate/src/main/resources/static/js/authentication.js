var x = true;
document.addEventListener('DOMContentLoaded', function() {

    if($("#signin2").length > 0) {
        document.querySelector("#signin2").onclick = function() {
            //temp code. will be replaced later
            var validate = validateForm();
            if (validate) {
                authenticateUser();
            }
        }
    }

    if($(".showPassword").length > 0) {
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
    }
});

function validateForm() {
    const user_name = document.forms["userDetails"]["username"].value;
    const pass_word = document.forms["userDetails"]["password"].value;

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

function authenticateUser() {
    const username = document.getElementById("username").value;
    const password  = document.getElementById("password").value;

    const user = {
        username: username,
        password: password
    };

    fetch('http://localhost:8080/api/auth/login', {
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
                 //'X-CSRFToken': $('input[name="_csrf"]').val()
             },
             body: JSON.stringify(user)
         })
        .then(response => {
            console.log("Response...");
            console.log(response);

            return response.json();
        })
        .then(data => {
            console.log('Success:', data);

            // Save userId, accessToken and refreshToken into session storage
            window.sessionStorage.setItem('id', data.userId);
            window.sessionStorage.setItem('accessToken', data.accessToken);
            window.sessionStorage.setItem('refreshToken', data.refreshToken);

            // Redirect to home page
            window.location.href="/";

        })
        .catch((error) => {
            alert("Failed to login, please try again!");
            console.error('Error:', error);
        });
}

function logoutUser() {
    // Clear Session Storage
    sessionStorage.clear();

    // Redirect to home page
    window.location.href="/";
}