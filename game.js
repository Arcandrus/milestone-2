let cards = [];

function startGame() {
  generateCards()
}

function generateCards() {
  let colors = ["White", "Blue", "Black", "Red", "Green"]
  // Reset the card Array
  let cards = [];
  let i = 0;
  // Add 4 pairs to the Array
  while (i < 4) {
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
  // Set all cards to face down
  for (i in cards) {
    cards[i].flipped = false;
  }
  shuffleCards(cards);
  renderCards(cards);
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
  }
}

function renderCards(cards) {
  cardContainer.innerHTML = ``;
  for (i in cards) {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('id', cards[i].id);
    cardElement.innerText = `${cards[i].color}`;
    cardElement.onclick = () => flipCard(cardElement, cards);
    cardContainer.appendChild(cardElement);
  }
}