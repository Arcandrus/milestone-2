let cards = [];
let matches = 0;
let cardFirst = null;
let cardSecond = null;
let level = 'easy';
let pairs = 4;
let timerInterval;
let timeCount = 0;
let score = 0;
const cardContainer = document.getElementById('cardContainer');
const timerDisplay = document.getElementById('timerDisplay');
const matchDisplay = document.getElementById('matchDisplay');
const winCheck = document.getElementById('winDisplay');

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
  switch (gameMode) {
    default:
      pairs = 4;
      break;
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
  generateCards(pairs)
  // Shuffle the cards
  shuffleCards(cards);
  // Render the cards to the browser
  renderCards(cards);
  // Start the timer
  timerControl();
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
    "gruul"]
  // Reset the card Array
  cards = [];
  let i = 0;
  // Add chosen amount of pairs pairs to the Array
  while (i < pairs) {
    // Choose card color
    let chooseColor = Math.floor(Math.random() * colors.length)
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
  for (i in cards) {
    // Create each card
    let cardElement = document.createElement('div');
    // Assign its classes
    cardElement.classList.add(cards[i].color, 'card', 'not-flipped');
    // Assign its ID
    cardElement.setAttribute('id', id);
    // Assign its color. later this will be an image
    cardElement.innerText = ``;
    // Add onClick function for flipping
    cardElement.onclick = () => flipCard(cardElement);
    // Display the element within the cardContainer
    cardContainer.appendChild(cardElement);
    // Increment the ID counter
    id++;
  }
}

function flipCard(e) {
  // Log for testing
  console.log(e);
  console.log(e.classList[0]);
  console.log(e.id);
  // If the card has already been matched or flipped
  if (e.classList.contains('matched') || (e.classList.contains('flipped'))) {
    return;
  }
  // If the clicked card is face-down (not-flipped)
  if (e.classList.contains('not-flipped')) {
    // Flip it face-up
    e.classList.add('bold', 'flipped');
    e.innerHTML = `<img src="assets/images/${e.classList[0]}.png" width="100%">`;
    e.classList.remove('not-flipped');
    // Assign its div color attribute as the value we check
    if (cardFirst == null) {
      cardFirst = e.id
      console.log(`First Chosen: ${cardFirst}`);
    } else if (cardSecond == null) {
      cardSecond = e.id
      console.log(`Second Chosen: ${cardSecond}`);
    }
  }
  // If we have selected 2 cards
  if (cardFirst !== null && cardSecond !== null) {
    // Call checkMatch
    console.log(`Cards Chosen: ${cardFirst}, ${cardSecond}`);
    checkMatch(cardFirst, cardSecond);
  }
}

// Check if the chosen cards match
function checkMatch(checkFirst, checkSecond) {
  // Log for testing
  console.log(`Cards Checking: ${checkFirst}, ${checkSecond}`);
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
    // Log for testing
    console.log(`Cards Match`);
    checkWin();
  }

  // if they don't match
  else {
    // Disable mouse clicks until the delay has passed
    cardContainer.style.pointerEvents = 'none';
    // Flip them face down again
    setTimeout(() => {
      cardOne.classList.remove('flipped', 'bold');
      cardTwo.classList.remove('flipped', 'bold');
      cardOne.classList.add('not-flipped');
      cardTwo.classList.add('not-flipped');
      cardOne.innerText = ``;
      cardTwo.innerText = ``;
      // Re-enable card clicks
      cardContainer.style.pointerEvents = 'auto';
    }, 1500);
    // Log for testing
    console.log(`Cards Do Not Match`);
  }

  // Reset chosen cards
  cardFirst = null;
  cardSecond = null;
  // Log for testing
  console.log(`Cards Reset: ${cardFirst} , ${cardSecond}`);
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
    winCheck.innerHTML = `You Win!<br>Score: ${score}`;
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