const progress = document.getElementById('progress');
const countdown = document.getElementById('countdown');
const daysElem = document.getElementById('days');
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const progressMessage = document.getElementById('progress-message');
const quoteElem = document.getElementById('quote-countdown');

const flightDate = new Date('2025-01-06T16:50:00'); 
const arrivalDate = new Date('2025-01-06T18:55:00'); 
const journeyDuration = arrivalDate - flightDate;
let journeyStarted = false;


const quotes = [
  "Bangalore is waiting for you with open arms. 🌟",
  "Every journey is a step toward greatness. 💪",
  "Fly high and reach your dreams! ✈️✨",
  "You’ve got this! Safe journey and happy vibes. 🌈",
  "Wherever you go, adventure awaits! 🌍",
  "The skies are your canvas today. Paint them with joy. 🎨",
  "New places, new memories. Bangalore is calling! 🏙️",
  "Every mile brings you closer to new beginnings. 💕",
  "Fly confidently and embrace the journey ahead. 🌟",
  "A safe journey to a wonderful destination. 💖"
];


function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}


function assignRandomQuotes() {
  quoteElem.textContent = getRandomQuote();
}


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
    progressMessage.textContent = "Your journey has started! Enjoy the flight. ✈️";
    startJourneyProgress();
  }
}


function startJourneyProgress() {
  const journeyStartTime = flightDate.getTime();

  function updateProgress() {
    const now = new Date().getTime();
    const elapsed = now - journeyStartTime;
    const progressPercentage = Math.min((elapsed / journeyDuration) * 100, 100);

   
    progress.style.width = `${progressPercentage}%`;

    if (progressPercentage >= 100) {
      progressMessage.textContent = "Welcome to Bangalore! Enjoy your stay. 🌟";
      clearInterval(progressInterval);
    }
  }

  const progressInterval = setInterval(updateProgress, 1000);
}


const audioUrls = [
  'audio1.mp3' 
];

function logEvent(message) {
  const timestamp = new Date().toISOString();
  console.log(`[LOG - ${timestamp}] ${message}`);
}


function startBackgroundAudio() {
  const audioUrl = audioUrls[0];
  logEvent(`Selected audio: ${audioUrl}`);

  const audioPlayer = document.createElement('audio');
  audioPlayer.src = audioUrl;
  audioPlayer.loop = true;
  audioPlayer.volume = 0.5;
  audioPlayer.autoplay = true;
  audioPlayer.currentTime = 5; // Start playing from 5 seconds
  document.body.appendChild(audioPlayer);

  // Log events
  audioPlayer.addEventListener('play', () => logEvent('Audio playback started.'));
  audioPlayer.addEventListener('pause', () => logEvent('Audio playback paused.'));
  audioPlayer.addEventListener('ended', () => logEvent('Audio playback ended.'));
  audioPlayer.addEventListener('error', () => logEvent('Error during audio playback.'));
}



window.onload = function () {
  assignRandomQuotes();
  startBackgroundAudio();
  updateCountdown();
  setInterval(updateCountdown, 1000);
};
