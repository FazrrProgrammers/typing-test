const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing tests are fun and challenging",
  "Practice makes perfect when typing fast",
  "Speed and accuracy are key to typing",
  "Never stop learning and improving"
];

const quoteDisplay = document.getElementById('quote');
const inputField = document.getElementById('input');
const timerText = document.getElementById('timer');
const wpmText = document.getElementById('wpm');
const accuracyText = document.getElementById('accuracy');
const startBtn = document.getElementById('startBtn');

let startTime;
let interval;
let currentQuote = '';

startBtn.addEventListener('click', startTest);

function startTest() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = currentQuote;
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();
  startBtn.disabled = true;

  startTime = new Date();
  interval = setInterval(updateTimer, 1000);
}

inputField.addEventListener('input', () => {
  const elapsedTime = (new Date() - startTime) / 1000 / 60; // minutes
  const typedText = inputField.value;
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsedTime);
  wpmText.textContent = `WPM: ${wpm}`;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentQuote[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / currentQuote.length) * 100);
  accuracyText.textContent = `Accuracy: ${accuracy}%`;

  if (typedText === currentQuote) {
    clearInterval(interval);
    inputField.disabled = true;
    startBtn.disabled = false;
  }
});

function updateTimer() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  timerText.textContent = `Time: ${elapsed}s`;
}
