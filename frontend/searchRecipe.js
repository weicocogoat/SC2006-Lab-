document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("val");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    }

    getRecipes();
});

// Get All Recipes from DB
function getRecipes() {
	console.log("Retrieving receipes from database...");

	fetch("http://localhost:8080/recipes/all")
		.then((resp) => resp.json())
		.then(function(response) {

			console.log(response);

			response.forEach(function (item, index) {
                const recipeObj = {
                    author: item.author,
                    calories: item.calories,
                    dateCreated: item.dateCreated,
                    descrtipion: item.description,
                    ingredients: item.ingredients,
                    numOfBookmarks: item.numofBookmarks,
                    portions: item.portions,
                    preparationTime: item.preparationTime,
                    steps: item.steps,
                    title: title
               };

               console.log(recipeObj);
          });

		}).catch(function(error) {
			console.log("Error retrieving from database");
			console.log(error);
		});
}