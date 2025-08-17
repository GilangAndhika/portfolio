// Contact Form Popup Functionality
class ContactForm {
    constructor() {
        this.popup = null;
        this.form = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.createPopup();
        this.bindEvents();
    }

    createPopup() {
        // Create popup HTML structure
        const popupHTML = `
            <div class="contact-popup" id="contactPopup">
                <div class="form-container">
                    <button class="close-btn" id="closePopup">&times;</button>
                    <h1>Contact Me</h1>
                    <p>If you have any questions or just want to say hi, feel free to reach out!</p>
                    
                    <div id="formMessage" class="form-message" style="display: none;"></div>
                    
                    <form class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Your Email</label>
                            <input type="email" id="email" name="_replyto" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="_subject" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Your Message</label>
                            <textarea id="message" name="message" required placeholder="Write your message here..."></textarea>
                        </div>
                        
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary" id="submitBtn">
                                Send Message
                            </button>
                            <button type="button" class="btn btn-secondary" id="cancelBtn">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add popup to body
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Get references
        this.popup = document.getElementById('contactPopup');
        this.form = document.getElementById('contactForm');
    }

    bindEvents() {
        // Contact button click event
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPopup();
            });
        }

        // Close button events
        document.getElementById('closePopup').addEventListener('click', () => this.closePopup());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closePopup());
        
        // Close on backdrop click
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.closePopup();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.closePopup();
            }
        });

        // Form submit event
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    openPopup() {
        this.popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 300);
    }

    closePopup() {
        this.popup.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        this.clearForm();
        this.hideMessage();
    }

    async submitForm() {
        if (this.isSubmitting) return;

        this.isSubmitting = true;
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate loading for better UX
        setTimeout(() => {
            // Show alert message
            alert(`🔧 Server Temporarily Inactive

Sorry, our contact server is currently busy or under maintenance.

Please try contacting me through:
📧 Email: andhika.bwn@gmail.com
📱 Instagram: @itsg.lang

Thank you for your understanding!`);

            // Show message in the form as well
            this.showMessage('Server temporarily inactive. Please contact via email (andhika.bwn@gmail.com) or Instagram (@itsg.lang)', 'error');

            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.isSubmitting = false;
        }, 1500); // 1.5 second delay to show loading state
    }

    showMessage(text, type) {
        const messageEl = document.getElementById('formMessage');
        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;
        messageEl.style.display = 'block';
    }

    hideMessage() {
        const messageEl = document.getElementById('formMessage');
        messageEl.style.display = 'none';
    }

    clearForm() {
        this.form.reset();
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});