document.addEventListener('DOMContentLoaded', function() {
    // Theme selection functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme from localStorage and mark as active
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    themeOptions.forEach(option => {
        if (option.dataset.theme === savedTheme) {
            option.classList.add('active');
        }
        
        // Add click event listeners
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Save to localStorage and apply theme
            localStorage.setItem('selectedTheme', theme);
            
            // Apply theme using the global theme function
            applyTheme(theme);
        });
    });
    
    // Password toggle visibility functionality
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        const toggleBtn = document.createElement('i');
        toggleBtn.classList.add('fas', 'fa-eye', 'toggle-password');
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(toggleBtn);
        
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.right = '15px';
        toggleBtn.style.top = '50%';
        toggleBtn.style.transform = 'translateY(-50%)';
        toggleBtn.style.color = '#999';
        toggleBtn.style.cursor = 'pointer';
        
        toggleBtn.addEventListener('click', function() {
            if (field.type === 'password') {
                field.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                field.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Form submission handlers
    const forms = document.querySelectorAll('.settings-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to the server
            // For demonstration, we'll just show an alert
            alert('Settings saved successfully!');
        });
    });
});