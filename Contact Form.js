// Form validation and handling
class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameField = document.getElementById('name');
        this.emailField = document.getElementById('email');
        this.messageField = document.getElementById('message');
        this.resetBtn = document.getElementById('resetBtn');
        this.successMessage = document.getElementById('successMessage');
        
        // Error message elements
        this.nameError = document.getElementById('nameError');
        this.emailError = document.getElementById('emailError');
        this.messageError = document.getElementById('messageError');
        
        // Email validation regex
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        this.init();
    }
    
    init() {
        // Form submission event
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Reset button event
        this.resetBtn.addEventListener('click', (e) => this.handleReset(e));
        
        // Real-time validation events
        this.nameField.addEventListener('blur', () => this.validateName());
        this.emailField.addEventListener('blur', () => this.validateEmail());
        this.messageField.addEventListener('blur', () => this.validateMessage());
        
        // Input events to clear errors as user types
        this.nameField.addEventListener('input', () => this.clearError('name'));
        this.emailField.addEventListener('input', () => this.clearError('email'));
        this.messageField.addEventListener('input', () => this.clearError('message'));
    }
    
    handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Hide success message if visible
        this.hideSuccessMessage();
        
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        // Check if all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            this.submitForm();
        } else {
            // Focus on first invalid field
            this.focusFirstInvalidField();
        }
    }
    
    validateName() {
        const name = this.nameField.value.trim();
        
        if (name === '') {
            this.showError('name', 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showError('name', 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            this.showError('name', 'Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }
        
        this.clearError('name');
        this.nameField.classList.add('valid');
        return true;
    }
    
    validateEmail() {
        const email = this.emailField.value.trim();
        
        if (email === '') {
            this.showError('email', 'Email is required');
            return false;
        }
        
        if (!this.emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        // Additional email validation checks
        if (email.length > 254) {
            this.showError('email', 'Email address is too long');
            return false;
        }
        
        this.clearError('email');
        this.emailField.classList.add('valid');
        return true;
    }
    
    validateMessage() {
        const message = this.messageField.value.trim();
        
        if (message === '') {
            this.showError('message', 'Message is required');
            return false;
        }
        
        if (message.length < 10) {
            this.showError('message', 'Message must be at least 10 characters long');
            return false;
        }
        
        if (message.length > 1000) {
            this.showError('message', 'Message must be less than 1000 characters');
            return false;
        }
        
        this.clearError('message');
        this.messageField.classList.add('valid');
        return true;
    }
    
    showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.add('error');
        field.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    focusFirstInvalidField() {
        if (this.nameField.classList.contains('error')) {
            this.nameField.focus();
        } else if (this.emailField.classList.contains('error')) {
            this.emailField.focus();
        } else if (this.messageField.classList.contains('error')) {
            this.messageField.focus();
        }
    }
    
    submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission delay
        setTimeout(() => {
            // Hide loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Show success message
            this.showSuccessMessage();
            
            // Clear form
            this.clearForm();
            
        }, 1500);
    }
    
    showSuccessMessage() {
        this.successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.hideSuccessMessage();
        }, 5000);
    }
    
    hideSuccessMessage() {
        this.successMessage.classList.remove('show');
    }
    
    handleReset(e) {
        e.preventDefault();
        
        // Confirm reset
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            this.clearForm();
            this.hideSuccessMessage();
        }
    }
    
    clearForm() {
        // Reset form fields
        this.form.reset();
        
        // Clear all error states
        this.clearError('name');
        this.clearError('email');
        this.clearError('message');
        
        // Remove valid classes
        this.nameField.classList.remove('valid');
        this.emailField.classList.remove('valid');
        this.messageField.classList.remove('valid');
        
        // Focus on first field
        this.nameField.focus();
    }
}

// Enhanced form features
class FormEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        // Character counter for message field
        this.addCharacterCounter();
        
        // Accessibility improvements
        this.improveAccessibility();
        
        // Keyboard navigation
        this.addKeyboardNavigation();
    }
    
    addCharacterCounter() {
        const messageField = document.getElementById('message');
        const messageGroup = messageField.parentElement;
        
        // Create character counter element
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.innerHTML = '<span id="charCount">0</span>/1000 characters';
        
        // Add styles
        counter.style.fontSize = '12px';
        counter.style.color = '#666';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        
        messageGroup.appendChild(counter);
        
        // Update counter on input
        messageField.addEventListener('input', () => {
            const count = messageField.value.length;
            const counterElement = document.getElementById('charCount');
            counterElement.textContent = count;
            
            // Change color based on character count
            if (count > 900) {
                counter.style.color = '#e74c3c';
            } else if (count > 750) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#666';
            }
        });
    }
    
    improveAccessibility() {
        // Add ARIA labels and descriptions
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        nameField.setAttribute('aria-describedby', 'nameError');
        emailField.setAttribute('aria-describedby', 'emailError');
        messageField.setAttribute('aria-describedby', 'messageError');
        
        // Add required indicators
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for') !== null) {
                label.setAttribute('aria-required', 'true');
            }
        });
    }
    
    addKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to submit form
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('contactForm').dispatchEvent(new Event('submit'));
            }
            
            // Escape to clear form
            if (e.key === 'Escape') {
                const resetBtn = document.getElementById('resetBtn');
                resetBtn.click();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form validator
    const validator = new ContactFormValidator();
    
    // Initialize form enhancements
    const enhancements = new FormEnhancements();
    
    // Console log for debugging
    console.log('Contact form initialized successfully!');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl/Cmd + Enter: Submit form');
    console.log('- Escape: Reset form');
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactFormValidator, FormEnhancements };
}