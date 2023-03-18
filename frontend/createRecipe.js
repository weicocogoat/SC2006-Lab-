function searchIngredient() {
	const ingredient = document.getElementById("ingredientInput").value.trim();

	console.log(ingredient.length);

	if(ingredient.length == 0) {
		// Show some error msg here
		console.log("pls enter");
	} else {
		fetch("https://api.spoonacular.com/food/ingredients/autocomplete?query="+ ingredient +"&number=5&apiKey=46e36064541946a6bf3c8f20c84f188a")
			.then((resp) => resp.json())
			.then(function(response) {

				console.log(response);

			}).catch(function(error) {
				console.log(error);
			});
	}

	/*
	fetch("https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=46e36064541946a6bf3c8f20c84f188a")
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
		*/
}

function addIngredient(item) {

}

const listOfSteps = [];

function addStep() {
	const stepInput = document.getElementById("stepInput").value;
	const stepsList = document.getElementById("stepsList");

	if(stepInput == "") {
		// some error handling
	} else {
		const listItem = document.createElement("li");
		listItem.appendChild(document.createTextNode(stepInput));

		stepsList.appendChild(listItem);

		listOfSteps.push(stepInput);

		console.log(listOfSteps);
	}
	console.log(stepInput);
}