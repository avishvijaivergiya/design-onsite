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

// Create actual doctor cards
function createDoctorCards(doctors) {
    const container = document.querySelector('.doctors-list');
    const template = doctors.map(doctor => `
        <div class="doctor-card animate-scale">
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p>${doctor.specialty}</p>
                <div class="rating">★ ${doctor.rating} (${doctor.reviews} reviews)</div>
                <div class="availability">Next Available: ${doctor.nextAvailable}</div>
            </div>
            <div class="timeslots">
                <button class="timeslot" data-time="9:00 AM">9:00 AM</button>
                <button class="timeslot" data-time="10:30 AM">10:30 AM</button>
                <button class="timeslot" data-time="2:15 PM">2:15 PM</button>
            </div>
            <button class="btn btn-secondary more-btn">More</button>
        </div>
    `).join('');

    container.innerHTML = template;
    initializeTimeslotHandlers();
}

function initializeTimeslotHandlers() {
    const modal = document.querySelector('.booking-modal');
    const formModal = document.querySelector('.form-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const formCloseBtn = formModal.querySelector('.close-modal');
    const confirmBtn = modal.querySelector('.btn-primary');
    const confirmationScreen = modal.querySelector('.booking-confirmation');
    const closeConfirmationBtn = modal.querySelector('.close-confirmation');
    
    // Handle timeslot clicks
    document.querySelectorAll('.timeslot').forEach(timeslot => {
        timeslot.addEventListener('click', (e) => {
            e.stopPropagation();
            const doctorCard = e.target.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('.doctor-info h3').textContent;
            const doctorSpecialty = doctorCard.querySelector('.doctor-info p').textContent;
            const doctorImage = doctorCard.querySelector('.doctor-image img').src;
            const selectedTime = e.target.dataset.time;
            
            // Update modal content
            modal.querySelector('.doctor-name').textContent = doctorName;
            modal.querySelector('.doctor-specialty').textContent = doctorSpecialty;
            modal.querySelector('.doctor-avatar').src = doctorImage;
            modal.querySelector('.selected-time').textContent = `Selected Time: ${selectedTime}`;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent modal content clicks from closing
    modal.querySelector('.booking-form').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle booking confirmation
    confirmBtn.addEventListener('click', () => {
        const formContent = modal.querySelector('.booking-form-content');
        formContent.style.opacity = '0';
        formContent.style.visibility = 'hidden';
        confirmationScreen.classList.add('active');
    });
    
    // Close confirmation and reset form
    closeConfirmationBtn.addEventListener('click', () => {
        const formContent = modal.querySelector('.booking-form-content');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form after animation
        setTimeout(() => {
            confirmationScreen.classList.remove('active');
            formContent.style.opacity = '1';
            formContent.style.visibility = 'visible';
        }, 300);
    });
    
    // Close form modal
    formCloseBtn.addEventListener('click', () => {
        formModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close form on outside click
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            formModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Prevent form modal content clicks from closing
    formModal.querySelector('.form-container').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

async function loadForms() {
    const modalContainer = document.getElementById('modal-container');
    
    try {
        // Load booking form
        const bookingFormResponse = await fetch('components/booking-form.html');
        const bookingFormHtml = await bookingFormResponse.text();
        
        // Load patient form
        const patientFormResponse = await fetch('components/patient-form.html');
        const patientFormHtml = await patientFormResponse.text();
        
        // Add both forms to the container
        modalContainer.innerHTML = bookingFormHtml + patientFormHtml;
        
        // Initialize handlers after forms are loaded
        initializeTimeslotHandlers();
    } catch (error) {
        console.error('Error loading forms:', error);
    }
}

// Initialize skeleton loading
document.addEventListener('DOMContentLoaded', () => {
    createSkeletonDoctors();
    loadForms();
    // Create doctor cards with mock data
    createDoctorCards(mockDoctors);
}); 