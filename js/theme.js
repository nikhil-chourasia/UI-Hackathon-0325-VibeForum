// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    // Get the current theme from localStorage or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the initial theme
    applyTheme(currentTheme);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        // Toggle between dark and light themes
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply the new theme
        applyTheme(currentTheme);
        
        // Save the theme preference to localStorage
        localStorage.setItem('theme', currentTheme);
    });
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('morning-theme');
            themeIcon.src = 'assets/icons/moon.svg';
            themeText.textContent = 'Dark Mode';
        } else {
            document.body.classList.add('morning-theme');
            themeIcon.src = 'assets/icons/sun.svg';
            themeText.textContent = 'Light Mode';
        }
    }
}); 