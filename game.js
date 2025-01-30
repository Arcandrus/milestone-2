let cards = [];

function startGame() {
  let colors = ["White", "Blue", "Black", "Red", "Green"]
  // Reset the card Array
  let cards = [];
  let i = 0;

  // Add 4 cards to the Array
  while (i < 4) {
    let chooseColor = Math.floor(Math.random() * colors.length)
    let card = {
      id: i,
      color: colors[chooseColor],
      flipped: false
    };
    cards.push(card);
    colors.splice(chooseColor, 1);
    i++;
  }

  console.log(`Generated ${cards.length} cards`)
  for (i in cards) {
    console.log(`ID ${cards[i].id}`)
    console.log(`Color ${cards[i].color}`)
  }
}