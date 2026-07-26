// Initialize game state variables
let targetScore = parseFloat(localStorage.getItem('clicker_score')) || 0;
let displayedScore = targetScore; // Used for smooth visual counting
let autoClickers = parseInt(localStorage.getItem('clicker_autos')) || 0;
let autoCost = parseInt(localStorage.getItem('clicker_cost')) || 10;
// Base income per tick starts at 1 coin, scales up 25% per auto clicker bought
let incomePerTick = parseFloat(localStorage.getItem('clicker_income')) || 1;

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
        let difference = targetScore - displayedScore;
        let step = Math.ceil(difference / 5); 
        displayedScore += step;
        scoreEl.textContent = Math.floor(displayedScore);
    } else if (displayedScore > targetScore) {
        displayedScore = targetScore;
        scoreEl.textContent = Math.floor(displayedScore);
    }
    requestAnimationFrame(animateScore);
}

// Update static UI elements
function updateUI() {
    // Shows estimated coins added per second (running 10 ticks per second)
    let cps = autoClickers > 0 ? (incomePerTick * 10).toFixed(1) : 0;
    cpsEl.textContent = cps;
    autoCostEl.textContent = autoCost;
}

// Click the main button (Manual Click gives 50 coins)
clickBtn.addEventListener('click', () => {
    targetScore += 50;
    saveData();
});

// Buy Auto Clicker
buyAutoBtn.addEventListener('click', () => {
    if (targetScore >= autoCost) {
        targetScore -= autoCost;
        displayedScore = targetScore; 
        
        autoClickers += 1;
        // Boosts the coin payout amount by 25% with every purchase!
        incomePerTick = incomePerTick * 1.25; 
        
        // Standard cost increase so you can keep buying them
        autoCost = Math.floor(autoCost * 1.5); 
        
        saveData();
    } else {
        alert("Not enough coins!");
    }
});

// High-speed tick (Runs every 100 milliseconds)
setInterval(() => {
    if (autoClickers > 0) {
        targetScore += incomePerTick; // Adds your boosted income value!
        saveData();
    }
}, 100);

// Save to localStorage
function saveData() {
    localStorage.setItem('clicker_score', targetScore);
    localStorage.setItem('clicker_autos', autoClickers);
    localStorage.setItem('clicker_cost', autoCost);
    localStorage.setItem('clicker_income', incomePerTick);
    updateUI();
}

// Reset Game
resetBtn.addEventListener('click', () => {
    localStorage.clear();
    targetScore = 0;
    displayedScore = 0;
    autoClickers = 0;
    autoCost = 10;
    incomePerTick = 1;
    saveData();
});

// Start loops
updateUI();
animateScore();
