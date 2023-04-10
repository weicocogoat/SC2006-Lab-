$(document).ready(function() {
	// Check if user is signed in and authenticated
	let userId = localStorage.getItem('id');
    let accessToken = localStorage.getItem('accessToken');

    if(userId) {
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

	        // If user is authenticated
	        $('#addToMealBtn').removeClass('d-none');
	        $('#addToBookmarksBtn').removeClass('d-none');

	        containsBookmark();

	     })
	    .catch((error) => {
	        console.error('Error:', error);
	    });
    }
});

/*** FOR RECIPE DETAILS PAGE ***/
function getRecipeDetails() {
	const url = window.location.href;
	const recipeId = url.split("/")[4];

	fetch("http://localhost:8080/api/recipes/find/" + recipeId)
	.then((resp) => resp.json())
	.then(function(response) {

		const recipe = {
			id: response.id,
        	title: response.title,
            author: response.author,
            image: response.image,
            description: response.description,
            dateCreated: response.dateCreated,
            dietType: response.dietType,
            numOfBookmarks: response.numOfBookmarks,
            prepTime: response.prepTime,
            servingSize: response.servingSize,
            calories: response.calories,
            ingredients: response.ingredients,
            steps: response.steps
		}

		// Load Recipe Details on View
		loadRecipeDetails(recipe);

	}).catch(function(error) {
		console.log(error);
	});
}

// Load Recipe Details on View
function loadRecipeDetails(recipe) {
	const image = document.getElementById("recipeImg");
	const title = document.getElementById("recipeTitle");
	const datePublished = document.getElementById("datePublished");
	const author = document.getElementById("author");
	const prepTime = document.getElementById("preparationTime");
	const servingSize = document.getElementById("servingSize");
	const calories = document.getElementById("calories");
	const desc = document.getElementById("description");

	// Display General Information
	image.src = recipe.image;
	title.innerHTML = recipe.title;

	let date = new Date(recipe.dateCreated);
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let dateString = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
	datePublished.innerHTML = dateString;

	// Get Author Name
	fetch("http://localhost:8080/api/users/username/" +  recipe.author)
		.then(response => {
			//console.log(response);
			return response.text();
		})
		.then(data => {
			
			author.innerHTML = data;

		}).catch(function(error) {
			console.log(error);
		});

	prepTime.innerHTML = recipe.prepTime + " Hour(s)";
	servingSize.innerHTML = recipe.servingSize + " Portions";
	calories.innerHTML = recipe.calories + " kcal";
	desc.innerHTML = recipe.description;

	// Display Ingredients
	const ingredientList = document.getElementById("ingredientList");

	for(var i = 0; i < recipe.ingredients.length; i++) {
		let ingredient = recipe.ingredients[i];

		const newItem = 
		`<li id="${ingredient.name}ListItem">
			<img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}">
			${ingredient.name} - ${ingredient.quantity}${ingredient.quantityUnit}
		</li>`;

		ingredientList.innerHTML += newItem;
	}


	// Display Steps
	const stepsList = document.getElementById("stepsList");

	for(var i = 0; i < recipe.steps.length; i++) {
		let step = recipe.steps[i];

		const stepView = `
			<div id="step${step.stepNum}Cont" class="recipeStepBox mb-3">
				<h6 class="fw-bold">Step ${(i+1)}</h6>
		        <p>${step.stepInstruction}</p>
		    </div>
		`;

		stepsList.innerHTML += stepView;
	}

	// Update Add to Meal Modal View
	const mealTitle = document.getElementById("mealHeader");
	const mealCalories = document.getElementById("mealCalories");

	mealTitle.innerHTML = recipe.title;
	mealCalories.innerHTML = recipe.calories + " kcal";
}

// Create New Meal
function addToMeal() {
	// New Meal Object
	const newMeal = {
		"userId": localStorage.getItem("id"),
		"name": $('#recipeTitle').text(),
		"calories": $('#calories').text().split(" ")[0],	// get float only, minus 'kcal' string
		"mealType": $('#mealType').find(':selected').val(),
		"mealDate": new Date().convertToLocal().toISOString()
	}

	// Create Meal
	fetch('http://localhost:8080/api/meal/save', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMeal)
        })
        .then(response => {
        	console.log(response);
        	//response.json()
        })
        .then(data => {
        	// Success message here
        	toastr.success("Meal successfully added!", "Added to Meal.");

        	// Hide Modal
			let mealModal = bootstrap.Modal.getInstance(document.querySelector("#addMealModal"));
			mealModal.hide(); 

        })
        .catch((error) => {
        	toastr.error("An error occurred, please try again!", "Failed to Add to Meal.");
            console.error('Error:', error);
        });
}