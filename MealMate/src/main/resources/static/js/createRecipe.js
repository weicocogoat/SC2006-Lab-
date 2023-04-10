$(document).ready(function() {
	// Search Ingredient on Enter Keypress (if search input in focus)
	$('#ingredientInput').on('keyup', function(e) {
		if(e.key === "Enter" || e.key === 13) {
			searchIngredient();
		}
	});

	// Add Step on Enter Keypress (if textarea in focus)
	$('#stepInput').on('keyup', function(e) {
		if(e.key === "Enter" || e.key === 13) {
			addStep();
		}
	});

});

let imgDataURL;
function getImage(input) {

	const img = input.files[0];

	const fileReader = new FileReader();

	fileReader.onload = function() {
		console.log("Result", fileReader.result);
		imgDataURL = fileReader.result;
	};

	/*
	fileReader.onloadend = function() {
		console.log(imgDataURL);
	};
	*/

	fileReader.readAsDataURL(img);
}

function searchIngredient() {
	flag = 0;
	const ingredient = document.getElementById("ingredientInput").value.trim();

	if(ingredient.length == 0) {
		// Show some error msg here
		//console.log("pls enter");
		toastr.error('Please enter a valid name.');
		
	} else {
		fetch("https://api.spoonacular.com/food/ingredients/autocomplete?query="+ ingredient +"&metaInformation=true&number=2&apiKey=46e36064541946a6bf3c8f20c84f188a")
			.then((resp) => resp.json())
			.then(function(response) {
				
				// Reset search results first
				const resultsCont = document.getElementById("searchResults");
				resultsCont.innerHTML = "";

				response.forEach(function(item, index) {
					const ingredientObj = {
						id: item.id,
						name: item.name,
						image: item.image
					}

					// Display Result
					displayResults(ingredientObj);
					flag = 1;
				});

				if (flag == 0){
					toastr.error("No results found");
				}

			}).catch(function(error) {
				toastr.error("An error occurred, please try again!", "Failed to Search Ingredient.");
				console.log(error);
			});
	}
}

// Display Results based on Search Input
function displayResults(ingredient) {
	// Once response returns, hide spinner
	//searchSpinner.classList.remove("d-none");

	const resultsCont = document.getElementById("searchResults");

	const item = {
		id: ingredient.id,
		name: ingredient.name,
		image: ingredient.image
	};

	console.log(item);

	var ingredientString = JSON.stringify(ingredient);
	ingredientString = ingredientString.replaceAll('"', "'");
	
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

				let weightPerServing = response.nutrition.weightPerServing;		// An array containing amount (e.g. 108) and unit (e.g. g)

				document.getElementById("quantityUnit").innerHTML = weightPerServing.unit;

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
				toastr.error("An error occurred, please try again!", "Failed to Load Details.");
				console.log(error);
			});

	const modalTitle = document.getElementById("modalName");
	modalTitle.innerHTML = ingredient.name;
}
 
// Calculate Nutrition (i.e. calories) of Ingredient		
function calculateNutrition() {
	// Calculate Calories
	let quantity = document.getElementById("quantity").value;

	if(quantity > 0) {
		let totalCalories = Math.round(quantity * calories.amount *100) / 100;

		const nutritionValues = document.getElementById("nutritionValues");
		nutritionValues.innerHTML = totalCalories + " " + calories.unit;

		// Update Ingredient Object
		currIngredient.calories = totalCalories;
		currIngredient.quantity = quantity;
	}
}


let ingredientsList = [];

// Add Ingredient to List
function addIngredient() {
	
	if($('#quantity').val().length == 0 || $('#quantity').val() <= 0) {
		toastr.error("Please enter a valid quantity.");
	} else {
		// Hide Modal
		let ingredientModal = bootstrap.Modal.getInstance(document.querySelector("#ingredientModal"));
		ingredientModal.hide();

		console.log("Trying to add...");
		console.log(currIngredient);

		// Add to Global Array
		ingredientsList.push(currIngredient);

		// Reset Add Ingredient Modal Details
		$('#quantity').val("");
		$('#nutritionValues').text("Not calculated yet");

		// Remove empty message if visible
		if(ingredientsList.length != 0) {
			document.getElementById("noItemsMsg").classList.remove("d-block");
			document.getElementById("noItemsMsg").classList.add("d-none");
		}

		// Display Ingredient (right-side list)
		const ingredientList = document.getElementById("ingredientList");

		const newItem = 
		`<li id="${currIngredient.name}ListItem">
			<img src="https://spoonacular.com/cdn/ingredients_100x100/${currIngredient.image}">
			${currIngredient.name} - ${currIngredient.calories} kcal (${currIngredient.quantity} ${currIngredient.quantityUnit})
			<button class="btn" type="button" onclick="removeIngredient('${currIngredient.name}')"><i class="fa-solid fa-xmark"></i></button>
		</li>`;

		ingredientList.innerHTML += newItem;

		// Show Success Toast
		toastr.success("Ingredient Successfully Added");
	}
}

