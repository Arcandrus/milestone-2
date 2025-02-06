// Initialise variables
let cards = [];
let matches = 0;
let cardFirst = null;
let cardSecond = null;
let level = 'easy';
let pairs = 4;
let timerInterval;
let timeCount = 0;
let score = 0;
let colorblind = 0;
let difficulty;
const cardContainer = document.getElementById('cardContainer');
const timerDisplay = document.getElementById('timerDisplay');
const matchDisplay = document.getElementById('matchDisplay');
const winCheck = document.getElementById('winDisplay');

// Start the game
function startGame(gameMode) {
  // Reset control variables
  cards = [];
  matches = 0;
  cardFirst = null;
  cardSecond = null;
  timeCount = 0;
  score = 0;
  cardContainer.style.pointerEvents = 'auto';
  // Reset the UI
  timerDisplay.innerText = `Time: ${timeCount}s`;
  matchDisplay.innerText = `Matches: ${matches}`;
  cardContainer.innerHTML = ``;
  winCheck.innerText = ``;
  // Define card count by difficulty
  switch (gameMode) {
    case 'easy':
      pairs = 4;
      break;
    case 'medium':
      pairs = 6;
      break;
    case 'hard':
      pairs = 8;
      break;
  }
  //Gemerate cards
  generateCards(pairs);
  // Shuffle the cards
  shuffleCards(cards);
  // Render the cards to the browser
  renderCards(cards);
  // Start the timer
  timerControl();
  difficulty = gameMode;
}

// Generate X number of card pairs
function generateCards(pairs) {
  let colors = [
    "white",
    "blue",
    "black",
    "red",
    "green",
    "selesnya",
    "orzhov",
    "boros",
    "azorius",
    "dimir",
    "rakdos",
    "golgari",
    "izzet",
    "simic",
    "gruul"];
  // Reset the card Array
  cards = [];
  let i = 0;
  // Add chosen amount of pairs pairs to the Array
  while (i < pairs) {
    // Choose card color
    let chooseColor = Math.floor(Math.random() * colors.length);
    // Assign values to card
    let card = {
      id: i,
      color: colors[chooseColor],
    };
    // Add two of that card to the array
    cards.push(card, card);
    // Remove the chosen color from the array to prevent duplication
    colors.splice(chooseColor, 1);
    // Increment counter
    i++;
  }
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
  }
}

// Render the cards to the browser
function renderCards() {
  // Reset the card display and ID values
  let id = 0;
  cardContainer.innerHTML = ``;
  // Iterate the cards array
  for (var i in cards) {
    // Create each card
    let cardElement = document.createElement('div');
    // Assign its classes
    cardElement.classList.add(cards[i].color, 'card', 'not-flipped');
    // Assign its ID
    cardElement.setAttribute('id', id);
    // Add onClick function for flipping
    cardElement.onclick = () => flipCard(cardElement);
    // Display the element within the cardContainer
    cardContainer.appendChild(cardElement);
    // Increment the ID counter
    id++;
  }
}

function flipCard(e) {
  // Get the color name as a string with the first letter capitalised for colorblind mode
  color = e.classList[0].charAt(0).toUpperCase() + e.classList[0].slice(1);
  // If the card has already been matched or flipped
  if (e.classList.contains('matched') || (e.classList.contains('flipped'))) {
    return;
  }
  // If the clicked card is face-down (not-flipped)
  if (e.classList.contains('not-flipped')) {
    // Flip it face-up
    e.classList.add('flipped');
    // Colorblind Check
    if (colorblind == 0) {
      // If colorblind mode is not active, draw images
      e.innerHTML = `<img src="assets/images/${e.classList[0]}.png" width="90%">`;
    } else {
      // If colorblind mode is active, use image and text
      e.innerHTML = `<img src="assets/images/${e.classList[0]}.png" width="80%"><div>${color}</div>`;
    }
    e.classList.remove('not-flipped');
    // Assign its div color attribute as the value we check
    if (cardFirst == null) {
      cardFirst = e.id;
    } else if (cardSecond == null) {
      cardSecond = e.id;
    }
  }
  // If we have selected 2 cards
  if (cardFirst !== null && cardSecond !== null) {
    // Call checkMatch
    checkMatch(cardFirst, cardSecond);
  }
}

// Check if the chosen cards match
function checkMatch(checkFirst, checkSecond) {
  // Find the card divs we are comparing
  cardOne = document.getElementById(checkFirst);
  cardTwo = document.getElementById(checkSecond);
  // If they match
  if (cardOne.classList[0] == cardTwo.classList[0]) {
    // Mark the cards as matched
    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');
    // Incriment the match counter
    matches++;
    matchDisplay.innerText = `Matches: ${matches}`;
    checkWin();
  }

  // if they don't match
  else {
    // Disable mouse clicks until the delay has passed
    cardContainer.style.pointerEvents = 'none';
    // Flip them face down again
    setTimeout(() => {
      cardOne.classList.remove('flipped');
      cardTwo.classList.remove('flipped');
      cardOne.classList.add('not-flipped');
      cardTwo.classList.add('not-flipped');
      cardOne.innerText = ``;
      cardTwo.innerText = ``;
      // Re-enable card clicks
      cardContainer.style.pointerEvents = 'auto';
    }, 1000);
  }

  // Reset chosen cards
  cardFirst = null;
  cardSecond = null;
}

