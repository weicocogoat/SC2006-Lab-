// Array that will hold all recipe names retrieved from DB
var listOfRecipeName = [];

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
	autocomplete(document.getElementById("recipeInput"), listOfRecipeName);

});

// Array that will hold all recipes retrieved from DB
var listOfRecipes = [];
var dietTypeFilter = [];
var dietTypeFilterState = [];
var cal;

// Get All Recipes from DB
function getRecipes() {
	console.log("Retrieving receipes from database...");

	listOfRecipes = [];
	listOfRecipeName = [];
	dietTypeFilter = [];
	dietTypeFilterState = [];

	var flag2 = 0;

	if (document.getElementById("dairyFree").checked){
		dietTypeFilter.push("dairy free");
		dietTypeFilterState.push(true);
	}
	if (document.getElementById("glutenFree").checked){
		dietTypeFilter.push("gluten free");
		dietTypeFilterState.push(true);
	}
	if (document.getElementById("vegan").checked){
		dietTypeFilter.push("vegan");
		dietTypeFilterState.push(true);
	}
	if (document.getElementById("vegetarian").checked){
		dietTypeFilter.push("vegetarian");
		dietTypeFilterState.push(true);
	}

	//check if all boxes are unchecked
	console.log(dietTypeFilterState.length);
	if (dietTypeFilterState.length > 0){
		flag2 = 1;
	}


	cal = parseInt(document.getElementById("myRange").value);

	fetch("http://localhost:8080/api/recipes/all")
		.then((resp) => resp.json())
		.then(function(response) {
			response.forEach(function (item, index) {
                const recipeObj = {
                	id: item.id,
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
			   if (flag2 == 0){
					listOfRecipes.push(recipeObj);
					listOfRecipeName.push(recipeObj["title"]);
			   }
			   else{
					for (var i = 0; i < recipeObj["dietType"].length; i++){
						if (dietTypeFilter.includes(recipeObj["dietType"][i])){
							listOfRecipes.push(recipeObj);
							listOfRecipeName.push(recipeObj["title"]);
							break;
						}
					}
			   }

          	});

			for (var i = listOfRecipes.length - 1; i >= 0; i--){
				//console.log(listOfRecipes[i].calories);
				//console.log(cal);
				if (listOfRecipes[i].calories > cal){
					listOfRecipes.splice(i, 1);
					listOfRecipeName.splice(i, 1);
				}
		    }

          	// Display Recipes
          	displayRecipes();

		}).catch(function(error) {
			console.log(error);
		});
}

// Recipe Card HTML View Template
const recipeView = (recipe) => 
	`
	    <div class="recipeCard card shadow-sm mb-4" data-aos="fade-up">
	        <div class="row no-gutters">
	            <div class="col-md-3">
	            	<div class="recipeCardImg">
	            		<img src="${recipe.image}" class="card-img">
	            		<span class="recipeCalories">${recipe.calories} kcal</span>
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
	                        <a class="textLink stretched-link" href="recipes/${recipe.id}"><h6>Read More <i
	                            class="fa-solid fa-arrow-right"></i></h6></a>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	`
;

function generateBadges(recipe) {
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
		const itemViewHTML = recipeView(recipe);

		recipeViewList.push(itemViewHTML);
	}

	// Combine all the recipe cards together into a string
	const recipeViewHTML = recipeViewList.join("\n");

	// Insert into Recipe Container
	const recipeContainer = document.getElementById("recipeContainer");
	recipeContainer.innerHTML = recipeViewHTML;
}

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	  }
	}
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
  });
  }

function searchIngredient(recipeName){

	if(recipeName.length <= 0) {
		// If search field is empty
		getRecipes();
	} else {
		var i = 0;
		for(i ; i < listOfRecipeName.length; i++) {
			if (listOfRecipeName[i].includes(recipeName)){
				break;
			}
		}

		if(i > listOfRecipeName.length) {
			// No results found
			$('#recipeContainer').html("<h6 class='text-center'>No search results found!</h6>");
		}

		const recipeViewList = [];	// Array that will hold all individual HTML views to generate of each recipe
		const itemViewHTML = recipeView(listOfRecipes[i]);
		recipeViewList.push(itemViewHTML);

		// Combine all the recipe cards together into a string
		const recipeViewHTML = recipeViewList.join("\n");

		// Insert into Recipe Container
		const recipeContainer = document.getElementById("recipeContainer");
		recipeContainer.innerHTML = recipeViewHTML;
	}

}
