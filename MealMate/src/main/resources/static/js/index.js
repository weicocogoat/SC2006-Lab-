$(document).ready(function() {
    // Set default date value for custom meal modal
    $('#mealDate').val(new Date().convertToLocal().toDateInputValue());

    let userId = localStorage.getItem("id");

    if(userId) {
        let accessToken = localStorage.getItem("accessToken");
        console.log("Access token: " + accessToken);

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
                // Toggle Daily Summary Details to show
                $('#summary').toggleClass("d-none");

                // Get Daily Summary
                getDailySummary();
             })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        $('#summary').addClass("d-none");
    }

    let listOfRecipes = [];

    // Load Trending Recipes
    fetch("http://localhost:8080/api/recipes/all/sort/bookmarks")
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
               listOfRecipes.push(recipeObj);
              });

              // Display Recipes
              const recipeViewList = [];

                for(var i=0; i < listOfRecipes.length; i++) {
                    if(i < 6) {
                        // Show Top 6 only
                        const recipe = listOfRecipes[i];
                        const itemViewHTML = recipeView(recipe);

                        recipeViewList.push(itemViewHTML);
                    } else {
                        break;
                    }
                }

                // Combine all the recipe cards together into a string
                const recipeViewHTML = recipeViewList.join("\n");

                // Insert into Recipe Container
                const recipeContainer = document.getElementById("recipeContainer");
                recipeContainer.innerHTML = recipeViewHTML;

        }).catch(function(error) {
            console.log(error);
        });
});

// Calculate Daily Calories Summary 
function getDailySummary() {
    let userId = localStorage.getItem('id');
    // test
    let totalDailyCalories = 0;
    let bfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, dessertCalories = 0;

    console.log(new Date().toISOString());
    console.log(new Date().convertToLocal().toISOString());

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
                console.log(error);
            });
    } 
}

// Recipe Card View
const recipeView = (recipe) => 
`
    <div class="col-sm-12 col-lg-4 mb-3" data-aos="fade-up">
        <div class="card h-100">
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