// Mock data for doctors
const mockDoctors = [
    {
        id: "d1",
        name: "Dr. Sarah Johnson",
        specialty: "Primary Care",
        rating: 4.8,
        reviews: 156,
        nextAvailable: "Tomorrow",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "d2",
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        rating: 4.9,
        reviews: 203,
        nextAvailable: "Today",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrics",
        rating: 4.7,
        reviews: 178,
        nextAvailable: "Tomorrow",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. James Wilson",
        specialty: "Dermatology",
        rating: 4.6,
        reviews: 142,
        nextAvailable: "Next Week",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. Lisa Patel",
        specialty: "Family Medicine",
        rating: 4.9,
        reviews: 267,
        nextAvailable: "Today",
        image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. David Kim",
        specialty: "Orthopedics",
        rating: 4.8,
        reviews: 189,
        nextAvailable: "Tomorrow",
        image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. Rachel Thompson",
        specialty: "Internal Medicine",
        rating: 4.7,
        reviews: 156,
        nextAvailable: "Today",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Dr. Robert Martinez",
        specialty: "Neurology",
        rating: 4.8,
        reviews: 213,
        nextAvailable: "Next Week",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200"
    }
];

// Track booked slots
const bookedSlots = new Map(); // doctorId_time -> boolean

function createDoctorCards(doctors) {
    const container = document.querySelector('.doctors-list');
    const template = doctors.map(doctor => `
        <div class="doctor-card interactive" data-doctor-id="${doctor.id}">
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p>${doctor.specialty}</p>
                <p class="address">123 Medical Center Dr, Suite 100</p>
                <div class="rating">
                    <span class="stars">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1L10.163 5.279L15 6.017L11.5 9.389L12.326 14L8 11.838L3.674 14L4.5 9.389L1 6.017L5.837 5.279L8 1Z" 
                                fill="currentColor"/>
                        </svg>
                        ${doctor.rating.toFixed(2)}
                    </span>
                    <span class="reviews">(${doctor.reviews} reviews)</span>
                </div>
                <div class="availability">Next Available: ${doctor.nextAvailable}</div>
            </div>
            <div class="timeslots">
                <button class="timeslot interactive shape-shift square-to-round" data-time="9:00 AM">9:00 AM</button>
                <button class="timeslot interactive shape-shift square-to-round" data-time="10:30 AM">10:30 AM</button>
                <button class="timeslot interactive shape-shift square-to-round" data-time="2:15 PM">2:15 PM</button>
            </div>
            <button class="btn btn-secondary more-btn interactive">More</button>
        </div>
    `).join('');

    container.innerHTML = template;
    updateBookedSlots();
}

function updateBookedSlots() {
    // Disable all booked slots
    bookedSlots.forEach((isBooked, key) => {
        if (isBooked) {
            const [doctorId, time] = key.split('_');
            const doctorCard = document.querySelector(`[data-doctor-id="${doctorId}"]`);
            if (doctorCard) {
                const slot = doctorCard.querySelector(`[data-time="${time}"]`);
                if (slot) {
                    slot.classList.add('booked');
                    slot.disabled = true;
                }
            }
        }
    });
}

