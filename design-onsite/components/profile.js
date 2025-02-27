// Get doctor ID from URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('id');

// Mock doctor data (in production, this would come from an API)
const doctorsData = {
    'd1': {
        name: "Dr. Sarah Johnson",
        title: "MD",
        specialty: "Family Medicine",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
        rating: 4.8,
        reviews: 156,
        education: [
            "Medical Degree - Stanford University School of Medicine",
            "Residency - UCLA Medical Center",
            "Board Certification - American Board of Family Medicine"
        ],
        specialties: ["Family Medicine", "Preventive Care", "Women's Health", "Pediatrics"],
        services: [
            "Annual Physical Examinations",
            "Preventive Care",
            "Chronic Disease Management",
            "Women's Health Services",
            "Pediatric Care",
            "Immunizations",
            "Mental Health Screening",
            "Minor Surgical Procedures"
        ],
        about: "Dr. Sarah Johnson is a board-certified family physician with over 15 years of experience in providing comprehensive medical care to patients of all ages. She completed her medical degree at Stanford University School of Medicine and her residency at UCLA Medical Center."
    },
    'd2': {
        name: "Dr. Michael Chen",
        title: "MD",
        specialty: "Cardiology",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
        rating: 4.9,
        reviews: 203,
        education: [
            "Medical Degree - Harvard Medical School",
            "Residency - Johns Hopkins Hospital",
            "Board Certification - American Board of Cardiology"
        ],
        specialties: ["Cardiology", "Internal Medicine", "Interventional Cardiology"],
        services: [
            "Cardiac Consultation",
            "ECG/EKG",
            "Stress Testing",
            "Heart Disease Management",
            "Preventive Cardiology",
            "Echocardiography"
        ],
        about: "Dr. Michael Chen is a board-certified cardiologist specializing in preventive cardiology and heart disease management."
    }
};

// Import shape-shifting initialization if not already available
function initializeShapeShifting() {
    document.querySelectorAll('.shape-shift').forEach(element => {
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

function loadDoctorProfile(doctorId) {
    // If no doctor ID, load default doctor
    if (!doctorId) {
        doctorId = 'd1';
    }

    const doctor = doctorsData[doctorId];
    if (!doctor) {
        // If doctor not found, redirect to search page
        window.location.href = 'index.html';
        return;
    }

    // Hide loading state and show content
    document.querySelector('.profile-loading').style.display = 'none';
    const profilePage = document.querySelector('.profile-page');
    profilePage.style.display = 'block';

    // Trigger animation after a small delay to ensure display change is processed
    requestAnimationFrame(() => {
        profilePage.classList.add('loaded');
    });

    // Update page title
    document.title = `${doctor.name}, ${doctor.title} - Medical Profile`;

    // Update profile header
    document.querySelector('.profile-info h1').textContent = `${doctor.name}, ${doctor.title}`;
    document.querySelector('.profile-image').src = doctor.image;

    // Update specialties
    const specialtiesContainer = document.querySelector('.specialties');
    specialtiesContainer.innerHTML = doctor.specialties
        .map(specialty => `<span class="specialty-tag interactive">${specialty}</span>`)
        .join('');

    // Update about section
    document.querySelector('.content-section:nth-of-type(3) p').textContent = doctor.about;

    // Update education
    const educationList = document.querySelector('.content-section:nth-of-type(4) ul');
    educationList.innerHTML = doctor.education
        .map(edu => `<li>${edu}</li>`)
        .join('');

    // Update services
    const servicesGrid = document.querySelector('.content-section:nth-of-type(5) .services-grid');
    servicesGrid.innerHTML = doctor.services
        .map(service => `<div class="service-item interactive">${service}</div>`)
        .join('');

    // Initialize shape-shifting for new elements
    initializeShapeShifting();
}

// Load the doctor's profile when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadDoctorProfile(doctorId);
}); 