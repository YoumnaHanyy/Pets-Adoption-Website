document.addEventListener("DOMContentLoaded", function () {
    const infoBoxes = document.querySelectorAll(".info-box");

    const observer = new IntersectionObserver(entries => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, delay);
                delay += 400; // Delay each card by 400ms
            } else {
                entry.target.classList.remove("show"); // Remove to re-trigger animation
            }
        });
    }, { threshold: 0.3 });

    infoBoxes.forEach(box => observer.observe(box));
});
document.addEventListener("DOMContentLoaded", function () {
    const shelterSection = document.querySelector(".shelter-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                shelterSection.classList.add("show");
            } else {
                shelterSection.classList.remove("show");
            }
        });
    }, { threshold: 0.1 });

    observer.observe(shelterSection);
});





    
    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById("carousel");
        const scrollAmount = 230; // Adjusted for spacing
        let isScrolling = false;

        // Duplicate first and last cards to create infinite loop effect
        let cards = Array.from(carousel.children);
        let firstClone = cards.slice(0, 2).map(card => card.cloneNode(true));
        let lastClone = cards.slice(-2).map(card => card.cloneNode(true));

        // Append clones to both ends
        firstClone.forEach(clone => carousel.appendChild(clone));
        lastClone.reverse().forEach(clone => carousel.insertBefore(clone, carousel.firstChild));

        // Set the initial scroll position
        carousel.scrollLeft = scrollAmount * 2;

        function scrollCarousel(direction) {
            if (isScrolling) return; // Prevent spam clicks
            isScrolling = true;

            let newPosition = carousel.scrollLeft + direction * scrollAmount;
            carousel.scrollTo({ left: newPosition, behavior: "smooth" });

            setTimeout(() => {
                isScrolling = false;

                if (carousel.scrollLeft <= scrollAmount) {
                    // If at fake start, jump to real end
                    carousel.scrollLeft = scrollAmount * (cards.length);
                } else if (carousel.scrollLeft >= scrollAmount * (cards.length + 1)) {
                    // If at fake end, jump to real start
                    carousel.scrollLeft = scrollAmount * 2;
                }
            }, 400); // Matches scroll animation time
        }

        // Auto-scroll every 2 seconds
        setInterval(() => {
            scrollCarousel(1);
        }, 2000);
    });



    // Pet details data (you can expand this with more pets and details)
const petDetails = {
    "Luna": {
        name: "Luna",
        breed: "Persian Cat",
        age: "1 year old",
        gender: "Female",
        location: "Cat City",
        description: "Luna is a playful and affectionate Persian cat with beautiful blue eyes. She loves cuddles and playing with toys. She's great with children and other pets.",
        personality: ["Playful", "Affectionate", "Curious"],
        needs: ["Regular grooming", "Indoor home", "Lots of love"],
        image: "/ProjectManagement/pets/cat-home.jpg"
    },
    "Fluffy": {
        name: "Fluffy",
        breed: "Holland Lop",
        age: "6 months old",
        gender: "Male",
        location: "Bunny Haven",
        description: "Fluffy is an adorable Holland Lop with floppy ears and a sweet personality. He's litter trained and enjoys hopping around and exploring new environments.",
        personality: ["Gentle", "Curious", "Friendly"],
        needs: ["Hay daily", "Room to hop", "Chew toys"],
        image: "/ProjectManagement/pets/cat-home2.webp"
    },
    "Rio": {
        name: "Rio",
        breed: "Macaw Parrot",
        age: "3 years old",
        gender: "Male",
        location: "Bird Sanctuary",
        description: "Rio is a vibrant and intelligent Macaw with beautiful plumage. He knows a few words and loves to interact with people. He's very social and needs daily attention.",
        personality: ["Intelligent", "Social", "Vocal"],
        needs: ["Large cage", "Daily interaction", "Mental stimulation"],
        image: "/ProjectManagement/pets/cat-home3.jpg"
    }
};

