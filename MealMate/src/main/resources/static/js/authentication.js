var x = true;
document.addEventListener('DOMContentLoaded', function() {

    if($("#signin2").length > 0) {
        document.querySelector("#signin2").onclick = function() {
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

    // Submit Form on Enter Key Up (once user releases key)
    $(document).on('keyup', function(e) {
        if(e.key === 'Enter' || e.key === 13) {
            validateForm();
        }
    });
});

function validateForm() {
    const user_name = document.forms["userDetails"]["username"].value;
    const pass_word = document.forms["userDetails"]["password"].value;

    //Empty username and password
    if (!user_name || user_name.length == 0) {
      toastr.error("Please enter a username.");
      return false;
    }

    if (!pass_word || pass_word.length == 0) {
        toastr.error("Please enter a password.");
        return false;
    }

    authenticateUser();

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

            // Save userId, accessToken and refreshToken into local storage
            window.localStorage.setItem('id', data.userId);
            window.localStorage.setItem('accessToken', data.accessToken);
            window.localStorage.setItem('refreshToken', data.refreshToken);

            // Redirect to home page
            window.location.href="/";

        })
        .catch((error) => {
            toastr.error("Authentication failed, please try again!", "Failed to login");
            console.error('Error:', error);
        });
}

function logoutUser() {
    // Clear Local Storage
    localStorage.clear();

    // Redirect to home page
    window.location.href="/";
}