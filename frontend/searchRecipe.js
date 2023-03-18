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

// Recipe Card HTML View Template
const recipeView = (id, title, numOfBookmarks, portions, time, desc) => 
	`
	    <div class="card shadow-sm mb-4">
	        <div class="row no-gutters">
	            <div class="col-md-3">
	                <img src="images/pancakes.jpg" class="card-img" alt="Alternative text for image">
	            </div>
	            <div class="col-md-9">
	                <div class="card-body">
	                    <div id="firstLine">
	                        <h5 id="title">${title}</h5>
	                        <h6 id="star-rating">${numOfBookmarks} <i class="fa-solid fa-star"></i></h6>
	                    </div>
	                    <div id="secondLine" class="fw-bold text-muted">
	                        <p id="servingSize">${portions} servings</p> 
	                        <p id="duration">${time}</p>
	                    </div>
	                    <p class="card-text">${desc}</p>
	                    <div class="d-flex justify-content-between align-items-center">
	                        <button type="button" id="readMore"><h6>Read More <i
	                            class="fa-solid fa-arrow-right"></i></h6></button>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	`
;

// Get All Recipes from DB
function getRecipes() {
	console.log("Retrieving receipes from database...");

	fetch("http://localhost:8080/recipes/all")
		.then((resp) => resp.json())
		.then(function(response) {

			//console.log(response);

			response.forEach(function (item, index) {
                const recipeObj = {
                	id: item._id,	// currently returning undefined, need to fix
                    author: item.author,
                    calories: item.calories,
                    dateCreated: item.dateCreated,
                    description: item.description,
                    ingredients: item.ingredients,
                    numOfBookmarks: item.numOfBookmarks,
                    portions: item.portions,
                    preparationTime: item.preparationTime,
                    steps: item.steps,
                    title: item.title
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

// Render and Display Recipes in View
function displayRecipes() {
	console.log(listOfRecipes);
	const recipeViewList = [];	// Array that will hold all individual HTML views to generate of each recipe

	for(var i=0; i < listOfRecipes.length; i++) {
		const recipe = listOfRecipes[i];
		const itemViewHTML = recipeView(recipe.id, recipe.title, recipe.numOfBookmarks, recipe.portions, recipe.preparationTime, recipe.description);

		recipeViewList.push(itemViewHTML);
	}

	// Combine all the recipe cards together into a string
	const recipeViewHTML = recipeViewList.join("\n");

	// Insert into Recipe Container
	const recipeContainer = document.getElementById("recipeContainer");
	recipeContainer.innerHTML = recipeViewHTML;
}