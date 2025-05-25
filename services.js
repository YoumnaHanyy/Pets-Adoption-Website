document.addEventListener("DOMContentLoaded", () => {
    const pawCount = 20; // Number of paws
    const servicesHeader = document.querySelector(".services-header");

    if (!servicesHeader) {
        console.error("❌ services-header section not found!");
        return;
    }

    const pawSize = 50; // Match your CSS
    const headerWidth = servicesHeader.clientWidth;
    const headerHeight = servicesHeader.clientHeight;

    const columns = Math.ceil(Math.sqrt(pawCount));
    const rows = Math.ceil(pawCount / columns);

    const cellWidth = headerWidth / columns;
    const cellHeight = headerHeight / rows;

    const seed = 12345; // Fixed seed for repeatable randomness
    let randomState = seed;

    function seededRandom() {
        randomState = (randomState * 9301 + 49297) % 233280;
        return randomState / 233280;
    }

    let usedCells = new Set();

    for (let i = 0; i < pawCount; i++) {
        let col, row, cellKey;

        do {
            col = Math.floor(seededRandom() * columns);
            row = Math.floor(seededRandom() * rows);
            cellKey = `${col}-${row}`;
        } while (usedCells.has(cellKey) && usedCells.size < columns * rows);

        usedCells.add(cellKey);

        const paw = document.createElement("div");
        paw.classList.add("paw");

        // Jitter within the cell
        const jitterX = seededRandom() * (cellWidth - pawSize);
        const jitterY = seededRandom() * (cellHeight - pawSize);
        const randomRotation = seededRandom() * 360;

        paw.style.left = `${col * cellWidth + jitterX}px`;
        paw.style.top = `${row * cellHeight + jitterY}px`;
        paw.style.transform = `rotate(${randomRotation}deg)`;

        servicesHeader.appendChild(paw);
    }

    console.log("✅ Paws scattered consistently!");
});
// Add this to your existing services.js file
document.addEventListener("DOMContentLoaded", () => {
    // Animate paw images on scroll
    const pawImages = document.querySelectorAll('.paw-image');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animatePawsOnScroll() {
        pawImages.forEach(paw => {
            if (isElementInViewport(paw) && !paw.classList.contains('animated')) {
                paw.classList.add('animated');
                paw.style.animation = 'bounce 1.5s ease';
                
                // Reset animation after it completes
                setTimeout(() => {
                    paw.style.animation = '';
                }, 1500);
            }
        });
    }
    
    // Add hover effect to paw images
    pawImages.forEach(paw => {
        paw.addEventListener('mouseenter', () => {
            paw.style.animation = 'bounce 0.8s infinite ease-in-out';
        });
        
        paw.addEventListener('mouseleave', () => {
            paw.style.animation = '';
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animatePawsOnScroll);
    
    // Initial check on page load
    animatePawsOnScroll();
});
// Add this to your services.js file
document.addEventListener("DOMContentLoaded", function() {
    // Modal functionality
    const modal = document.getElementById("visitModal");
    const visitButton = document.querySelector(".visit-button");
    const closeModal = document.querySelector(".close-modal");
    const visitForm = document.getElementById("visitForm");
    const formMessage = document.getElementById("formMessage");
    
    // Set minimum date to today
    const visitDateInput = document.getElementById("visitDate");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    visitDateInput.min = todayFormatted;
    
    // Open modal when "Schedule a Visit" button is clicked
    visitButton.addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener("click", function() {
        closeModalFunction();
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal when Escape key is pressed
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            closeModalFunction();
        }
    });
    
    // Function to close modal
    function closeModalFunction() {
        modal.classList.remove("show");
        setTimeout(() => {
            document.body.style.overflow = ""; // Re-enable scrolling
        }, 300); // Wait for animation to complete
    }
    
    // Form submission
    visitForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Basic form validation
        const fullName = document.getElementById("fullName").value.trim();
        const age = document.getElementById("age").value;
        const visitDate = document.getElementById("visitDate").value;
        const visitTime = document.getElementById("visitTime").value;
        const petTypeSelected = document.querySelector('input[name="petType"]:checked');
        
        if (!fullName || !age || !visitDate || !visitTime || !petTypeSelected) {
            formMessage.textContent = "Please fill in all required fields.";
            formMessage.className = "form-message error";
            return;
        }
        
        // Age validation
        if (age < 18) {
            formMessage.textContent = "You must be at least 18 years old to schedule a visit.";
            formMessage.className = "form-message error";
            return;
        }
        
        // Display success message
        formMessage.textContent = "Your visit has been scheduled successfully!";
        formMessage.className = "form-message success";
        
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
            visitForm.reset();
            formMessage.textContent = "";
            formMessage.className = "form-message";
            closeModalFunction();
        }, 3000);
        
        // Here you would typically send the data to your server
        const formData = {
            fullName: fullName,
            age: age,
            visitDate: visitDate,
            visitTime: visitTime,
            hasExperience: document.getElementById("hasExperience").checked,
            petType: petTypeSelected.value
        };
        
        console.log("Form Data:", formData);
       
    });
});
// Grooming Modal Functionality
document.addEventListener("DOMContentLoaded", function() {
    const groomingModal = document.getElementById("groomingModal");
    const groomingButtons = document.querySelectorAll(".try-free-button, .category-name"); // Both the button and category name can trigger
    const closeGroomingModal = document.querySelector(".close-grooming-modal");
    const groomingForm = document.getElementById("groomingForm");
    const groomingFormMessage = document.getElementById("groomingFormMessage");
    
    // Set minimum date to today for grooming
    const groomingDateInput = document.getElementById("groomingDate");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    groomingDateInput.min = todayFormatted;
    
    // Open modal when grooming button is clicked
    groomingButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            groomingModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });
    
    // Close modal when X is clicked
    closeGroomingModal.addEventListener("click", function() {
        closeGroomingModalFunction();
    });
    
    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === groomingModal) {
            closeGroomingModalFunction();
        }
    });
    
    // Close with Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && groomingModal.classList.contains("show")) {
            closeGroomingModalFunction();
        }
    });
    
    function closeGroomingModalFunction() {
        groomingModal.classList.remove("show");
        setTimeout(() => {
            document.body.style.overflow = "";
        }, 300);
    }
    
    // Form submission
    groomingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Form validation
        const petName = document.getElementById("petName").value.trim();
        const petType = document.getElementById("petType").value;
        const groomingDate = document.getElementById("groomingDate").value;
        const groomingTime = document.getElementById("groomingTime").value;
        const groomingService = document.getElementById("groomingService").value;
        
        if (!petName || !petType || !groomingDate || !groomingTime || !groomingService) {
            groomingFormMessage.textContent = "Please fill in all required fields.";
            groomingFormMessage.className = "form-message error";
            return;
        }
        
        // Display success message
        groomingFormMessage.textContent = `Grooming appointment booked for ${petName} on ${groomingDate} at ${groomingTime}!`;
        groomingFormMessage.className = "form-message success";
        
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
            groomingForm.reset();
            groomingFormMessage.textContent = "";
            groomingFormMessage.className = "form-message";
            closeGroomingModalFunction();
        }, 3000);
        
        // Data to send to server
        const formData = {
            petName: petName,
            petType: petType,
            groomingDate: groomingDate,
            groomingTime: groomingTime,
            groomingService: groomingService,
            specialInstructions: document.getElementById("specialInstructions").value,
            hasSpecialNeeds: document.getElementById("hasSpecialNeeds").checked
        };
        
        console.log("Grooming Form Data:", formData);
    });
});