$(document).ready(function() {
	const recipeOptions = document.getElementById("recipeOptions");
	const navbarOptions = document.getElementById("navbarOptions");

	let userId = sessionStorage.getItem("id");

	if(userId) {
		let accessToken = sessionStorage.getItem("accessToken");
		console.log("Access token: " + accessToken);

		// Get User Information
		fetch('http://localhost:8080/api/users/' + userId, {
	            method: 'GET',
	            withCredentials: true,
	            credentials: 'include',
	            headers: {
	                'content-type': 'application/json',
	                'authorization': 'Bearer ' + accessToken
	            }
	        })
			.then(response => {
	            //console.log('Success:', response);

	            return response.json();
	         })
	        .then(data => {
	            console.log(data);

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
		//navbarOptions.innerHTML = `<a class="btn btn-light px-4" th:href="@{/login}">Sign In</a>`;
		navbarOptions.innerHTML = `<a class="btn btn-light px-4" href="/login">Sign In</a>`;
	}
});