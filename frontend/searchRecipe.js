document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("val");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    }
});