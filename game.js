let cards = [];

function startGame() {
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
    cards.push(card);
    cards.push(card);
    // Remove the chosen color from the array to prevent duplication
    colors.splice(chooseColor, 1);
    // Increment counter
    i++;
  }
  // Set all cards to facce down
  for (i in cards) {
    cards[i].flipped = false;
  }
  // Console log for testing
  console.log(`Generated ${cards.length} cards`)
  for (i in cards) {
    console.log(`ID ${cards[i].id}`)
    console.log(`Color ${cards[i].color}`)
  }
}