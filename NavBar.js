// Enhanced navigation highlighting
function highlightActiveNavItem() {
    // Get current page path and normalize it
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop() || 'homepage.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    
    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove("active"));
    
    // Find and highlight the matching link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').toLowerCase();
        const linkPage = linkHref.split('/').pop();
        
        // Multiple matching conditions
        const matches = [
            currentPage === linkPage,
            currentPath.endsWith(linkHref),
            currentPath.endsWith(linkHref.replace('.html', '')),
            (currentPage === '' && linkPage === 'homepage.html'),
            (currentPage === 'index.html' && linkPage === 'homepage.html'),
            (currentPath === '/' && linkPage === 'homepage.html')
        ];
        
        if (matches.some(match => match)) {
            link.classList.add("active");
            console.log('Matched:', linkHref, 'for current path:', currentPath);
        }
    });
}

// Initialize highlighting
function initNavHighlighting() {
    // Run immediately if navbar exists
    if (document.querySelector('nav ul')) {
        highlightActiveNavItem();
    }
    
    // Set up observer for dynamically loaded navbars
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        const observer = new MutationObserver(function(mutations) {
            if (document.querySelector('nav ul')) {
                highlightActiveNavItem();
            }
        });
        
        observer.observe(navbarContainer, {
            childList: true,
            subtree: true
        });
    }
}

// Start the highlighting system
if (document.readyState === 'complete') {
    initNavHighlighting();
} else {
    document.addEventListener('DOMContentLoaded', initNavHighlighting);
    window.addEventListener('load', initNavHighlighting);
}

// Debugging helper
console.log('Navigation Debug:');
console.log('Current URL:', window.location.href);
console.log('Current path:', window.location.pathname);
document.querySelectorAll("nav ul li a").forEach(link => {
    console.log('Nav link:', link.getAttribute('href'), 'Normalized:', 
               link.getAttribute('href').toLowerCase().split('/').pop());
});