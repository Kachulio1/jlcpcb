// JavaScript for CNC Plotter Project site

document.addEventListener('DOMContentLoaded', function() {
  // Setup mobile navigation toggle if needed in the future
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Update CNAME for correct custom domain
  fetch('CNAME')
    .then(response => response.text())
    .then(domain => {
      console.log('This site is configured for domain:', domain.trim());
    })
    .catch(error => {
      console.error('Error loading CNAME file:', error);
    });
});

// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add fade-in animation for sections when they come into view
window.addEventListener('scroll', function() {
  document.querySelectorAll('section').forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('visible');
    }
  });
});
