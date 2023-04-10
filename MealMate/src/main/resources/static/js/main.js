$(document).ready(function() {
	// Initiate Animate on Scroll (AOS) Library
	AOS.init();

	// Toast Options
	toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true
	}

	const recipeOptions = document.getElementById("recipeOptions");
	const navbarOptions = document.getElementById("navbarOptions");

	let userId = localStorage.getItem("id");

	if(userId) {
		let accessToken = localStorage.getItem("accessToken");

		// Get User Information
		fetch('http://localhost:8080/api/users/' + userId, {
            method: 'GET',
            //withCredentials: true,
            //credentials: 'include',
            headers: {
                'content-type': 'application/json'
                //'authorization': 'Bearer ' + accessToken
            }
        })
		.then(response => {
            //console.log('Success:', response);
            
            return response.json();
         })
        .then(data => {
            // Update Recipes Dropdown View
            $("#recipeOptions").toggleClass("dropdown");
            recipeOptions.innerHTML =
            `
				<a class="nav-link dropdown-toggle" href="#" id="recipeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Recipes
				</a>

				<ul class="dropdown-menu" aria-labelledby="userDropdown">
					<li><a class="dropdown-item" href="/recipes/create">Create Recipe</a></li>
					<li><a class="dropdown-item" href="/recipes"">Browse Recipes</a></li>
				</ul>
            `;


            // Update User Dropdown View
			$("#navbarOptions").toggleClass("dropdown");

			navbarOptions.innerHTML = 
			`
				<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					${data.username}
				</a>

				<ul class="dropdown-menu" aria-labelledby="userDropdown">
					<li><a class="dropdown-item" href="/profile">View Profile</a></li>
					<li><a class="dropdown-item" href="#" onclick="logoutUser()">Log Out</a></li>
				</ul>
			`;
         })
        .catch((error) => {
            console.error('Error:', error);
        });
	} else {
		navbarOptions.innerHTML = `<a class="btn btn-light px-4" href="/login">Sign In</a>`;
	}

	// For Date Conversion (to local time)
	// Reference: https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
	Date.prototype.convertToLocal = (function() {
	    var local = new Date(this);
	    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

	    return local;
	});

	Date.prototype.toDateInputValue = (function() {
		var local = new Date(this);
		
	    return local.toJSON().slice(0,10);
	});
});