// Check if game is won
function checkWin() {
  // If the matched cards were not the last pair
  if (matches != pairs) {
    // Do nothing
    winCheck.innerText = ``;
  }
  // If the matched cards were the last pair 
  else {
    // Disable furthur clicks on the game space
    cardContainer.style.pointerEvents = 'none';
    // Display win message
    score = Math.ceil((matches * 100) / timeCount);
    winCheck.innerHTML = `<h1>You Win!</h1>Score: ${score}`;
    submitScore(score, difficulty);
    stopTimer();
  }
}

//Timer control
function timerControl() {
  // Start the timer only if not already running
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeCount++;
      // Update display
      timerDisplay.innerHTML = `Time: ${timeCount}s`;
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Colorblind Checkbox
function colorblindMode() {
  checkbox = document.getElementById('colorblind');
  easyCb = document.getElementById('startEasy');
  mediumCb = document.getElementById('startMedium');
  hardCb = document.getElementById('startHard');
  scoresCb = document.getElementById('highScoreButton');
  // If the checkbox is checked
  if (checkbox.checked) {
    // Enable Colorblind mode
    colorblind = 1;
    easyCb.classList.add('cb');
    mediumCb.classList.add('cb');
    hardCb.classList.add('cb');
    scoresCb.classList.add('cb');
    // Otherwise
  } else {
    // Disable Colorblind mode
    colorblind = 0;
    easyCb.classList.remove('cb');
    mediumCb.classList.remove('cb');
    hardCb.classList.remove('cb');
    scoresCb.classList.remove('cb');
  }
}

// Score saving
function submitScore(score, difficulty) {
  // Capitalise the first character of the difficulty variable for display
  difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  // Open modal to enter name
  saveHighScore = new bootstrap.Modal(document.getElementById('saveHighScore'));
  scoreToSave = document.getElementById('scoreToSave');
  // Display score in modal
  scoreToSave.innerHTML = `On ${difficulty}, you scored <strong>${score}</strong>`;
  saveHighScore.show();
}

// Save High scores
function saveScore(fName, score, difficulty) {
  // Close the Modal
  saveHighScore.hide();

  switch (difficulty) {
    case 'easy':
      if (localStorage.getItem('scoreEasy') > score) {
        return;
      }
      localStorage.setItem('fNameEasy', fName);
      localStorage.setItem('scoreEasy', score);
      localStorage.setItem('diffEasy', difficulty);
      break;
    case 'medium':
      if (localStorage.getItem('scoreMedium') > score) {
        return;
      }
      localStorage.setItem('fNameMed', fName);
      localStorage.setItem('scoreMed', score);
      localStorage.setItem('diffMed', difficulty);
      break;
    case 'hard':
      if (localStorage.getItem('scoreHard') > score) {
        return;
      }
      localStorage.setItem('fNameHard', fName);
      localStorage.setItem('scoreHard', score);
      localStorage.setItem('diffHard', difficulty);
      break;
  }
}

// Display High Scores
function displayHighScore() {
  // Open Modal
  highScore = new bootstrap.Modal(document.getElementById('displayHighScore'));
  highScore.show();
  let easyHighScoreDisplay = document.getElementById('easyHighScores');
  let mediumHighScoreDisplay = document.getElementById('mediumHighScores');
  let hardHighScoreDisplay = document.getElementById('hardHighScores');
  // Clear old information
  easyHighScoreDisplay.innerHTML = ``;
  mediumHighScoreDisplay.innerHTML = ``;
  hardHighScoreDisplay.innerHTML = ``;
  // If no scores are saved
  if (!localStorage.length > 0) {
    return;
    // Otherwise
  } else
    // Find easy high score and display
    if (localStorage.getItem('diffEasy')) {
      let easyScoreElement = document.createElement('div');
      easyScoreElement.innerText = `${localStorage.getItem('scoreEasy')} set by ${localStorage.getItem('fNameEasy')}`;
      easyHighScoreDisplay.appendChild(easyScoreElement);
    }
  // Find medium high score and display
  if (localStorage.getItem('diffMed')) {
    let mediumScoreElement = document.createElement('div');
    mediumScoreElement.innerText = `${localStorage.getItem('scoreMed')} set by ${localStorage.getItem('fNameMed')}`;
    mediumHighScoreDisplay.appendChild(mediumScoreElement);
  }
  // Find hard high score and display
  if (localStorage.getItem('diffHard')) {
    let hardScoreElement = document.createElement('div');
    hardScoreElement.innerText = `${localStorage.getItem('scoreHard')} set by ${localStorage.getItem('fNameHard')}`;
    hardHighScoreDisplay.appendChild(hardScoreElement);
  }
}