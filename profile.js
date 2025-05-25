
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to navigation items when clicked
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Create toast notification function
    function showToast(message, duration = 3000) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Create modal function - MOVED OUTSIDE to be globally accessible
    window.showModal = function(title, content) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal-container');
        if (existingModal) existingModal.remove();
        
        // Create modal elements
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.marginTop = '70px'; // Adjust this value based on your navbar height

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            modalContainer.classList.remove('show');
            setTimeout(() => modalContainer.remove(), 300);
        });
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = content;
        
        // Assemble modal
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);
        
        // Animate in
        setTimeout(() => modalContainer.classList.add('show'), 10);
        
        // Close modal when clicking outside
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('show');
                setTimeout(() => modalContainer.remove(), 300);
            }
        });
    };

    // Edit profile button functionality
    const editButton = document.querySelector('.edit-btn');
    if (editButton) {
        editButton.addEventListener('click', function() {
            showModal('Edit Profile', `
                <form id="edit-profile-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" value="Sarah Thompson">
                    </div>
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" id="location" value="Cairo, Egypt">
                    </div>
                    <div class="form-group">
                        <label for="birth">Date of birth</label>
                        <input type="date" id="birth" value="2000-04-08">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" value="sarah.thompson@email.com">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" value="+1 (503) 265-3625">
                    </div>
                    <button type="button" id="save-profile" class="btn-primary">Save Changes</button>
                </form>
            `);
            
            // Add save functionality
            document.getElementById('save-profile').addEventListener('click', function() {
                showToast('Profile updated successfully!');
                const modalContainer = document.querySelector('.modal-container');
                modalContainer.classList.remove('show');
                setTimeout(() => modalContainer.remove(), 300);
            });
        });
    }

    // View course details buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseEl = this.closest('.course-content');
            const courseName = courseEl.querySelector('h3').textContent;
            const courseDesc = courseEl.querySelector('p').textContent;
            
            let statusText = "";
            if (this.closest('.pet-course').classList.contains('completed')) {
                statusText = "<span class='status-completed-text'>Completed</span>";
            } else {
                statusText = "<span class='status-started-text'>In Progress</span>";
            }
            
            showModal(courseName, `
                <div class="course-details">
                    <p>${courseDesc}</p>
                    <p class="course-status-info">Status: ${statusText}</p>
                    <h4>Course Content:</h4>
                    <ul class="course-lessons">
                        <li>Lesson 1: Introduction</li>
                        <li>Lesson 2: Basic Techniques</li>
                        <li>Lesson 3: Practice Methods</li>
                        <li>Lesson 4: Advanced Skills</li>
                        <li>Lesson 5: Troubleshooting</li>
                        <li>Lesson 6: Final Assessment</li>
                    </ul>
                    <button class="btn-primary continue-course">Continue Course</button>
                </div>
            `);
            
            document.querySelector('.continue-course').addEventListener('click', function() {
                showToast('Loading course content...');
                const modalContainer = document.querySelector('.modal-container');
                modalContainer.classList.remove('show');
                setTimeout(() => modalContainer.remove(), 300);
            });
        });
    });

    // Subscribe button
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            showModal('Premium Pet Parent Membership', `
                <div class="subscription-details">
                    <p>Choose your subscription plan:</p>
                    <div class="subscription-plans">
                        <div class="plan">
                            <h4>Monthly</h4>
                            <p class="price">100EGP/month</p>
                            <ul>
                                <li>Full access to pet training videos</li>
                                <li>Pet health tracking</li>
                                <li>Discounts on pet supplies</li>
                            </ul>
                            <button class="btn-primary select-plan" data-plan="monthly">Select Plan</button>
                        </div>
                        <div class="plan">
                            <h4>Annual</h4>
                            <p class="price">900EGP/year</p>
                            <p class="savings">Save 25%</p>
                            <ul>
                                <li>All monthly benefits</li>
                                <li>Free yearly vet consultation</li>
                                <li>Priority customer support</li>
                            </ul>
                            <button class="btn-primary select-plan" data-plan="annual">Select Plan</button>
                        </div>
                    </div>
                </div>
            `);
            
            // Add plan selection functionality
            document.querySelectorAll('.select-plan').forEach(button => {
                button.addEventListener('click', function() {
                    const plan = this.getAttribute('data-plan');
                    showToast(`Thank you for subscribing to the ${plan} Premium Pet Parent Membership!`);
                    const modalContainer = document.querySelector('.modal-container');
                    modalContainer.classList.remove('show');
                    setTimeout(() => modalContainer.remove(), 300);
                });
            });
        });
    }

    // Add hover effect to course items
    const courseItems = document.querySelectorAll('.pet-course');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Notifications functionality
    const notificationsBtn = document.querySelector('.notifications');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            showModal('Notifications', `
                <div class="notifications-list">
                    <div class="notification unread">
                        <div class="notification-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="notification-content">
                            <h4>New Event: Pet Vaccination Drive</h4>
                            <p>Join us on May 15th at Central Park for our annual pet vaccination drive.</p>
                            <span class="notification-time">2 hours ago</span>
                        </div>
                    </div>
                    <div class="notification unread">
                        <div class="notification-icon">
                            <i class="fas fa-paw"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Your Pet Training Course Starts Tomorrow</h4>
                            <p>Don't forget to complete the pre-training checklist!</p>
                            <span class="notification-time">5 hours ago</span>
                        </div>
                    </div>
                    <div class="notification">
                        <div class="notification-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Weekly Pet Care Tips</h4>
                            <p>Check out our new article on summer grooming for pets.</p>
                            <span class="notification-time">2 days ago</span>
                        </div>
                    </div>
                    <button class="btn-primary mark-read">Mark All as Read</button>
                </div>
            `);
            
            // Add mark as read functionality
            document.querySelector('.mark-read').addEventListener('click', function() {
                document.querySelectorAll('.notification.unread').forEach(notif => {
                    notif.classList.remove('unread');
                });
                showToast('All notifications marked as read');
            });
        });
    }
    
    // Function to show detailed information for a specific pet
    function showPetDetailsModal(pet) {
        let content = '';
        
        if (pet === 'oreo') {
            content = `
                <div class="pet-profile">
                    <div class="pet-profile-header">
                        <img src="/pets/garden.jpg" alt="Oreo" class="pet-banner">
                        <div class="pet-avatar">
                            <img src="/pets/oreo.jpg" alt="Oreo">
                        </div>
                    </div>
                    <div class="pet-profile-info">
                        <h2>Oreo</h2>
                        <p class="pet-tagline">Your playful Border Collie companion</p>
                        
                        <div class="pet-attributes">
                            <div class="pet-attribute">
                                <i class="fas fa-birthday-cake"></i>
                                <span>May 12, 2022</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-venus-mars"></i>
                                <span>Male</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-weight"></i>
                                <span>20 kg</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-syringe"></i>
                                <span>Vaccinated</span>
                            </div>
                        </div>
                        
                        <div class="pet-section">
                            <h3>About Oreo</h3>
                            <p>Oreo is an energetic Border Collie who loves to play fetch and go on long walks. He's very intelligent and has mastered several tricks. He's great with children and other dogs.</p>
                        </div>
                        
                        <div class="pet-section">
                            <h3>Medical History</h3>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Annual Checkup</h4>
                                        <p>April 15, 2025 - All healthy!</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Rabies Vaccination</h4>
                                        <p>January 10, 2025 - No adverse reactions</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Minor Paw Injury</h4>
                                        <p>October 5, 2024 - Fully healed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pet-section">
                            <h3>Upcoming Appointments</h3>
                            <div class="appointment-card">
                                <div class="appointment-icon">
                                    <i class="fas fa-cut"></i>
                                </div>
                                <div class="appointment-details">
                                    <h4>Grooming Session</h4>
                                    <p>May 20, 2025 - 2:00 PM</p>
                                    <p>PetFoster Grooming Center</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (pet === 'fluffy') {
            content = `
                <div class="pet-profile">
                    <div class="pet-profile-header">
                        <img src="/pets/block.jpg" alt="Fluffy" class="pet-banner">
                        <div class="pet-avatar">
                            <img src="/pets/fluffy.jpg" alt="Fluffy">
                        </div>
                    </div>
                    <div class="pet-profile-info">
                        <h2>Fluffy</h2>
                        <p class="pet-tagline">Your elegant Persian princess</p>
                        
                        <div class="pet-attributes">
                            <div class="pet-attribute">
                                <i class="fas fa-birthday-cake"></i>
                                <span>June 3, 2023</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-venus-mars"></i>
                                <span>Female</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-weight"></i>
                                <span>4.5 kg</span>
                            </div>
                            <div class="pet-attribute">
                                <i class="fas fa-home"></i>
                                <span>Indoor</span>
                            </div>
                        </div>
                        
                        <div class="pet-section">
                            <h3>About Fluffy</h3>
                            <p>Fluffy is a gorgeous Persian cat who enjoys lounging in sunny spots and being brushed. She's quite independent but loves cuddles in the evening. She's very gentle and calm around visitors.</p>
                        </div>
                        
                        <div class="pet-section">
                            <h3>Medical History</h3>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Dental Cleaning</h4>
                                        <p>March 25, 2025 - Excellent dental health</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Annual Checkup</h4>
                                        <p>December 12, 2024 - All healthy!</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4>Flea Treatment</h4>
                                        <p>September 3, 2024 - Preventative</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pet-section">
                            <h3>Diet Preferences</h3>
                            <div class="diet-preferences">
                                <div class="diet-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Premium dry food</span>
                                </div>
                                <div class="diet-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Wet food (salmon flavor)</span>
                                </div>
                                <div class="diet-item">
                                    <i class="fas fa-times-circle"></i>
                                    <span>Dairy products</span>
                                </div>
                                <div class="diet-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Occasional tuna treats</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        showModal(`${pet.charAt(0).toUpperCase() + pet.slice(1)}'s Profile`, content);
    }

    // Function to show reminder form modal
    function showReminderModal(pet) {
        const petName = pet.charAt(0).toUpperCase() + pet.slice(1);
        
        showModal(`Set Reminder for ${petName}`, `
            <form id="reminder-form">
                <div class="form-group">
                    <label for="reminder-title">Reminder Title</label>
                    <input type="text" id="reminder-title" placeholder="e.g., Vet Appointment">
                </div>
                <div class="form-group">
                    <label for="reminder-date">Date</label>
                    <input type="date" id="reminder-date">
                </div>
                <div class="form-group">
                    <label for="reminder-time">Time</label>
                    <input type="time" id="reminder-time">
                </div>
                <div class="form-group">
                    <label for="reminder-notes">Notes</label>
                    <textarea id="reminder-notes" rows="3" placeholder="Additional details..."></textarea>
                </div>
                <div class="form-group">
                    <label for="reminder-repeat">Repeat</label>
                    <select id="reminder-repeat">
                        <option value="never">Never</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <button type="button" id="save-reminder" class="btn-primary">Save Reminder</button>
            </form>
        `);
        
        // Add save functionality
        document.getElementById('save-reminder').addEventListener('click', function() {
            const title = document.getElementById('reminder-title').value;
            if (!title) {
                showToast('Please enter a reminder title');
                return;
            }
            
            showToast(`Reminder set for ${petName}: ${title}`);
            const modalContainer = document.querySelector('.modal-container');
            modalContainer.classList.remove('show');
            setTimeout(() => modalContainer.remove(), 300);
            
            // Update the Reminders count in the stats
            const remindersStat = document.querySelector('.stat-card:nth-child(3) .stat-info span');
            if (remindersStat) {
                const currentCount = parseInt(remindersStat.textContent);
                remindersStat.textContent = currentCount + 1;
            }
        });
    }

    // Function to show pets modal
    function showPetsModal() {
        showModal('My Adorable Pets', `
            <div class="pets-container">
                <div class="pets-grid">
                    <!-- Pet Card 1 -->
                    <div class="pet-card">
                        <div class="pet-image">
                            <img src="/pets/oreo.jpg" alt="Oreo">
                            <span class="pet-badge dog">Dog</span>
                        </div>
                        <div class="pet-details">
                            <h3>Oreo</h3>
                            <div class="pet-info">
                                <div class="pet-info-item">
                                    <span class="info-label">Breed:</span>
                                    <span class="info-value">Border Collie</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Age:</span>
                                    <span class="info-value">3 years</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Gender:</span>
                                    <span class="info-value">Male</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Weight:</span>
                                    <span class="info-value">20 kg</span>
                                </div>
                            </div>
                            <div class="pet-actions">
                                <button class="btn-primary btn-details" data-pet="oreo">View Details</button>
                                <button class="btn-outline btn-reminder" data-pet="oreo">
                                    <i class="fas fa-bell"></i> Set Reminder
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Pet Card 2 -->
                    <div class="pet-card">
                        <div class="pet-image">
                            <img src="/pets/fluffy.jpg" alt="Fluffy">
                            <span class="pet-badge cat">Cat</span>
                        </div>
                        <div class="pet-details">
                            <h3>Fluffy</h3>
                            <div class="pet-info">
                                <div class="pet-info-item">
                                    <span class="info-label">Breed:</span>
                                    <span class="info-value">Persian</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Age:</span>
                                    <span class="info-value">2 years</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Gender:</span>
                                    <span class="info-value">Female</span>
                                </div>
                                <div class="pet-info-item">
                                    <span class="info-label">Weight:</span>
                                    <span class="info-value">4.5 kg</span>
                                </div>
                            </div>
                            <div class="pet-actions">
                                <button class="btn-primary btn-details" data-pet="fluffy">View Details</button>
                                <button class="btn-outline btn-reminder" data-pet="fluffy">
                                    <i class="fas fa-bell"></i> Set Reminder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
 // Fix the grid layout to position pets side by side
 const petsGrid = document.querySelector('.pets-grid');
 if (petsGrid) {
     petsGrid.style.display = 'grid';
     petsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
     petsGrid.style.gap = '20px';
 }
        // Add event listeners to buttons
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', function() {
                const pet = this.getAttribute('data-pet');
                showPetDetailsModal(pet);
            });
        });

        document.querySelectorAll('.btn-reminder').forEach(button => {
            button.addEventListener('click', function() {
                const pet = this.getAttribute('data-pet');
                showReminderModal(pet);
            });
        });
        // Fix cursor for pet cards in modal
    document.querySelectorAll('.pet-card').forEach(card => {
        card.style.cursor = 'default';
    });
    
    // Ensure buttons have proper cursor
    document.querySelectorAll('.pet-actions button').forEach(button => {
        button.style.cursor = 'pointer';
    });
    }

    // Make all stat cards clickable with consistent styling
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.classList.add('clickable-card');
        
        // First card is "My Pets"
        if (card === statCards[0]) {
            card.addEventListener('click', showPetsModal);
            card.style.cursor = 'pointer';

        }
        // Second card is "Favorites"
        else if (card === statCards[1]) {
            card.addEventListener('click', function() {
                showModal('My Favorites', `
                    <div class="favorites-empty">
                        <div class="empty-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h3>No favorites yet</h3>
                        <p>Browse our pet listings and add some favorites to see them here.</p>
                   <button class="btn-primary" onclick="window.location.href='pets.html'">Browse Pets</button>
                    </div>
                `);
            });
        }
        // Third card is "Reminders"
        else if (card === statCards[2]) {
            card.addEventListener('click', function() {
                showModal('My Reminders', `
                    <div class="reminders-list">
                        <div class="reminder-item">
                            <div class="reminder-icon">
                                <i class="fas fa-syringe"></i>
                            </div>
                            <div class="reminder-content">
                                <h4>Oreo's Vaccination</h4>
                                <p>May 15, 2025 - 10:00 AM</p>
                                <p>Downtown Pet Clinic</p>
                            </div>
                            <div class="reminder-actions">
                                <button class="btn-edit-reminder"><i class="fas fa-edit"></i></button>
                                <button class="btn-delete-reminder"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="reminder-item">
                            <div class="reminder-icon">
                                <i class="fas fa-capsules"></i>
                            </div>
                            <div class="reminder-content">
                                <h4>Fluffy's Medication</h4>
                                <p>Daily - 9:00 AM and 9:00 PM</p>
                                <p>Anti-hairball supplement</p>
                            </div>
                            <div class="reminder-actions">
                                <button class="btn-edit-reminder"><i class="fas fa-edit"></i></button>
                                <button class="btn-delete-reminder"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <button class="btn-primary add-reminder">Add New Reminder</button>
                    </div>
                `);
               
                // Add button event listeners
                document.querySelector('.add-reminder').addEventListener('click', function() {
                    showModal('Add New Reminder', `
                        <form id="reminder-form">
                            <div class="form-group">
                                <label for="reminder-pet">Pet</label>
                                <select id="reminder-pet">
                                    <option value="oreo">Oreo</option>
                                    <option value="fluffy">Fluffy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="reminder-title">Reminder Title</label>
                                <input type="text" id="reminder-title" placeholder="e.g., Vet Appointment">
                            </div>
                            <div class="form-group">
                                <label for="reminder-date">Date</label>
                                <input type="date" id="reminder-date">
                            </div>
                            <div class="form-group">
                                <label for="reminder-time">Time</label>
                                <input type="time" id="reminder-time">
                            </div>
                            <div class="form-group">
                                <label for="reminder-notes">Notes</label>
                                <textarea id="reminder-notes" rows="3" placeholder="Additional details..."></textarea>
                            </div>
                            <div class="form-group">
                                <label for="reminder-repeat">Repeat</label>
                                <select id="reminder-repeat">
                                    <option value="never">Never</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <button type="button" id="save-reminder" class="btn-primary">Save Reminder</button>
                        </form>
                    `);
                    
                    document.getElementById('save-reminder').addEventListener('click', function() {
                        const title = document.getElementById('reminder-title').value;
                        if (!title) {
                            showToast('Please enter a reminder title');
                            return;
                        }
                        
                        showToast('New reminder added successfully!');
                        const modalContainer = document.querySelector('.modal-container');
                        modalContainer.classList.remove('show');
                        setTimeout(() => modalContainer.remove(), 300);
                        
                        // Update the Reminders count in the stats
                        const remindersStat = document.querySelector('.stat-card:nth-child(3) .stat-info span');
                        if (remindersStat) {
                            const currentCount = parseInt(remindersStat.textContent);
                            remindersStat.textContent = currentCount + 1;
                        }
                    });
                });
                
                document.querySelectorAll('.btn-edit-reminder').forEach(button => {
                    button.addEventListener('click', function() {
                        const reminderItem = this.closest('.reminder-item');
                        const title = reminderItem.querySelector('h4').textContent;
                        
                        showModal('Edit Reminder', `
                            <form id="edit-reminder-form">
                                <div class="form-group">
                                    <label for="edit-reminder-title">Reminder Title</label>
                                    <input type="text" id="edit-reminder-title" value="${title}">
                                </div>
                                <div class="form-group">
                                    <label for="edit-reminder-date">Date</label>
                                    <input type="date" id="edit-reminder-date">
                                </div>
                                <div class="form-group">
                                    <label for="edit-reminder-time">Time</label>
                                    <input type="time" id="edit-reminder-time">
                                </div>
                                <div class="form-group">
                                    <label for="edit-reminder-notes">Notes</label>
                                    <textarea id="edit-reminder-notes" rows="3"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="edit-reminder-repeat">Repeat</label>
                                    <select id="edit-reminder-repeat">
                                        <option value="never">Never</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </div>
                                <button type="button" id="update-reminder" class="btn-primary">Update Reminder</button>
                            </form>
                        `);
                        
                        document.getElementById('update-reminder').addEventListener('click', function() {
                            showToast('Reminder updated successfully!');
                            const modalContainer = document.querySelector('.modal-container');
                            modalContainer.classList.remove('show');
                            setTimeout(() => modalContainer.remove(), 300);
                        });
                    });
                });
                
                document.querySelectorAll('.btn-delete-reminder').forEach(button => {
                    button.addEventListener('click', function() {
                        const reminderItem = this.closest('.reminder-item');
                        const title = reminderItem.querySelector('h4').textContent;
                        
                        showModal('Delete Reminder', `
                            <div class="delete-confirmation">
                                <p>Are you sure you want to delete the reminder "${title}"?</p>
                                <div class="confirmation-buttons">
                                    <button id="confirm-delete" class="btn-danger">Delete</button>
                                    <button id="cancel-delete" class="btn-outline">Cancel</button>
                                </div>
                            </div>
                        `);
                        
                        document.getElementById('confirm-delete').addEventListener('click', function() {
                            reminderItem.remove();
                            showToast('Reminder deleted successfully!');
                            
                            // Update the Reminders count in the stats
                            const remindersStat = document.querySelector('.stat-card:nth-child(3) .stat-info span');
                            if (remindersStat) {
                                const currentCount = parseInt(remindersStat.textContent);
                                remindersStat.textContent = Math.max(0, currentCount - 1);
                            }
                            
                            const modalContainer = document.querySelector('.modal-container');
                            modalContainer.classList.remove('show');
                            setTimeout(() => modalContainer.remove(), 300);
                        });
                        
                        document.getElementById('cancel-delete').addEventListener('click', function() {
                            const modalContainer = document.querySelector('.modal-container');
                            modalContainer.classList.remove('show');
                            setTimeout(() => modalContainer.remove(), 300);
                        });
                    });
                });
            });
        }
        // Fourth card is "Messages"
        else if (card === statCards[3]) {
            card.addEventListener('click', function() {
                showModal('My Messages', `
                    <div class="messages-list">
                        <div class="message-item unread">
                            <div class="message-avatar">
                                <img src="/pets/user (1).png" alt="Dr. Sarah">
                            </div>
                            <div class="message-content">
                                <div class="message-header">
                                    <h4>Dr. Sarah Johnson</h4>
                                    <span class="message-time">2 hours ago</span>
                                </div>
                                <p>Your appointment for Oreo's dental cleaning has been confirmed for May 12th at 10:00 AM.</p>
                                <div class="message-actions">
                                    <button class="btn-reply">Reply</button>
                                    <button class="btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div class="messages-empty" style="display: none;">
                            <div class="empty-icon">
                                <i class="fas fa-envelope-open"></i>
                            </div>
                            <h3>No messages</h3>
                            <p>You don't have any messages yet.</p>
                        </div>
                    </div>
                `);
                
                // Add button event listeners
                document.querySelector('.btn-reply').addEventListener('click', function() {
                    showModal('Reply to Dr. Sarah Johnson', `
                        <form id="reply-form">
                            <div class="form-group">
                                <textarea id="reply-content" rows="5" placeholder="Type your reply here..."></textarea>
                            </div>
                            <button type="button" id="send-reply" class="btn-primary">Send Reply</button>
                        </form>
                    `);
                    
                    document.getElementById('send-reply').addEventListener('click', function() {
                        const replyContent = document.getElementById('reply-content').value;
                        if (!replyContent.trim()) {
                            showToast('Please enter a message');
                            return;
                        }
                        
                        showToast('Reply sent successfully!');
                        const modalContainer = document.querySelector('.modal-container');
                        modalContainer.classList.remove('show');
                        setTimeout(() => modalContainer.remove(), 300);
                    });
                });
                
                document.querySelector('.btn-delete').addEventListener('click', function() {
                    showModal('Delete Message', `
                        <div class="delete-confirmation">
                            <p>Are you sure you want to delete this message from Dr. Sarah Johnson?</p>
                            <div class="confirmation-buttons">
                                <button id="confirm-delete" class="btn-danger">Delete</button>
                                <button id="cancel-delete" class="btn-outline">Cancel</button>
                            </div>
                        </div>
                    `);
                    
                    document.getElementById('confirm-delete').addEventListener('click', function() {
                        document.querySelector('.message-item').remove();
                        document.querySelector('.messages-empty').style.display = 'block';
                        
                        // Update the Messages count in the stats
                        const messagesStat = document.querySelector('.stat-card:nth-child(4) .stat-info span');
                        if (messagesStat) {
                            messagesStat.textContent = '0';
                        }
                        
                        showToast('Message deleted successfully!');
                        const modalContainer = document.querySelector('.modal-container');
                        modalContainer.classList.remove('show');
                        setTimeout(() => modalContainer.remove(), 300);
                    });
                    
                    document.getElementById('cancel-delete').addEventListener('click', function() {
                        const modalContainer = document.querySelector('.modal-container');
                        modalContainer.classList.remove('show');
                        setTimeout(() => modalContainer.remove(), 300);
                    });
                });
            });
        }
    });
});
