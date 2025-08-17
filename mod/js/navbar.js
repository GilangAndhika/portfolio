// Function to change navbar style when reaching the 'other' section
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const otherSection = document.querySelector('.other');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    // Burger menu toggle
    if (burger && menu) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('open');
        });

        // Optional: close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
            });
        });
    }

    console.log('Navbar:', navbar);
    console.log('Other section:', otherSection);
    
    if (!navbar || !otherSection) {
        console.error('Navbar or other section not found');
        return;
    }

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Section intersecting:', entry.isIntersecting);
            if (entry.isIntersecting) {
                // When 'other' section is visible, change navbar to dark theme
                console.log('Adding navbar-dark class');
                navbar.classList.add('navbar-dark');
            } else {
                // When 'other' section is not visible, use default theme
                console.log('Removing navbar-dark class');
                navbar.classList.remove('navbar-dark');
            }
        });
    }, {
        // Trigger when the section is 10% visible
        threshold: 0.1,
        // Adjust root margin to trigger when section enters viewport
        rootMargin: '0px 0px -60% 0px'
    });

    // Start observing the other section
    observer.observe(otherSection);
    console.log('Observer set up successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavbarScroll);