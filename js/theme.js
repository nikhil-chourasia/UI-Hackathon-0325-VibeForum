// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span') || themeToggle.lastChild;
    
    // Get saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('morning-theme') ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('morning-theme');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = ' Light Mode';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('morning-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = ' Dark Mode';
            localStorage.setItem('theme', 'dark');
        }
    }
}); 