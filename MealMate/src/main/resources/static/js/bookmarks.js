// Add to Bookmarks
function addBookmark() {
    let userId = localStorage.getItem('id');
    let recipeId = window.location.pathname.split('/')[2];    // Get recipe id from location path

    if(userId) {
        fetch('http://localhost:8080/api/users/' + userId + "/bookmarks/add/" + recipeId, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {

            //return response.json();
            return response;
         })
        .then(data => {
            toastr.success("Recipe successfully bookmarked!", "Recipe Bookmarked");
            console.log(data);

            containsBookmark();

         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to add bookmark");
            console.error('Error:', error);
        });
    }
}

// Remove Bookmark
function removeBookmark() {
    let userId = localStorage.getItem('id');
    let recipeId = window.location.pathname.split('/')[2];    // Get recipe id from location path

    if(userId) {
        fetch('http://localhost:8080/api/users/' + userId + "/bookmarks/remove/" + recipeId, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {

            //return response.json();
            return response;
         })
        .then(data => {
            toastr.success("Bookmark successfully removed!", "Bookmark Removed");
            console.log(data);

            containsBookmark();

         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to remove bookmark");
            console.error('Error:', error);
        });
    }
}

// Get User Bookmarks
function containsBookmark() {
	let userId = localStorage.getItem('id');
	let recipeId = window.location.pathname.split('/')[2];	// Get recipe id from location path

    //let hasBookmark = false;

	if(userId) {
		fetch('http://localhost:8080/api/users/' + userId + "/bookmarks/" + recipeId, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {

            //return response.json();
            return response.text();
         })
        .then(data => {
            console.log(data);

            // Check if user bookmarked this before
            if(data == "true") {
                // Hide Add to Bookmarks Btn
                $('#addToBookmarksBtn').addClass('d-none');

                // Show Remove from Bookmarks Btn
                $('#removeFromBookmarksBtn').removeClass('d-none');
            } else {
                // Show Add to Bookmarks Btn
                $('#addToBookmarksBtn').removeClass('d-none');

                // Hide Remove from Bookmarks Btn
                $('#removeFromBookmarksBtn').addClass('d-none');
            }

         })
        .catch((error) => {
            toastr.error("An error occurred, please try again!", "Failed to fetch bookmarks");
            console.error('Error:', error);
        });
	}
}