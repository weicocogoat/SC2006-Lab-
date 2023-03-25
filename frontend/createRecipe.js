function searchIngredient() {
	const ingredient = document.getElementById("ingredientInput").value.trim();

	console.log(ingredient.length);

	if(ingredient.length == 0) {
		// Show some error msg here
		//console.log("pls enter");
		toastr.success('Click Button');
		
	} else {
		// Reset Search Results
		const ingredientsCont = document.getElementById("ingredientList");
		ingredientsCont.innerHTML = "";

		// Display Spinner
		//const searchSpinner = document.getElementById("searchSpinner");
		//searchSpinner.classList.add("d-none");

		fetch("https://api.spoonacular.com/food/ingredients/autocomplete?query="+ ingredient +"&metaInformation=true&number=2&apiKey=46e36064541946a6bf3c8f20c84f188a")
			.then((resp) => resp.json())
			.then(function(response) {
				response.forEach(function(item, index) {
					const ingredientObj = {
						id: item.id,
						name: item.name,
						image: item.image
					}

					// Display Result
					displayResults(ingredientObj);
				});

			}).catch(function(error) {
				console.log(error);
			});
	}
}

// Display Results based on Search Input
function displayResults(ingredient) {
	// Once response returns, hide spinner
	//searchSpinner.classList.remove("d-none");

	const item = {
		id: ingredient.id,
		name: ingredient.name,
		image: ingredient.image
	};

	console.log(item);

	var ingredientString = JSON.stringify(ingredient);
	ingredientString = ingredientString.replaceAll('"', "'");

	const resultsCont = document.getElementById("searchResults");
	
	const newItem = 
	`<li>
		<img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}">
		${ingredient.name}
		<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#ingredientModal" data-ingredientId="${ingredient.id}" onclick="displayModalDetails(${ingredientString})"><i class="fa-solid fa-plus"></i></button>
	</li>`;

	resultsCont.innerHTML += newItem;
}

let currIngredient = {};
let nutrition;
let calories = [];

// Display Modal Details of Ingredient to Add
function displayModalDetails(ingredient) {
	console.log("Fetching details of ID " + ingredient.id);

	// Get Individual Ingredient Details (i.e. Calories)
	fetch("https://api.spoonacular.com/food/ingredients/"+ ingredient.id +"/information?apiKey=46e36064541946a6bf3c8f20c84f188a&amount=1")
			.then((resp) => resp.json())
			.then(function(response) {

				console.log(response);

				let weightPerServing = response.nutrition.weightPerServing;		// An array containing amount (e.g. 108) and unit (e.g. g)

				nutrition = response.nutrition.nutrients;
				calories = [];		// stores amount, percentOfDailyNeeds, unit (e.g. kcal)

				for(var i = 0; i < nutrition.length; i++) {
					if(nutrition[i].name == "Calories") {
						calories = nutrition[i];
					}
				}

				// Get Details of Ingredient as an Object
				currIngredient = {
					name: ingredient.name,
					calories: calories.amount,	// always assumed to be in kcal by default
					image: ingredient.image,
					quantity: 1,	// set as 1 by default first
					quantityUnit: weightPerServing.unit
				};

			}).catch(function(error) {
				console.log(error);
			});

	const modalTitle = document.getElementById("modalName");
	modalTitle.innerHTML = ingredient.name;
}
 
// Calculate Nutrition (i.e. calories) of Ingredient		
function calculateNutrition() {
	// Calculate Calories
	let quantity = document.getElementById("quantity").value;
	console.log(quantity);

	let totalCalories = quantity * calories.amount;

	const nutritionValues = document.getElementById("nutritionValues");
	nutritionValues.innerHTML = totalCalories + " " + calories.unit;

	// Update Ingredient Object
	currIngredient.calories = totalCalories;
	currIngredient.quantity = quantity;
}


let ingredientsList = [];

// Add Ingredient to List
function addIngredient() {
	// Hide Modal, not working need to fix
	/*
	var ingredientModal = new bootstrap.Modal(document.getElementById(""), {
		keyboard: false
	});

	ingredientModal.hide();
	*/

	console.log("Trying to add...");
	console.log(currIngredient);

	// Add to Global Array
	ingredientsList.push(currIngredient);

	// Display Ingredient (right-side list)
	const ingredientList = document.getElementById("ingredientList");

	const newItem = 
	`<li id="${currIngredient.name}ListItem">
		<img src="https://spoonacular.com/cdn/ingredients_100x100/${currIngredient.image}">
		${currIngredient.name} - ${currIngredient.calories} kcal (${currIngredient.quantity} ${currIngredient.quantityUnit})
		<button class="btn" type="button" onclick="removeIngredient('${currIngredient.name}')"><i class="fa-solid fa-xmark"></i></button>
	</li>`;

	ingredientList.innerHTML += newItem;
}

// Remove Ingredient from List
function removeIngredient(name) {
	console.log("Trying to remove..." + name);

	// Remove from Global Array
	for(var i = 0; i < ingredientsList.length; i++) {
		if(ingredientsList[i].name == name) {
			ingredientsList.pop(ingredientsList[i]);
		}
	}

	// Remove from View
	document.getElementById(name + "ListItem").remove();
}

const listOfSteps = [];

// Add Step to List
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