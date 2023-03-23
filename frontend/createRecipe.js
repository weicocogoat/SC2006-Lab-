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

function displayResults(ingredient) {
	//console.log(ingredient);
	const item = {
		id: ingredient.id,
		name: ingredient.name,
		image: ingredient.image
	};

	console.log(item);

	const ingredientString = JSON.stringify(ingredient);
	console.log("String: " + ingredientString);

	const ingredientsCont = document.getElementById("ingredientList");

	
	const newItem = 
	`<li>
		<img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}">
		${ingredient.name}
		<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-ingredientId="${ingredient.id}" onclick="displayModalDetails(${ingredientString})"><i class="fa-solid fa-plus"></i></button>
	</li>`;
	

	/*
	const newItem = 
	"<li>
		<img src='https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}'>
		"+ingredient.name+" <button type='button' class='btn' data-bs-toggle='modal' data-bs-target='#exampleModal' data-ingredientId='ingredient.id' onclick='displayModalDetails(item.id)'><i class="fa-solid fa-plus"></i></button>
	</li>';
	*/

	ingredientList.innerHTML += newItem;
}

function displayModalDetails(ingredient) {
	console.log("displayModalDetails calling...");
	console.log("getting argument.." + ingredient);
	console.log("parsing.." + JSON.parse(ingredient));
}
 		
function calculateNutrition(item) {
	console.log(item); 

	// Get Individual Ingredient Details (i.e. Calories)
	fetch("https://api.spoonacular.com/food/ingredients/autocomplete?query="+ ingredient +"&metaInformation=true&number=2&apiKey=46e36064541946a6bf3c8f20c84f188a")
			.then((resp) => resp.json())
			.then(function(response) {

				response.forEach(function(item, index) {
					const ingredientObj = {
						id: item.id,
						name: item.name,
						image: item.image
					};

					// Display Result
					getIngredientDetails(ingredientObj);
				});

			}).catch(function(error) {
				console.log(error);
			});
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