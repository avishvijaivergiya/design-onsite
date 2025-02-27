// Content Transition System
class ContentTransitionManager {
    constructor() {
        this.baseTransitionTime = 100; // Base time for one element (ms)
    }

    /**
     * Calculate transition duration based on content size
     * @param {HTMLElement} element - The element being shown/hidden
     * @returns {number} - Duration in milliseconds
     */
    calculateDuration(element) {
        const childCount = element.querySelectorAll('*').length;
        return Math.min(this.baseTransitionTime * childCount, 400); // Cap at 400ms
    }

    /**
     * Show an element with smooth transition
     * @param {HTMLElement} element - Element to show
     * @param {boolean} shiftContent - Whether to shift content below
     */
    show(element, shiftContent = true) {
        // Prepare element
        element.style.display = 'block';
        element.style.height = '0';
        element.classList.add('content-shift', 'entering');

        // Get dimensions
        const height = element.scrollHeight;
        const duration = this.calculateDuration(element);

        // Apply transitions
        element.style.transitionDuration = `${duration}ms`;
        element.style.height = `${height}px`;

        // If we need to shift content below
        if (shiftContent) {
            const nextElements = this.getNextElements(element);
            nextElements.forEach(el => {
                el.style.transitionDuration = `${duration}ms`;
                el.style.marginTop = `${height}px`;
            });
        }

        // Complete transition
        setTimeout(() => {
            element.classList.remove('entering');
            element.classList.add('entered');
            element.style.height = 'auto';
        }, duration);
    }

    /**
     * Hide an element with smooth transition
     * @param {HTMLElement} element - Element to hide
     * @param {boolean} shiftContent - Whether to shift content back
     */
    hide(element, shiftContent = true) {
        const height = element.scrollHeight;
        const duration = this.calculateDuration(element);

        element.style.height = `${height}px`;
        element.style.transitionDuration = `${duration}ms`;

        // Force a reflow
        element.offsetHeight;

        // Start transition
        element.style.height = '0';
        element.classList.add('entering');
        element.classList.remove('entered');

        if (shiftContent) {
            const nextElements = this.getNextElements(element);
            nextElements.forEach(el => {
                el.style.transitionDuration = `${duration}ms`;
                el.style.marginTop = '0';
            });
        }

        // Complete transition
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = 'auto';
        }, duration);
    }

    /**
     * Get all subsequent elements that need to be shifted
     * @param {HTMLElement} element - Reference element
     * @returns {Array<HTMLElement>} - Array of elements to shift
     */
    getNextElements(element) {
        const siblings = [];
        let nextElement = element.nextElementSibling;
        
        while (nextElement) {
            if (!nextElement.classList.contains('content-shift')) {
                siblings.push(nextElement);
            }
            nextElement = nextElement.nextElementSibling;
        }
        
        return siblings;
    }
}

// Initialize the transition manager
const transitionManager = new ContentTransitionManager();

// Example usage in the specialty group toggle
document.querySelectorAll('input[name="accountType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const specialtyGroup = document.getElementById('specialtyGroup');
        if (e.target.value === 'doctor') {
            transitionManager.show(specialtyGroup);
        } else {
            transitionManager.hide(specialtyGroup);
        }
    });
});

// Add this to your existing script.js
class SkeletonLoader {
    constructor() {
        this.form = document.querySelector('#signupForm');
        this.skeleton = document.querySelector('.skeleton-form');
    }

    show() {
        this.form.style.opacity = '0';
        this.skeleton.style.display = 'block';
    }

    hide() {
        this.form.style.opacity = '1';
        this.skeleton.style.display = 'none';
    }

    // Simulate loading
    simulateLoading(duration = 2000) {
        this.show();
        setTimeout(() => this.hide(), duration);
    }
}

// Initialize the skeleton loader
const skeletonLoader = new SkeletonLoader();

// Example usage:
// Show skeleton on form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    skeletonLoader.simulateLoading();
});

// Show skeleton when switching account type
document.querySelectorAll('input[name="accountType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'doctor') {
            skeletonLoader.simulateLoading(1000);
        }
    });
});

// Initialize shape shifting
document.addEventListener('DOMContentLoaded', () => {
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
});
