$(document).ready(function() {
    let listOfRecipes = [];

    // Get User Details
    getUserDetails();

    // Get Daily Summary
    getDailySummary();

    // Load Today's Meals
    getMeals(new Date());

    // Load Trending Recipes
    fetch("http://localhost:8080/api/recipes/all")
        .then((resp) => resp.json())
        .then(function(response) {

            console.log(response);

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
               listOfRecipes.push(recipeObj);
              });

              // Display Recipes
              const recipeViewList = [];

                for(var i=0; i < listOfRecipes.length; i++) {
                    const recipe = listOfRecipes[i];
                    const itemViewHTML = myRecipeView(recipe);

                    recipeViewList.push(itemViewHTML);
                }

                // Combine all the recipe cards together into a string
                const recipeViewHTML = recipeViewList.join("\n");

                // Insert into Recipe Container
                const recipeContainer = document.getElementById("myRecipesContainer");
                recipeContainer.innerHTML = recipeViewHTML;

              console.log(listOfRecipes);

        }).catch(function(error) {
            console.log(error);
        });
});

// Load User Details
function getUserDetails() {
    let userId = sessionStorage.getItem('id');
    let accessToken = sessionStorage.getItem('accessToken');

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
            //console.log(data);

            // Load User Details on View
            $('#username').text(data.username);
            $('#height').text(data.height + "cm");
            $('#weight').text(data.weight + "kg");
            $('#bmi').text(data.bmi);

         })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Calculate Daily Calories Summary 
function getDailySummary() {
    let userId = sessionStorage.getItem('id');

    let totalDailyCalories = 0;
    let bfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, dessertCalories = 0;

    if(userId != null) {
        const mealDTO = {
            "userId": userId,
            "mealDate": new Date().toISOString()
        }

        fetch('http://localhost:8080/api/meal/find/mealDate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mealDTO)
        })
        .then((resp) => resp.json())
        .then(function(data) {

            // Get Daily Summary
            for(var i = 0; i < data.length; i++) {
                totalDailyCalories += data[i].calories;

                if(data[i].mealType == "Breakfast")
                    bfastCalories += data[i].calories;
                else if(data[i].mealType == "Lunch")
                    lunchCalories += data[i].calories;
                else if(data[i].mealType == "Dinner")
                    dinnerCalories += data[i].calories;
                else if(data[i].mealType == "Dessert")
                    dessertCalories += data[i].calories;
            }

            $('#caloriesSummary').text(totalDailyCalories);
            $('#bfastCalories').text(bfastCalories + " kcal");
            $('#lunchCalories').text(lunchCalories + " kcal");
            $('#dinnerCalories').text(dinnerCalories + " kcal");
            $('#dessertCalories').text(dessertCalories + " kcal");

        }).catch(function(error) {
            console.log(error);
        });
    } 
}

const myRecipeView = (recipe) => 
`
	<div class="col-sm-12 col-lg-4 mb-3">
		<div class="card">
	        <img src="${recipe.image}" class="card-img-top">
	        <div class="card-body">
	            <div id="firstLine">
	                <h5 id="card-title">${recipe.title}</h5>
	                <h6 id="star-rating"> ${recipe.numOfBookmarks} <i class="fa-solid fa-star"></i></h6>
	            </div>
	            <p class="card-text">${recipe.description}</p>

	            <a class="stretched-link" href="recipes/${recipe.id}"></a>
	        </div>
	    </div>
	</div>
`;

// Create Custom Meal
function addCustomMeal() {
    // New Meal Object
    const newMeal = {
        "userId": sessionStorage.getItem("id"),
        "name": $('#mealName').val(),
        "calories": $('#calories').val(),
        "mealType": $('#mealType').find(':selected').val(),
        "mealDate": new Date().toISOString()
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
            // Some success message here

            // Hide Modal
            let customMealModal = bootstrap.Modal.getInstance(document.querySelector("#customMealModal"));
            customMealModal.hide();

            // Update Summary
            getDailySummary();

            // Update Meals
            getMeals(new Date());

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getMeals(date) {
    let userId = sessionStorage.getItem('id');

    const mealDTO = {
        "userId": userId,
        "mealDate": date.toISOString()
    }

    fetch('http://localhost:8080/api/meal/find/mealDate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mealDTO)
        })
        .then(response => {
            //console.log('Success:', response);
            
            return response.json();
         })
        .then(data => {

            const bfastMeals = document.getElementById("bfastMeals");
            const lunchMeals = document.getElementById("lunchMeals");
            const dinnerMeals = document.getElementById("dinnerMeals");
            const dessertMeals = document.getElementById("dessertMeals");

            // Clear Items first
            bfastMeals.innerHTML = addNewMealDropdown;
            lunchMeals.innerHTML = addNewMealDropdown;
            dinnerMeals.innerHTML = addNewMealDropdown;
            dessertMeals.innerHTML = addNewMealDropdown;

            let bfastItems = "";
            let lunchItems = "";
            let dinnerItems = "";
            let dessertItems = "";

            // Add Items Respectively
            for(var i = 0; i < data.length; i++) {
                if(data[i].mealType == "Breakfast")
                    bfastItems += `<li>${data[i].name} (${data[i].calories}kcal)</li>`;
                else if(data[i].mealType == "Lunch")
                    lunchItems += `<li>${data[i].name} (${data[i].calories}kcal)</li>`;
                else if(data[i].mealType == "Dinner")
                    dinnerItems += `<li>${data[i].name} (${data[i].calories}kcal)</li>`;
                else if(data[i].mealType == "Dessert")
                    dessertItems += `<li>${data[i].name} (${data[i].calories}kcal)</li>`;
            }            
            
            if(bfastItems != "")
                bfastMeals.innerHTML = bfastItems;
            if(lunchItems != "")
                lunchMeals.innerHTML = lunchItems;
            if(dinnerItems != "")
                dinnerMeals.innerHTML = dinnerItems;
            if(dessertItems != "")
                dessertMeals.innerHTML = dessertItems;

            console.log(data);
         })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const addNewMealDropdown =
`
    <span class="dropdown">
        <button class="dropdown-toggle text-muted" type="button" id="addMealButton1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-plus"></i> Add New Meal
        </button>
        <ul class="dropdown-menu" aria-labelledby="addMealButton1">
            <li><a class="dropdown-item" href="/recipes">Browse Recipes</a></li>
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#customMealModal">Create Custom Meal</a></li>
        </ul>
    </span>
`;