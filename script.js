// Initialize game state variables
let targetScore = parseInt(localStorage.getItem('clicker_score')) || 0;
let displayedScore = targetScore; // Used for smooth visual counting
let autoClickers = parseInt(localStorage.getItem('clicker_autos')) || 0;
let autoCost = parseInt(localStorage.getItem('clicker_cost')) || 10;

// Get UI Elements
const scoreEl = document.getElementById('score');
const cpsEl = document.getElementById('cps');
const autoCostEl = document.getElementById('auto-cost');
const clickBtn = document.getElementById('click-btn');
const buyAutoBtn = document.getElementById('buy-auto');
const resetBtn = document.getElementById('reset-btn');

// Smooth Rolling Number Animation
function animateScore() {
    if (displayedScore < targetScore) {
        // Calculates a smooth jump based on how far behind the display is
        let difference = targetScore - displayedScore;
        let step = Math.ceil(difference / 5); 
        displayedScore += step;
        scoreEl.textContent = Math.floor(displayedScore);
    } else if (displayedScore > targetScore) {
        // Handles resets smoothly
        displayedScore = targetScore;
        scoreEl.textContent = Math.floor(displayedScore);
    }
    requestAnimationFrame(animateScore);
}

// Update static UI elements
function updateUI() {
    cpsEl.textContent = autoClickers * 10; // Shows current coins per second
    autoCostEl.textContent = autoCost;
}

// Click the main button
clickBtn.addEventListener('click', () => {
    targetScore += 50;
    saveData();
});

// Buy Auto Clicker (Increases cost by 25% each purchase)
buyAutoBtn.addEventListener('click', () => {
    if (targetScore >= autoCost) {
        targetScore -= autoCost;
        displayedScore = targetScore; // Sync display instantly on purchase
        autoClickers += 1;
        
        // Boosts cost by 25% (1.25x)
        autoCost = Math.floor(autoCost * 1.25); 
        
        saveData();
    } else {
        alert("Not enough coins!");
    }
});

// High-speed tick (Runs every 100 milliseconds for fast-paced growth)
setInterval(() => {
    if (autoClickers > 0) {
        targetScore += autoClickers; // Adds coins continuously
        saveData();
    }
}, 100);

// Save to localStorage
function saveData() {
    localStorage.setItem('clicker_score', targetScore);
    localStorage.setItem('clicker_autos', autoClickers);
    localStorage.setItem('clicker_cost', autoCost);
    updateUI();
}

// Reset Game
resetBtn.addEventListener('click', () => {
    localStorage.clear();
    targetScore = 0;
    displayedScore = 0;
    autoClickers = 0;
    autoCost = 10;
    saveData();
});

// Start loops
updateUI();
animateScore();
