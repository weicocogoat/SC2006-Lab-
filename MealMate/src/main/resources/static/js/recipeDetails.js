/*** FOR RECIPE DETAILS PAGE ***/
function getRecipeDetails() {
	const url = window.location.href;
	const recipeId = url.split("/")[4];

	fetch("http://localhost:8080/recipes/find/" + recipeId)
		.then((resp) => resp.json())
		.then(function(response) {

			console.log(response);

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

			loadRecipeDetails(recipe);


		}).catch(function(error) {
			console.log(error);
		});
}

function loadRecipeDetails(recipe) {
	const title = document.getElementById("recipeTitle");
	const datePublished = document.getElementById("datePublished");
	const author = document.getElementById("author");

	const prepTime = document.getElementById("preparationTime");
	const servingSize = document.getElementById("servingSize");
	const calories = document.getElementById("calories");

	const desc = document.getElementById("description");

	// Display General Information

	title.innerHTML = recipe.title;
	datePublished.innerHTML = new Date(recipe.dateCreated).toLocaleDateString();
	author.innerHTML = recipe.author;
	prepTime.innerHTML = recipe.prepTime + " Hour(s)";
	servingSize.innerHTML = recipe.servingSize + " Portions";
	calories.innerHTML = recipe.calories + " kcal";
	desc.innerHTML = recipe.description;

	// Display Ingredients
	const ingredientList = document.getElementById("ingredientList");

	for(var i = 0; i < recipe.ingredients.length; i++) {
		let ingredient = recipe.ingredients[i];
		console.log(ingredient);

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
		console.log(step);

		const stepView = `
			<div id="step${step.stepNum}Cont" class="recipeStepBox mb-3">
				<h6 class="fw-bold">Step ${(i+1)}</h6>
		        <p>${step.stepInstruction}</p>
		    </div>
		`;

		stepsList.innerHTML += stepView;
	}
}