// Create modal HTML structure and add it to the document
function createModal() {
    const modalHTML = `
        <div id="pet-modal" class="pet-modal">
            <div class="pet-modal-content">
                <span class="close-modal">&times;</span>
                <div id="pet-details-view">
                    <div class="pet-modal-header">
                        <img id="modal-pet-image" src="" alt="Pet Image">
                        <div class="pet-modal-title">
                            <h2 id="modal-pet-name"></h2>
                            <p id="modal-pet-breed"></p>
                        </div>
                    </div>
                    <div class="pet-modal-body">
                        <div class="pet-modal-info">
                            <div class="info-item">
                                <span class="info-icon">🐾</span>
                                <span id="modal-pet-age"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-icon">⚤</span>
                                <span id="modal-pet-gender"></span>
                            </div>
                            <div class="info-item">
                                <span class="info-icon">📍</span>
                                <span id="modal-pet-location"></span>
                            </div>
                        </div>
                        
                        <div class="pet-modal-description">
                            <h3>About Me</h3>
                            <p id="modal-pet-description"></p>
                        </div>
                        
                        <div class="pet-modal-traits">
                            <div class="trait-section">
                                <h3>My Personality</h3>
                                <ul id="modal-pet-personality" class="trait-list"></ul>
                            </div>
                            <div class="trait-section">
                                <h3>My Needs</h3>
                                <ul id="modal-pet-needs" class="trait-list"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="pet-modal-footer">
                        <button id="adopt-submit-btn" class="adopt-submit-btn">Continue Adoption</button>
                        <button id="meet-pet-btn" class="meet-pet-btn">Schedule Meet & Greet</button>
                    </div>
                </div>
                
                <!-- Schedule Meet & Greet Form -->
                <div id="schedule-form-view" class="hidden">
                    <div class="schedule-form-header">
                        <h2>Schedule a Meet & Greet</h2>
                        <p>Please fill out this form to schedule time with <span id="schedule-pet-name"></span></p>
                    </div>
                    <div class="schedule-form-body">
                        <form id="meet-greet-form">
                            <div class="form-group">
                                <label for="visitor-name">Your Name</label>
                                <input type="text" id="visitor-name" name="visitor-name" required>
                            </div>
                            <div class="form-group">
                                <label for="visitor-email">Email Address</label>
                                <input type="email" id="visitor-email" name="visitor-email" required>
                            </div>
                            <div class="form-group">
                                <label for="visitor-phone">Phone Number</label>
                                <input type="tel" id="visitor-phone" name="visitor-phone" required>
                            </div>
                            <div class="form-group">
                                <label for="visit-date">Preferred Date</label>
                                <input type="date" id="visit-date" name="visit-date" required>
                            </div>
                            <div class="form-group">
                                <label for="visit-time">Preferred Time</label>
                                <select id="visit-time" name="visit-time" required>
                                    <option value="">Select a time</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="1:00 PM">1:00 PM</option>
                                    <option value="2:00 PM">2:00 PM</option>
                                    <option value="3:00 PM">3:00 PM</option>
                                    <option value="4:00 PM">4:00 PM</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="visit-message">Any questions or notes?</label>
                                <textarea id="visit-message" name="visit-message" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="schedule-form-footer">
                        <button id="schedule-submit-btn" class="schedule-submit-btn">Submit Request</button>
                        <button id="back-to-pet-btn" class="back-btn">Back to Pet Details</button>
                    </div>
                </div>
                
                <!-- Adoption Form View -->
                <div id="adoption-form-view" class="hidden">
                    <div class="adoption-form-header">
                        <h2>Complete Your Adoption</h2>
                        <p>Please provide the following information to begin adopting <span id="adopt-pet-name"></span></p>
                    </div>
                    <div class="adoption-form-body">
                        <form id="adoption-form">
                            <div class="form-group">
                                <label for="adopter-name">Your Full Name</label>
                                <input type="text" id="adopter-name" name="adopter-name" required>
                            </div>
                            <div class="form-group">
                                <label for="adopter-email">Email Address</label>
                                <input type="email" id="adopter-email" name="adopter-email" required>
                            </div>
                            <div class="form-group">
                                <label for="adopter-phone">Phone Number</label>
                                <input type="tel" id="adopter-phone" name="adopter-phone" required>
                            </div>
                            <div class="form-group">
                                <label for="adopter-address">Home Address</label>
                                <input type="text" id="adopter-address" name="adopter-address" required>
                            </div>
                            <div class="form-group">
                                <label for="home-type">Type of Home</label>
                                <select id="home-type" name="home-type" required>
                                    <option value="">Select home type</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Condo">Condo</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="other-pets">Do you have other pets?</label>
                                <select id="other-pets" name="other-pets" required>
                                    <option value="">Please select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="pet-experience">Previous Pet Experience</label>
                                <textarea id="pet-experience" name="pet-experience" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="adoption-form-footer">
                        <button id="adoption-submit-btn" class="schedule-submit-btn">Submit Application</button>
                        <button id="back-to-pet-btn-adoption" class="back-btn">Back to Pet Details</button>
                    </div>
                </div>
                
                <!-- Success Message View -->
                <div id="success-message-view" class="hidden">
                    <div class="success-message">
                        <div class="success-icon">✓</div>
                        <h2 id="success-title">Thank You!</h2>
                        <p id="success-message">Your request has been submitted successfully.</p>
                        <button id="close-success-btn" class="adopt-submit-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert modal HTML at the end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listener to close button
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('pet-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Add event listeners to all adopt buttons
function setupAdoptButtons() {
    const adoptButtons = document.querySelectorAll('.adoptt-btn');
    
    adoptButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get pet name from the card
            const petCard = this.closest('.card-content');
            const petName = petCard.querySelector('h3').textContent;
            
            openPetModal(petName);
        });
    });
}

// Open modal with pet details
function openPetModal(petName) {
    const pet = petDetails[petName] || findPetByNameFallback(petName);
    
    if (!pet) {
        console.error(`Pet details for ${petName} not found`);
        return;
    }
    
    // Fill in modal with pet details
    document.getElementById('modal-pet-image').src = pet.image;
    document.getElementById('modal-pet-name').textContent = pet.name;
    document.getElementById('modal-pet-breed').textContent = pet.breed;
    document.getElementById('modal-pet-age').textContent = pet.age;
    document.getElementById('modal-pet-gender').textContent = pet.gender;
    document.getElementById('modal-pet-location').textContent = pet.location;
    document.getElementById('modal-pet-description').textContent = pet.description;
    
    // Clear and fill personality traits
    const personalityList = document.getElementById('modal-pet-personality');
    personalityList.innerHTML = '';
    pet.personality.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        personalityList.appendChild(li);
    });
    
    // Clear and fill needs
    const needsList = document.getElementById('modal-pet-needs');
    needsList.innerHTML = '';
    pet.needs.forEach(need => {
        const li = document.createElement('li');
        li.textContent = need;
        needsList.appendChild(li);
    });
    
    // Show the modal
    document.getElementById('pet-modal').style.display = 'flex';
}

// Fallback function to find pets not in our main data
function findPetByNameFallback(petName) {
    // If not found in our data, create a generic entry based on the card info
    const petCard = document.querySelector(`.card-content h3:contains('${petName}')`);
    
    if (!petCard) return null;
    
    const cardContent = petCard.closest('.card-content');
    const petImage = cardContent.closest('.adoption-card').querySelector('img').src;
    const petInfo = cardContent.querySelector('.pet-info').textContent.split('/');
    const gender = petInfo[0].trim();
    const breed = petInfo[1].trim();
    const age = cardContent.querySelector('.age').textContent;
    const location = cardContent.querySelector('.location').textContent.replace('📍', '').trim();
    
    return {
        name: petName,
        breed: breed,
        age: age,
        gender: gender,
        location: location,
        description: `Meet ${petName}, a lovely ${breed} looking for a forever home!`,
        personality: ["Friendly", "Loving", "Well-behaved"],
        needs: ["Loving home", "Regular care", "Attention"],
        image: petImage
    };
}

// Close the modal
function closeModal() {
    document.getElementById('pet-modal').style.display = 'none';
}

// Show schedule form
function showScheduleForm(petName) {
    document.getElementById('pet-details-view').classList.add('hidden');
    document.getElementById('schedule-form-view').classList.remove('hidden');
    document.getElementById('schedule-pet-name').textContent = petName;
}

// Show adoption form
function showAdoptionForm(petName) {
    document.getElementById('pet-details-view').classList.add('hidden');
    document.getElementById('adoption-form-view').classList.remove('hidden');
    document.getElementById('adopt-pet-name').textContent = petName;
}

// Back to pet details
function backToPetDetails() {
    document.getElementById('schedule-form-view').classList.add('hidden');
    document.getElementById('adoption-form-view').classList.add('hidden');
    document.getElementById('success-message-view').classList.add('hidden');
    document.getElementById('pet-details-view').classList.remove('hidden');
}

// Show success message
function showSuccessMessage(type) {
    document.getElementById('schedule-form-view').classList.add('hidden');
    document.getElementById('adoption-form-view').classList.add('hidden');
    document.getElementById('pet-details-view').classList.add('hidden');
    document.getElementById('success-message-view').classList.remove('hidden');
    
    if (type === 'schedule') {
        document.getElementById('success-title').textContent = 'Meeting Scheduled!';
        document.getElementById('success-message').textContent = 'We\'ve received your request to meet this pet. A staff member will contact you shortly to confirm your appointment.';
    } else {
        document.getElementById('success-title').textContent = 'Application Submitted!';
        document.getElementById('success-message').textContent = 'Thank you for your adoption application! Our team will review your information and contact you within 1-2 business days.';
    }
}

// Set up event listeners for the modal
function setupModalEvents() {
    // Meet & Greet button
    document.getElementById('meet-pet-btn').addEventListener('click', function() {
        const petName = document.getElementById('modal-pet-name').textContent;
        showScheduleForm(petName);
    });
    
    // Adoption button
    document.getElementById('adopt-submit-btn').addEventListener('click', function() {
        const petName = document.getElementById('modal-pet-name').textContent;
        showAdoptionForm(petName);
    });
    
    // Back buttons
    document.getElementById('back-to-pet-btn').addEventListener('click', backToPetDetails);
    document.getElementById('back-to-pet-btn-adoption').addEventListener('click', backToPetDetails);
    
    // Schedule form submission
    document.getElementById('schedule-submit-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const form = document.getElementById('meet-greet-form');
        if (form.checkValidity()) {
            showSuccessMessage('schedule');
        } else {
            form.reportValidity();
        }
    });
    
    // Adoption form submission
    document.getElementById('adoption-submit-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const form = document.getElementById('adoption-form');
        if (form.checkValidity()) {
            showSuccessMessage('adoption');
        } else {
            form.reportValidity();
        }
    });
    
    // Close success message
    document.getElementById('close-success-btn').addEventListener('click', function() {
        closeModal();
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    createModal();
    setupAdoptButtons();
    setupModalEvents();
    
    // Fix for cases where DOM might load after our script
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(function() {
            setupAdoptButtons();
            setupModalEvents();
        }, 1000);
    }
});