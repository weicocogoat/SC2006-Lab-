document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("val");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    }

    // Retrieve data from DB
    getRecipes();
});

// Array that will hold all recipes retrieved from DB
const listOfRecipes = [];

// Get All Recipes from DB
function getRecipes() {
	console.log("Retrieving receipes from database...");

	fetch("http://localhost:8080/recipes/all")
		.then((resp) => resp.json())
		.then(function(response) {

			console.log(response);

			response.forEach(function (item, index) {
                const recipeObj = {
                	id: item.id,	// currently returning undefined, need to fix
                	title: item.title,
                    author: item.author,
                    image: item.image,
                    description: item.description,
                    dateCreated: item.dateCreated,
                    dietType: item.dietType,
                    numOfBookmarks: item.numOfBookmarks,
                    prepTime: item.prepTime,
                    servingSize: item.servingSize,
                    calories: item.calories,
                    ingredients: item.ingredients,
                    steps: item.steps
               };

               // Store inside global array
               listOfRecipes.push(recipeObj);
          	});

          	// Display Recipes
          	displayRecipes();

		}).catch(function(error) {
			console.log(error);
		});
}

// Recipe Card HTML View Template
const recipeView = (recipe) => 
	`
	    <div class="recipeCard card shadow-sm mb-4">
	        <div class="row no-gutters">
	            <div class="col-md-3">
	            	<div class="recipeCardImg">
	            		<img src="${recipe.image}" class="card-img" alt="Alternative text for image">
	            		<h5 class="recipeCalories">${recipe.calories} kcal</h5>
	            	</div>
	                
	            </div>
	            <div class="col-md-9">
	                <div class="card-body">
	                	${generateBadges(recipe)}
	                    <div id="firstLine">
	                        <h5 id="title">${recipe.title}</h5>
	                        <h6 id="star-rating">${recipe.numOfBookmarks} <i class="fa-solid fa-star"></i></h6>
	                    </div>
	                    <div id="secondLine" class="text-muted">
	                        <p id="servingSize">${recipe.servingSize} Servings</p> 
	                        <p id="duration">${recipe.prepTime} Hours</p>
	                    </div>
	                    <p class="card-text">${recipe.description}</p>
	                    <div class="d-flex justify-content-between align-items-center">
	                        <a id="readMore" href="recipes/${recipe.id}"><h6>Read More <i
	                            class="fa-solid fa-arrow-right"></i></h6></a>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	`
;

function generateBadges(recipe) {
	console.log(recipe.dietType);
	let badgesView = "";

	for(var i = 0; i < recipe.dietType.length; i++) {
		let dietType = recipe.dietType[i];

		badgesView += "<span class='badge bg-secondary badgeItem mb-2'>" + dietType + "</span>";
	}

	return badgesView;
}

// Render and Display Recipes in View
function displayRecipes() {
	const recipeViewList = [];	// Array that will hold all individual HTML views to generate of each recipe

	for(var i=0; i < listOfRecipes.length; i++) {
		const recipe = listOfRecipes[i];
		//const itemViewHTML = recipeView(recipe.id, recipe.title, recipe.numOfBookmarks, recipe.servingSize, recipe.prepTime, recipe.description);
		const itemViewHTML = recipeView(recipe);

		recipeViewList.push(itemViewHTML);
	}

	// Combine all the recipe cards together into a string
	const recipeViewHTML = recipeViewList.join("\n");

	// Insert into Recipe Container
	const recipeContainer = document.getElementById("recipeContainer");
	recipeContainer.innerHTML = recipeViewHTML;
}

function getRecipeDetails() {
	const url = window.location.href;
	const recipeId = url.split("/")[4];
	console.log(recipeId);

	fetch("http://localhost:8080/recipes/find/" + recipeId)
		.then((resp) => resp.json())
		.then(function(response) {

			console.log(response);

			const recipe = {
				id: response.id,
                author: response.author,
                calories: response.calories,
                dateCreated: response.dateCreated,
                description: response.description,
                ingredients: response.ingredients,
                numOfBookmarks: response.numOfBookmarks,
                portions: response.portions,
                prepTime: response.preparationTime,
                steps: response.steps,
                title: response.title
			}

			loadRecipeDetails(recipe);


		}).catch(function(error) {
			console.log(error);
		});
}

/* FOR RECIPE DETAILS PAGE */
function loadRecipeDetails(recipe) {
	const title = document.getElementById("recipeTitle");
	const datePublished = document.getElementById("datePublished");
	const author = document.getElementById("author");

	const prepTime = document.getElementById("preparationTime");
	const portions = document.getElementById("portions");
	const calories = document.getElementById("calories");

	const desc = document.getElementById("description");

	title.innerHTML = recipe.title;
	datePublished.innerHTML = recipe.dateCreated;
	author.innerHTML = recipe.author;
	prepTime.innerHTML = recipe.prepTime;
	portions.innerHTML = recipe.portions;
	calories.innerHTML = recipe.calories;
	desc.innerHTML = recipe.description;

}