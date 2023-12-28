// implement blackjack rules
dealerPoints = document.getElementById("dealer-points");
playerPoints = document.getElementById("player-points");
dealerCards = document.getElementById("dealer-cards");
playerCards = document.getElementById("player-cards");
hitButton = document.getElementById("hit-button");
standButton = document.getElementById("stand-button");
resetButton = document.getElementById("reset-button");
dealButton = document.getElementById("deal-button");
dealerScore = 0;
playerScore = 0;
dealerHand = [];
playerHand = [];
deck = [];
deck = shuffleDeck();
dealerHand.push(deck.pop());
playerHand.push(deck.pop());
dealerHand.push(deck.pop());
playerHand.push(deck.pop());
dealerCards.innerHTML = dealerHand.join(" ");
playerCards.innerHTML = playerHand.join(" ");
dealerScore = calculatePoints(dealerHand);
playerScore = calculatePoints(playerHand);
dealerPoints.innerHTML = dealerScore;
playerPoints.innerHTML = playerScore;
function calculatePoints(hand) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].charAt(0) == "A") {
      hasAce = true;
    }
    score += getCardPoints(hand[i]);
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}
function getCardPoints(card) {
    if (card.charAt(0) == "A") {
        return 1;
    } else if (card.charAt(0) == "J" || card.charAt(0) == "Q" || card.charAt(0) == "K") {
        return 10;
    } else {
        return parseInt(card.charAt(0));
    }
    }
function shuffleDeck() {
    let deck = [];
    let suits = ["H", "D", "C", "S"];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 2; j <= 10; j++) {
            deck.push(j + suits[i]);
        }
        deck.push("J" + suits[i]);
        deck.push("Q" + suits[i]);
        deck.push("K" + suits[i]);
        deck.push("A" + suits[i]);
    }
    for (let i = 0; i < 1000; i++) {
        let card1 = Math.floor(Math.random() * deck.length);
        let card2 = Math.floor(Math.random() * deck.length);
        let tmp = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tmp;
    }
    return deck;
}
function hit() {
    playerHand.push(deck.pop());
    playerCards.innerHTML = playerHand.join(" ");
    playerScore = calculatePoints(playerHand);
    playerPoints.innerHTML = playerScore;
    if (playerScore > 21) {
        alert("You lose!");
    }
}
function stand() {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerCards.innerHTML = dealerHand.join(" ");
        dealerScore = calculatePoints(dealerHand);
        dealerPoints.innerHTML = dealerScore;
    }
    if (dealerScore > 21 || dealerScore < playerScore) {
        alert("You win!");
    } else if (dealerScore > playerScore) {
        alert("You lose!");
    } else {
        alert("It's a tie!");
    }
}
function reset() {
    dealerHand = [];
    playerHand = [];
    deck = [];
    deck = shuffleDeck();
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerCards.innerHTML = dealerHand.join(" ");
    playerCards.innerHTML = playerHand.join(" ");
    dealerScore = calculatePoints(dealerHand);
    playerScore = calculatePoints(playerHand);
    dealerPoints.innerHTML = dealerScore;
    playerPoints.innerHTML = playerScore;
}

hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);
resetButton.addEventListener("click", reset);
dealButton.addEventListener("click", reset);

