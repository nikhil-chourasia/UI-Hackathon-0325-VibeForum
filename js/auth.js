document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('.auth-form');
    const formInputs = document.querySelectorAll('.form-control');
    const submitButton = document.querySelector('.btn');
    
    // Add focus effects to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Handle form submission
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Get form data
        const formData = new FormData(authForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // Validate form data
            if (!validateForm(data)) {
                throw new Error('Please fill in all required fields correctly.');
            }

            // Determine if this is a login or signup form
            const isLogin = window.location.pathname.includes('login');
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

            // Send authentication request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Authentication failed');
            }

            // Store authentication token
            localStorage.setItem('authToken', result.token);
            
            // Redirect to dashboard
            window.location.href = '/dashboard';

        } catch (error) {
            // Show error message
            showError(error.message);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = isLogin ? 
                '<i class="fas fa-sign-in-alt"></i> Sign In' : 
                '<i class="fas fa-user-plus"></i> Sign Up';
        }
    });

    // Form validation
    function validateForm(data) {
        const isLogin = window.location.pathname.includes('login');
        
        // Basic validation
        if (!data.email || !data.password) {
            return false;
        }

        // Additional validation for signup
        if (!isLogin) {
            if (!data.username || !data.confirmPassword) {
                return false;
            }

            if (data.password !== data.confirmPassword) {
                showError('Passwords do not match');
                return false;
            }

            if (data.password.length < 8) {
                showError('Password must be at least 8 characters long');
                return false;
            }
        }

        return true;
    }

    // Error handling
    function showError(message) {
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and show new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        authForm.insertBefore(errorDiv, authForm.firstChild);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}); 