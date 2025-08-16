// Preloader functionality
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) {
        console.error('Preloader element not found');
        return;
    }

    // Function to hide preloader
    function hidePreloader() {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }

    // Wait for all content to load
    window.addEventListener('load', () => {
        // Add a minimum loading time for better UX (optional)
        setTimeout(() => {
            hidePreloader();
        }, 1000); // Show preloader for at least 1 second
    });

    // Fallback: Hide preloader after maximum time
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            console.log('Preloader timeout - forcing hide');
            hidePreloader();
        }
    }, 5000); // Maximum 5 seconds
}

// Initialize preloader when DOM is ready
document.addEventListener('DOMContentLoaded', initPreloader);