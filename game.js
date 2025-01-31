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
  // Reset the card display
  cardContainer.innerHTML = ``;
  // Iterate the cards array
  for (i in cards) {
    // Create each card
    let cardElement = document.createElement('div');
    // Assign its classes
    cardElement.classList.add('card', 'col-3', 'not-flipped');
    // Assign its ID
    cardElement.setAttribute('id', cards[i].id);
    // Assign its color
    cardElement.innerText = `${cards[i].color}`;
    // Add onClick function for flipping
    cardElement.onclick = () => flipCard(cardElement);
    // Display the element within the cardContainer
    cardContainer.appendChild(cardElement);
  }
}

function flipCard(e) {
  // Log for testing
  console.log(e);

  // If the card has already been matched
  if (e.classList.contains('matched')) {
    exit;
  }
  // If the clicked card is face-down (not-flipped)
  if (e.classList.contains('not-flipped')) {
    // Flip it face-up
    e.classList.add('bold', 'flipped');
    e.classList.remove('not-flipped');
    // Assign its div ID as the value we check
    if (cardFirst == null) {
      cardFirst = e.id;
    } else if (cardSecond == null) {
      cardSecond = e.id;
    }
  }
  // If we have selected 2 cards
  if (cardFirst != null && cardSecond != null) {
    // Call checkMatch
    console.log(`Cards Chosen: ${cardFirst}, ${cardSecond}`);
    checkMatch(cardFirst, cardSecond);
  }
}