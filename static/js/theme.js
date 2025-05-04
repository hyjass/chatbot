// This file should be loaded on all pages to maintain theme consistency
document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    applyTheme(savedTheme);
    
    // Function to apply theme based on name
    function applyTheme(theme) {
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
    
    // Function to set CSS variables
    function setThemeColors(primary, secondary) {
        root.style.setProperty('--primary-color', primary);
        root.style.setProperty('--secondary-color', secondary);
    }
});