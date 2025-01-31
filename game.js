let cards = [];
let matches = 0;
let cardFirst = null;
let cardSecond = null;

function startGame() {
  // Reset control variables
  cards = [];
  matches = 0;
  cardFirst = null;
  cardSecond = null;
  // Reset the UI
  matchDisplay.innerText = `Matches: ${matches}`;
  cardContainer.innerHTML = ``;
  //Gemerate cards
  generateCards()
  // Shuffle the cards
  shuffleCards(cards);
  // Render the cards to the browser
  renderCards(cards);
}

// Generate X number of card pairs (4 for testing)
function generateCards() {
  let colors = ["White", "Blue", "Black", "Red", "Green"]
  // Reset the card Array
  cards = [];
  let i = 0;
  // Add 4 pairs to the Array
  while (i < 4) {
    // Choose card color
    let chooseColor = Math.floor(Math.random() * colors.length)
    // Assign values to card
    let card = {
      id: i,
      color: colors[chooseColor],
      flipped: false
    };
    // Add two of that card to the array
    cards.push(card, card);
    // Remove the chosen color from the array to prevent duplication
    colors.splice(chooseColor, 1);
    // Increment counter
    i++;
  }
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
  }
}

// Render the cards to the browser
function renderCards(cards) {
  // Reset the card display and ID values
  let id = 0;
  cardContainer.innerHTML = ``;
  // Iterate the cards array
  for (i in cards) {
    // Create each card
    let cardElement = document.createElement('div');
    // Assign its classes
    cardElement.classList.add(cards[i].color, 'card', 'col-3', 'not-flipped');
    // Assign its ID
    cardElement.setAttribute('id', id);
    // Assign its color. later this will be an image
    cardElement.innerText = `${cards[i].color}`;
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
    setTimeout(() => checkMatch(cardFirst, cardSecond), 1500);
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
  } 
  // if they don't match
    else {
    // Flip them face down again
    cardOne.classList.remove('flipped', 'bold');
    cardTwo.classList.remove('flipped', 'bold');
    cardOne.classList.add('not-flipped');
    cardTwo.classList.add('not-flipped');
    // Log for testing
    console.log(`Cards Do Not Match`);
  }
  // Reset chosen cards
  cardFirst = null;
  cardSecond = null;
  // Log for testing
  console.log(`Cards Reset: ${cardFirst} , ${cardSecond}`);
}