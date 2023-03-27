var openProfile = false;

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector("#home").onclick = function() {
        //temp code. will be replaced later
        console.log("Home button pressed.");
    }

    document.querySelector("#recipe").onclick = function() {
        //temp code. will be replaced later
        console.log("Recipe button pressed.");
    }

    document.querySelector("#storeFinder").onclick = function() {
        //temp code. will be replaced later
        console.log("Store Finder button pressed.");
    }

    document.querySelector("#aboutUs").onclick = function() {
        //temp code. will be replaced later
        console.log("About us button pressed.");
    }

    document.querySelector("#user").onclick = function() {
        //temp code. will be replaced later
        console.log("User button pressed.");

        if (openProfile){
            openProfile = false;
            document.querySelectorAll(`.userStuff`).forEach(button =>{
                    button.style.display = "none";
            })
        }
        else{
            openProfile = true;
            document.querySelectorAll(`.userStuff`).forEach(button =>{
                    button.style.display = "block";
            })
        }
        
    }

    document.querySelector("#profile").onclick = function(){
        //temp code. will be replaced later
        console.log("Profile button pressed.");
    }

    document.querySelector("#signOut").onclick = function(){
        //temp code. will be replaced later
        console.log("Sign out button pressed.");
    }

});
