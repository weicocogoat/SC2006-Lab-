$(document).ready(function() {
    // Get User Details
    getUserDetails();

    // Get Daily Summary
    getDailySummary();

    // Load Today's Meals (to show on food diary)
    getMeals(new Date().convertToLocal());

    // Load User Recipes
    loadRecipes();

    // Load Bookmarks
    loadBookmarks();

    // Set default date value for custom meal modal
    $('#mealDate').val(new Date().convertToLocal().toDateInputValue());
});

// Load User Recipes
function loadRecipes() {
    let listOfRecipes = [];

    let userId = localStorage.getItem('id');
    const recipeContainer = document.getElementById("myRecipesContainer");

    fetch("http://localhost:8080/api/recipes/user/" + userId)
        .then((resp) => resp.json())
        .then(function(response) {

            let recipes = response;

            if(recipes.length > 0) {
                recipes.forEach(function (item, index) {
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
                recipeContainer.innerHTML = recipeViewHTML;

            } else {
                recipeContainer.innerHTML = recipeContainer.innerHTML = "<h6 class='text-muted text-center'>No Recipes Found</h6>";
            }

        }).catch(function(error) {
            toastr.error("An error occurred, please try again!", "Failed to Load Recipes.");
            console.log(error);
        });
}

// Load User Details
function getUserDetails() {
    let userId = localStorage.getItem('id');
    let accessToken = localStorage.getItem('accessToken');

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

            // Load User Details on View
            $('#username').text(data.username);
            $('#height').text(data.height + "cm");
            $('#weight').text(data.weight + "kg");
            $('#bmi').text(parseFloat(data.bmi).toFixed(2));
            $('#dateJoined').text(new Date(data.dateJoined).convertToLocal().toDateInputValue());

            // Load current user values on Edit Profile Modal
            $('#editUsername').val(data.username);
            $('#editHeight').val(data.height);
            $('#editWeight').val(data.weight);
         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to Retrieve User Details.");
            console.error('Error:', error);
        });
}

// Calculate Daily Calories Summary 
function getDailySummary() {
    let userId = localStorage.getItem('id');

    let totalDailyCalories = 0;
    let bfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, dessertCalories = 0;

    if(userId != null) {
        const mealDTO = {
            "userId": userId,
            "mealDate": new Date().convertToLocal().toISOString()
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
            toastr.error("An error occurred, please try again!", "Failed to Retrieve Summary.");
            console.log(error);
        });
    } 
}

const myRecipeView = (recipe) => 
`
	<div class="col-sm-12 col-lg-4 mb-3">
		<div class="card h-100">
	        <img src="${recipe.image}" class="card-img-top">
	        <div class="card-body">
	            <div id="firstLine">
	                <h5 id="card-title"><a class="text-dark" href="/recipes/${recipe.id}">${recipe.title}</a> <span class="small text-muted fw-bold ml-2">${recipe.numOfBookmarks} <i class="fa-solid fa-star"></i></span></h5>
                    <h6>

	                <a href="#" id="recipeDropdown${recipe.id}" class="text-dark" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis-vertical"></i></a>

                    <ul class="dropdown-menu" aria-labelledby="recipeDropdown${recipe.id}">
                        <li>
                            <a class="dropdown-item" href="/recipes/edit/${recipe.id}">
                                <i class="fa-solid fa-pen-to-square mr-2"></i> Edit Recipe
                            </a>
                        </li>

                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteRecipeModal" data-recipe-id="${recipe.id}" onclick="updateDeleteModal(this)">
                                <i class="fa-solid fa-trash mr-2"></i> Delete Recipe
                            </a>
                        </li>
                    </ul>
	            </div>
	            <p class="card-text">${recipe.description}</p>
	        </div>
	    </div>
	</div>
`;

const bookmarkView = (recipe) => 
`
    <div class="col-sm-12 col-lg-4 mb-3">
        <div class="card h-100">
            <img src="${recipe.image}" class="card-img-top">
            <div class="card-body">
                <div id="firstLine">
                    <h5 id="card-title"><a class="text-dark" href="/recipes/${recipe.id}">${recipe.title}</a> <span class="small text-muted fw-bold ml-2">${recipe.numOfBookmarks} <i class="fa-solid fa-star"></i></span></h5>
                    <h6>
                </div>
                <p class="card-text">${recipe.description}</p>
            </div>
        </div>
    </div>
`;

function updateDeleteModal(event) {
    // Fetch data-recipe-id attribute value from selected recipe to delete (on card)
    const recipeToDelete = $(event).data('recipe-id')
    $('#deleteRecipeBtn').attr('data-recipe-id', recipeToDelete);
}

