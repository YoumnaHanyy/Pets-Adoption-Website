
document.addEventListener("DOMContentLoaded", function () {
    // Get all nav links
    const navLinks = document.querySelectorAll("nav ul li a");

    // Function to remove "active" class from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    // Add event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            removeActiveClass(); // Remove "active" from all links
            this.classList.add("active"); // Add "active" to clicked link
        });
    });
});
