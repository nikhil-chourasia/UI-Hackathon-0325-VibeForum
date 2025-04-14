// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Check if user is already logged in
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

// Handle Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll simulate a successful login
            const mockUser = {
                id: 1,
                username: 'demo_user',
                email: email
            };

            // Store auth token and user data
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('user', JSON.stringify(mockUser));
            
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            showError('Invalid email or password');
        }
    });
}

// Handle Signup
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        try {
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll simulate a successful signup
            const mockUser = {
                id: 1,
                username: username,
                email: email
            };

            // Store auth token and user data
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            showError('Error creating account. Please try again.');
        }
    });
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Check auth status on page load
checkAuthStatus(); 