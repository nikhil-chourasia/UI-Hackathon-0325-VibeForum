// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'morning') {
        body.classList.add('morning-theme');
        themeIcon.src = 'sun.svg';
    } else {
        themeIcon.src = 'moon.svg';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('morning-theme');
        
        // Update icon and save preference
        if (body.classList.contains('morning-theme')) {
            themeIcon.src = 'sun.svg';
            localStorage.setItem('theme', 'morning');
        } else {
            themeIcon.src = 'moon.svg';
            localStorage.setItem('theme', 'night');
        }
    });
}); 