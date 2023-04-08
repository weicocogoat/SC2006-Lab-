document.addEventListener('DOMContentLoaded', function () {

    // Get the "Create Custom Meal" link and the modal
    var customMealLink = document.getElementById("custom-meal");
    var customMealModal = document.getElementById("customMealModal");

    // When the link is clicked, show the modal
    customMealLink.addEventListener("click", function (event) {
        event.preventDefault();
        customMealModal.style.display = "block";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
        if (event.target == customMealModal) {
            customMealModal.style.display = "none";
        }
    })
});
