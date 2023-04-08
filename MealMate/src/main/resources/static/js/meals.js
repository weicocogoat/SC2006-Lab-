// Create Custom Meal
function addCustomMeal() {
    // Get elements
    const mealName = $('#mealName').val();
    const calories = $('#calories').val();
    const mealType = $('#mealType').find(':selected').val();
    const mealDate = $('#mealDate').val();

    // Check for valid inputs
    if(mealName.trim().length == 0)
        toastr.error("Please enter a meal name.");
    else if(calories < 0)
        toastr.error("Please enter a valid calories value.");
    else {
        // New Meal Object
        const newMeal = {
            "userId": localStorage.getItem("id"),
            "name": mealName,
            "calories": calories,
            "mealType": mealType,
            "mealDate": mealDate
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

                // Update Meals (only on profile page)
                if(window.location.pathname == "/profile") {
                    getMeals(new Date($('#selectedDate').val()));
                }

            })
            .catch((error) => {
                toastr.error("An error occurred, please try again!", "Failed to Add Custom Meal.");
                console.error('Error:', error);
            });
    }
}