// Delete Existing Recipe
function deleteRecipe() {
    // Fetch data-recipe-id attribute value from deleteRecipeBtn (on modal)
    const recipeToDelete = $('#deleteRecipeBtn').data('recipe-id');

    fetch('http://localhost:8080/api/recipes/delete/' + recipeToDelete, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => {
        console.log(response);
    })
    .then(data => {
        console.log("Successfully deleted recipe");

        // Reload list of recipes
        loadRecipes();

        // Hide Modal
        let deleteModal = bootstrap.Modal.getInstance(document.querySelector("#deleteRecipeModal"));
        deleteModal.hide();

        toastr.success("Recipe successfully deleted!", "Recipe Deleted");
    })
    .catch((error) => {
        toastr.error("An error occurred, please try again!", "Failed to Delete Recipe.");
        console.log(error);
    });
}

// Get User Meals
function getMeals(date) {
    let userId = localStorage.getItem('id');

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
            bfastMeals.innerHTML = addNewMealDropdown("Breakfast");
            lunchMeals.innerHTML = addNewMealDropdown("Lunch");
            dinnerMeals.innerHTML = addNewMealDropdown("Dinner");
            dessertMeals.innerHTML = addNewMealDropdown("Dessert");

            let bfastItems = "";
            let lunchItems = "";
            let dinnerItems = "";
            let dessertItems = "";

            // Add Items Respectively
            for(var i = 0; i < data.length; i++) {
                /*
                if(data[i].mealType == "Breakfast")
                    bfastItems += `<li>${data[i].name} (${data[i].calories}kcal) <button type="button" class="nav-link text-dark" onclick="removeMeal()"><i class="fa-solid fa-xmark ml-2"></i></button></li>`;
                else if(data[i].mealType == "Lunch")
                    lunchItems += `<li>${data[i].name} (${data[i].calories}kcal) <button type="button" class="nav-link text-dark" onclick="removeMeal()"><i class="fa-solid fa-xmark ml-2"></i></button></li>`;
                else if(data[i].mealType == "Dinner")
                    dinnerItems += `<li>${data[i].name} (${data[i].calories}kcal) <button type="button" class="nav-link text-dark" onclick="removeMeal()"><i class="fa-solid fa-xmark ml-2"></i></button></li>`;
                else if(data[i].mealType == "Dessert")
                    dessertItems += `<li>${data[i].name} (${data[i].calories}kcal) <button type="button" class="nav-link text-dark" onclick="removeMeal()"><i class="fa-solid fa-xmark ml-2"></i></button></li>`;
                */

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
         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to Retrieve Meals.");
            console.error('Error:', error);
        });
}

const addNewMealDropdown = (mealType) =>
`
    <span class="dropdown">
        <button class="dropdown-toggle text-muted" type="button" id="addMealButton1"
            data-bs-toggle="dropdown" aria-expanded="false" onclick="setSelectedMeal('${mealType}')">
            <i class="fa-solid fa-plus"></i> Add New Meal
        </button>
        <ul class="dropdown-menu" aria-labelledby="addMealButton1">
            <li><a class="dropdown-item" href="/recipes">Browse Recipes</a></li>
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#customMealModal">Create Custom Meal</a></li>
        </ul>
    </span>
`;

// Sets hidden input value for selected meal type (to auto select for custom meal modal)
function setSelectedMeal(mealType) {
    $('#mealType').val(mealType);
}

// Update User Details
function saveProfile() {
    let username = $('#editUsername').val();
    let height = $('#editHeight').val();
    let weight = $('#editWeight').val();

    if(!username || !height || !weight) {
        toastr.error("Please ensure that all fields are filled in.");

        return false;
    }

    let userId = localStorage.getItem('id');

    const newUserDetails = {
        "username": $('#editUsername').val(),
        'height': $('#editHeight').val(),
        "weight": $('#editWeight').val()
    };

    fetch('http://localhost:8080/api/users/save/' + userId, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUserDetails)
        })
        .then(response => {

            return response;
         })
        .then(data => {
            console.log(data);

            // Update User Details on View
            getUserDetails();

            // Success Toast Message
            toastr.success("Account details successfuly updated!", "Account Details Saved");

            // Hide Modal
            let editProfileModal = bootstrap.Modal.getInstance(document.querySelector("#editProfileModal"));
            editProfileModal.hide();
         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to Save Details");
            console.error('Error:', error);
        });
}

// Get User Bookmarks
function loadBookmarks() {
    let userId = localStorage.getItem('id');
    const bookmarkCont = document.getElementById('bookmarksContainer');

    if(userId) {
        fetch('http://localhost:8080/api/users/' + userId + "/bookmarks", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {

            return response.json();
         })
        .then(data => {
            let bookmarks = data;

            if(bookmarks.length > 0) {
                for(var i = 0; i < bookmarks.length; i++) {
                    let recipeId = bookmarks[i];

                    // Fetch details of each recipe bookmark
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

                        console.log(recipe);

                        // Load Recipe Details on View
                        let bookmarkCardView = bookmarkView(recipe);
                        bookmarkCont.innerHTML += bookmarkCardView;

                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            } else {
                bookmarkCont.innerHTML = "<h6 class='text-muted text-center'>No Bookmarks Found</h6>"
            }
         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to fetch bookmarks");
            console.error('Error:', error);
        });
    }
    
}