// Remove Ingredient from List
function removeIngredient(name) {
	// Remove from Global Array
	for(var i = 0; i < ingredientsList.length; i++) {
		if(ingredientsList[i].name == name) {
			ingredientsList.pop(ingredientsList[i]);
		}
	}

	// Remove from View
	document.getElementById(name + "ListItem").remove();

	// Display empty list msg if no items
	if(ingredientsList.length == 0) {
		document.getElementById("noItemsMsg").classList.remove("d-none");
		document.getElementById("noItemsMsg").classList.add("d-block");
	}
}

let listOfSteps = [];		// Global Array of Steps

// Add Step to List
function addStep() {
	const stepInput = document.getElementById("stepInput").value;
	const stepsList = document.getElementById("stepsList");

	if(!stepInput || stepInput.length == 0) {
		toastr.error("Please enter a step instruction message.");
	} else {
		let stepNum = listOfSteps.length + 1;

		let newStep = {
			stepNum: stepNum,
			stepInstruction: stepInput
		};

		listOfSteps.push(newStep);

		/* original view with step number
		const stepView = `
			<div id="step${newStep.stepNum}Cont" class="recipeStepBox mb-3">
		        <h6 class="mb-3">
		            Step ${newStep.stepNum}
		            <button class="btn rounded-circle float-end" type="button" onclick="removeStep(${newStep.stepNum})"><i class="fa-solid fa-trash"></i></button>
		        </h6>

		        <p>${newStep.stepInstruction}</p>
		    </div>
		`;
		*/

		const stepView = `
			<div id="step${newStep.stepNum}Cont" class="recipeStepBox mb-3">
		        <p>
		        	${newStep.stepInstruction}
		        	<button class="btn rounded-circle float-end" type="button" onclick="removeStep(${newStep.stepNum})"><i class="fa-solid fa-trash"></i></button>
	        	</p>
		    </div>
		`;

		stepsList.innerHTML += stepView;

		// Reset input value
		document.getElementById("stepInput").value = "";
	}
}

// Remove Step from List
function removeStep(stepNum) {
	// Remove from Global Array
	for(var i = 0; i < listOfSteps.length; i++) {
		if(listOfSteps[i].stepNum == stepNum)
			listOfSteps.pop(listOfSteps[i]);
	}

	// Remove from View
	document.getElementById("step" + stepNum + "Cont").remove();
}

// Create Recipe
function createRecipe() {
	// Get General Information
	const recipeTitle = document.getElementById("title").value;
	const servingSize = document.getElementById("servingSize").value;
	const prepTime = document.getElementById("prepTime").value;

	if (recipeTitle === ""){
		toastr.error("Please input a Recipe Title.");
		return;
	}
	if (servingSize === ""  || parseInt(servingSize) < 1){
		toastr.error("Please input a positive Serving Size.");
		return;
	}
	if (prepTime === ""  || parseFloat(prepTime) <= 0){
		toastr.error("Please input a positive Preparation Time.");
		return;
	}
	if (imgDataURL === undefined){
		toastr.error("Please add image.");
		return;
	}

	let dietType = [];
	$('input[name="dietType"]:checked').each(function() {
		dietType.push(this.value);
	});

	const description = document.getElementById("desc").value;
	if (description === ""){
		toastr.error("Please input a Description.");
		return;
	}

	if (ingredientsList.length == 0){
		toastr.error("Please add the ingredients.");
		return;
	}

	if(listOfSteps.length == 0){
		toastr.error("Please add the list of steps.");
		return;
	}

	// Calculate Total Calories for Entire Recipe
	let totalCalories = 0;
	for(var i = 0; i < ingredientsList.length; i++) {
		totalCalories += ingredientsList[i].calories;
	}

	const newRecipe = {
		title: recipeTitle,
		author: localStorage.getItem("id"),	// save userId for author
		description: description,
		dateCreated: new Date().toISOString(),
		dietType: dietType,
		numOfBookmarks: 0,
		prepTime: prepTime,
		servingSize: servingSize,
		calories: totalCalories,
		ingredients: ingredientsList,
		steps: listOfSteps,
		image: imgDataURL
	};

	const testOutput = {
		title: recipeTitle,
		author: localStorage.getItem("id"),	// save userId for author
		description: description,
		dateCreated: new Date().toISOString(),
		dietType: dietType,
		numOfBookmarks: 0,
		prepTime: prepTime,
		servingSize: servingSize,
		calories: totalCalories,
		ingredients: ingredientsList,
		steps: listOfSteps
	};

	console.log(testOutput);

	fetch('http://localhost:8080/api/recipes/save', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
        .then(response => {
        	//response.json()
        })
        .then(data => {
        	toastr.success("Recipe successfully created.", "Recipe Created!");
        	resetForm();
        })
        .catch((error) => {
        	toastr.error("An error occurred, please try again!", "Failed to Create Recipe.");
            console.error('Error:', error);
        });
}

// Reset Create Recipe Form (Input fields and lists)
function resetForm() {
	// Reset Form Fields
	$('#newRecipeForm').trigger('reset');

	// Reset Ingredients List
	ingredientsList = [];
	$('#noItemsMsg').toggleClass('d-none');
	$('#noItemsMsg').toggleClass('d-block');
	$('#ingredientList').html("");


	// Reset List of Steps
	listOfSteps = [];
	$('#stepsList').html("");
}

// Add Recipe to Bookmark
function addBookmark() {

}