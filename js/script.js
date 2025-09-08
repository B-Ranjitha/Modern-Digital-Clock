// DOM Elements
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const formatBtn = document.getElementById('formatBtn');
const themeBtn = document.getElementById('themeBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

// State variables
let is24HourFormat = true;
let currentTheme = 'default';

// Theme backgrounds
const themes = {
    default: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
    dark: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    purple: 'linear-gradient(135deg, #834d9b, #d04ed6)',
    green: 'linear-gradient(135deg, #00b09b, #96c93d)',
    sunset: 'linear-gradient(135deg, #ff5e62, #ff9966)'
};

// Update time function
function updateTime() {
    const now = new Date();
    
    // Format time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    let period = '';
    if (!is24HourFormat) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }
    
    const timeString = is24HourFormat 
        ? `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`
        : `${hours}:${minutes}:${seconds}`;
    
    // Add pulse animation
    timeElement.classList.remove('pulse');
    void timeElement.offsetWidth; // Trigger reflow
    timeElement.classList.add('pulse');
    
    timeElement.innerHTML = timeString + (period ? `<span class="period">${period}</span>` : '');
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Toggle time format
formatBtn.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    formatBtn.innerHTML = is24HourFormat 
        ? '<i class="fas fa-exchange-alt"></i> Switch to 12-hour format' 
        : '<i class="fas fa-exchange-alt"></i> Switch to 24-hour format';
    updateTime();
});

// Change theme
themeBtn.addEventListener('click', () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    currentTheme = themeKeys[nextIndex];
    
    body.style.background = themes[currentTheme];
    
    // Update active theme button
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        }
    });
});

// Theme selector buttons
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentTheme = btn.dataset.theme;
        body.style.background = themes[currentTheme];
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Initial update
updateTime();

// Update time every second
setInterval(updateTime, 1000);

// Add initial animation
window.addEventListener('load', () => {
    timeElement.classList.add('pulse');
});
