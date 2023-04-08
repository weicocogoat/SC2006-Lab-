document.addEventListener('DOMContentLoaded', function () {

    // Get the "Edit Profile" button and the modal
    var editProfileButton = document.getElementById("editProfile");
    var editProfileModal = document.getElementById("editProfileModal");

    // When the button is clicked, show the modal
    editProfileButton.addEventListener("click", function (event) {
        event.preventDefault();
        editProfileModal.style.display = "block";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = "none";
        }
    })
});
