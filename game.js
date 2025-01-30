let cards = [];

function startGame() {
  let colors = ["White", "Blue", "Black", "Red", "Green"]
  // Reset the card Array
  let cards = [];
  let i = 0;
  // Add 4 cards to the Array
  while (i < 4) {
    let card = {
      id: i,
      color: colors[Math.floor(Math.random() * 4)],
      flipped: false
    };
    cards.push(card);
    i++;
  }
  console.log(`Generated ${cards.length} cards`)
  for (i in cards) {
    console.log(`ID ${cards[i].id}`)
    console.log(`Color ${cards[i].color}`)
  }
}