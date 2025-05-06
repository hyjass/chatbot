// Add these functions to theme.js to make them globally available

// Function to apply theme based on name - available globally
function applyTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'forest':
            setThemeColors('#2c7744', '#4caf50');
            break;
        case 'sunset':
            setThemeColors('#d35400', '#f39c12');
            break;
        case 'royal':
            setThemeColors('#4a235a', '#8e44ad');
            break;
        case 'ocean':
            setThemeColors('#1a5276', '#3498db');
            break;
        case 'midnight':
            setThemeColors('#1c2833', '#566573');
            break;
        default: // default theme
            setThemeColors('#2c3e50', '#3498db');
    }
}

// Function to set CSS variables - available globally
function setThemeColors(primary, secondary) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primary);
    root.style.setProperty('--secondary-color', secondary);
}