function initializeTimeslotHandlers() {
    // Wait for modal to be available
    const modal = document.querySelector('.booking-modal');
    if (!modal) {
        console.error('Modal not found when initializing handlers');
        return;
    }
    const closeBtn = modal.querySelector('.close-modal');
    if (!closeBtn) {
        console.error('Close button not found');
        return;
    }
    
    // Handle timeslot clicks
    document.querySelectorAll('.timeslot').forEach(timeslot => {
        timeslot.addEventListener('click', (e) => {
            e.stopPropagation();
            const doctorCard = e.target.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('.doctor-info h3').textContent;
            const doctorSpecialty = doctorCard.querySelector('.doctor-info p:first-of-type').textContent;
            const selectedTime = e.target.textContent;
            const doctorImage = doctorCard.querySelector('.doctor-image img').src;
            const doctorId = doctorCard.dataset.doctorId;

            // Update modal content
            modal.setAttribute('data-doctor-id', doctorId);
            modal.querySelector('.doctor-name').textContent = doctorName;
            modal.querySelector('.doctor-specialty').textContent = doctorSpecialty;
            modal.querySelector('.selected-time').textContent = `Selected time: ${selectedTime}`;
            modal.querySelector('.doctor-avatar').src = doctorImage;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal opened', { doctorName, selectedTime });
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

async function loadForms() {
    const modalContainer = document.getElementById('modal-container');
    
    try {
        // Load booking form
        modalContainer.innerHTML = `
            <div class="booking-modal">
                <div class="booking-form">
                    <div class="booking-form-header">
                        <h2>Book Appointment</h2>
                        <button class="close-modal">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="booking-form-content">
                        <div class="doctor-brief">
                            <img class="doctor-avatar" src="" alt="">
                            <div>
                                <h3 class="doctor-name"></h3>
                                <p class="doctor-specialty"></p>
                            </div>
                        </div>
                        <div class="selected-time"></div>
                        <div class="form-group">
                            <label for="visitType">Visit Type</label>
                            <select id="visitType" class="form-select shape-shift square-to-round">
                                <option value="in-person">In-person visit</option>
                                <option value="video">Video visit</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="visitReason">Reason for Visit</label>
                            <input type="text" id="visitReason" class="form-input shape-shift square-to-round" placeholder="Brief description of your concern">
                        </div>
                        <button class="btn btn-primary" onclick="showConfirmation(event)">Confirm Booking</button>
                    </div>
                    <div class="booking-confirmation" style="display: none;">
                        <div class="confirmation-content">
                            <div class="checkmark-circle">
                                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                            </div>
                            <h2>Booking Confirmed!</h2>
                            <p class="confirmation-message"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize modal elements
        const modal = document.querySelector('.booking-modal');
        if (!modal) {
            console.error('Modal not found after loading');
            return;
        }
    } catch (error) {
        console.error('Error loading forms:', error.message);
    }
}

// Create skeleton doctor cards
function createSkeletonDoctors(count = 5) {
    const container = document.querySelector('.skeleton-doctors');
    const template = `
        <div class="skeleton-doctor-card">
            <div class="skeleton skeleton-doctor-image"></div>
            <div class="skeleton-doctor-info">
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
                <div class="skeleton skeleton-text" style="width: 40%;"></div>
                <div class="skeleton skeleton-text" style="width: 80%;"></div>
                <div class="skeleton skeleton-text" style="width: 30%;"></div>
            </div>
            <div class="skeleton-timeslots">
                <div class="skeleton skeleton-text" style="width: 60px;"></div>
                <div class="skeleton skeleton-text" style="width: 60px;"></div>
                <div class="skeleton skeleton-text" style="width: 60px;"></div>
            </div>
            <div class="skeleton skeleton-text" style="width: 60px;"></div>
        </div>
    `;

    container.innerHTML = template.repeat(count);
}

// Initialize shape shifting
function initializeShapeShifting() {
    // For filter buttons
    document.querySelectorAll('.shape-shift').forEach(element => {
        // Toggle shape on click
        element.addEventListener('click', () => {
            element.classList.add('shifted');
        });

        element.addEventListener('focus', () => {
            element.classList.add('shifted');
        });

        element.addEventListener('blur', () => {
            element.classList.remove('shifted');
        });
    });
}

// Initialize skeleton loading
document.addEventListener('DOMContentLoaded', async () => {
    createSkeletonDoctors();
    await loadForms();  // Wait for forms to load first
    
    // Create doctor cards with mock data after delay
    setTimeout(() => {
        document.querySelector('.skeleton-doctors').style.display = 'none';
        document.querySelector('.skeleton-filters-loading').style.display = 'none';
        document.querySelector('.doctors-list').style.display = 'block';
        document.querySelector('.skeleton-filters').style.display = 'flex';
        createDoctorCards(mockDoctors);
        initializeTimeslotHandlers();
        initializeShapeShifting();
    }, 2000);
});

function showConfirmation(event) {
    event.preventDefault();
    const modal = document.querySelector('.booking-modal');
    const form = modal.querySelector('.booking-form-content');
    const confirmation = modal.querySelector('.booking-confirmation');
    const doctorName = modal.querySelector('.doctor-name').textContent;
    const selectedTime = modal.querySelector('.selected-time').textContent;
    const doctorId = modal.getAttribute('data-doctor-id');
    const time = selectedTime.split(': ')[1];
    
    // Hide form and show confirmation
    form.style.display = 'none';
    confirmation.style.display = 'flex';
    
    // Mark slot as booked
    bookedSlots.set(`${doctorId}_${time}`, true);
    updateBookedSlots();
    
    // Update confirmation message
    confirmation.querySelector('.confirmation-message').textContent = 
        `Your appointment with ${doctorName} has been confirmed for ${selectedTime.toLowerCase()}.`;

    // Close modal after 3 seconds
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal state
        setTimeout(() => {
            form.style.display = 'flex';
            confirmation.style.display = 'none';
        }, 300);
    }, 3000);
} 