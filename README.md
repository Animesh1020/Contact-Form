Contact Form with JavaScript Validation
A responsive contact form with comprehensive client-side validation, built using HTML, CSS, and JavaScript.

Features
Core Functionality
Form fields: Name, Email, Message with validation

Real-time validation on blur and form submission

Dynamic error handling with smooth animations

Success message upon valid form submission

Reset functionality with confirmation dialog

Validation Rules
Name: Required, minimum 2 characters, accepts letters, spaces, hyphens, and apostrophes

Email: Required, valid email format using regex

Message: Required, between 10 and 1000 characters

Enhanced Features
Character counter for the message field

ARIA labels and keyboard navigation for accessibility

Fully responsive design

Loading animations during form submission

Keyboard shortcuts: Ctrl+Enter to submit, Escape to reset

Technologies Used
HTML5 for semantic structure

CSS3 for styling and animations

JavaScript (ES6+) for validation and interaction

Regex for email validation

CSS Flexbox and Grid for responsive layouts

File Structure
graphql
Copy
Edit
contact-form/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript validation logic
└── README.md           # Project documentation
Key Concepts Implemented
Form elements and structure

Event handling (submit, reset, blur, input)

DOM manipulation for dynamic updates

Regex-based validation logic

Improved user experience with accessibility and feedback

Testing Checklist
Check empty form submission

Validate incorrect email formats

Validate name with invalid characters

Test message length constraints

Test real-time validation and character counter

Use keyboard shortcuts

Confirm responsive behavior on mobile devices

Future Enhancements
Server-side integration

AJAX-based form submission

File uploads

Multi-step form wizard

Email service integration

Spam protection

Persistent form data

Unit testing

Browser Compatibility
Chrome

Firefox

Safari

Edge

Mobile browsers
