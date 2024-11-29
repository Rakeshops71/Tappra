const progress = document.getElementById('progress');
const countdown = document.getElementById('countdown');
const daysElem = document.getElementById('days');
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const progressMessage = document.getElementById('progress-message');
const flightDate = new Date('2024-12-22T13:45:00');
const journeyDuration = 8 * 60 * 60 * 1000; // Approx. 8 hours in milliseconds

let journeyStarted = false;
// Array of Quotes
const quotes = [
    "No matter the distance, you’ll always be my heart’s destination. ❤️",
    "You’re not just my sister; you’re my forever companion on this adventure. 💕",
    "Every mile is a reminder of how much I cherish you. 🌟",
    "You’re my sunshine on cloudy days, my joy on every journey. 🌈",
    "Sister, you’re the best part of my heart, no distance can change that. 💖",
    "The greatest adventure is the one that brings us closer, sister. 🌍",
    "Sisters are the heart of every journey. ❤️",
    "Even in the farthest distances, you are always with me. 💫",
    "My love for you knows no bounds, no matter where I go. 🛫",
    "You’re my safe place, no matter where life takes us. 🌟"
  ];
  

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  function assignRandomQuotes() {
    document.getElementById("quote-countdown").textContent = getRandomQuote();
    // document.getElementById("quote-progress").textContent = getRandomQuote();
    // document.getElementById("quote-cute").textContent = getRandomQuote();
  }
 
  window.onload = function() {
    assignRandomQuotes();
  };
  
function updateCountdown() {
  const now = new Date();
  const diff = flightDate - now;

  if (diff > 0) {
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysElem.textContent = days.toString().padStart(2, '0');
    hoursElem.textContent = hours.toString().padStart(2, '0');
    minutesElem.textContent = minutes.toString().padStart(2, '0');
    secondsElem.textContent = seconds.toString().padStart(2, '0');
  } else if (!journeyStarted) {
  
    journeyStarted = true;
    progressMessage.textContent = "Your journey has started! 🛫";
    startJourneyProgress();
  }
}

function startJourneyProgress() {
  const journeyStartTime = new Date().getTime();

  function updateProgress() {
    const now = new Date().getTime();
    const elapsed = now - journeyStartTime;
    const progressPercentage = Math.min((elapsed / journeyDuration) * 100, 100);

    progress.style.width = `${progressPercentage}%`;

    if (progressPercentage >= 100) {
      progressMessage.textContent = "You've arrived at Bhubaneswar! 🏡";
      clearInterval(progressInterval);
    }
  }

  const progressInterval = setInterval(updateProgress, 1000);
}

setInterval(updateCountdown, 1000);
updateCountdown();
