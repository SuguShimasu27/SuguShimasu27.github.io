// Initialize game state variables
let score = parseInt(localStorage.getItem('clicker_score')) || 0;
let autoClickers = parseInt(localStorage.getItem('clicker_autos')) || 0;
let autoCost = parseInt(localStorage.getItem('clicker_cost')) || 2;

// Get UI Elements
const scoreEl = document.getElementById('score');
const cpsEl = document.getElementById('cps');
const autoCostEl = document.getElementById('auto-cost');
const clickBtn = document.getElementById('click-btn');
const buyAutoBtn = document.getElementById('buy-auto');
const resetBtn = document.getElementById('reset-btn');

// Update UI on load
function updateUI() {
    scoreEl.textContent = score;
    cpsEl.textContent = autoClickers;
    autoCostEl.textContent = autoCost;
}

// Click the main button
clickBtn.addEventListener('click', () => {
    score += 50;
    saveAndRender();
});

// Buy Auto Clicker
buyAutoBtn.addEventListener('click', () => {
    if (score >= autoCost) {
        score -= autoCost;
        autoClickers += 1;
        autoCost = Math.floor(autoCost * 1.1); // Increase cost for next one
        saveAndRender();
    } else {
        alert("Not enough coins!");
    }
});

// Auto-clicker loop (runs every second)
setInterval(() => {
    if (autoClickers > 0) {
        score += autoClickers * 10; 
        saveAndRender();
    }
}, 100);

// Save to localStorage
function saveAndRender() {
    localStorage.setItem('clicker_score', score);
    localStorage.setItem('clicker_autos', autoClickers);
    localStorage.setItem('clicker_cost', autoCost);
    updateUI();
}

// Reset Game
resetBtn.addEventListener('click', () => {
    localStorage.clear();
    score = 0;
    autoClickers = 0;
    autoCost = 10;
    updateUI();
});

// Initial UI sync
updateUI();
