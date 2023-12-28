// implement blackjack rules
var dealerPoints = document.getElementById("dealer-points");
var playerPoints = document.getElementById("player-points");
var dealerCards = document.getElementById("dealer-cards");
var playerCards = document.getElementById("player-cards");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");
var resetButton = document.getElementById("reset-button");
var dealButton = document.getElementById("deal-button");
var dealerScore = 0;
var playerScore = 0;
var dealerHand = [];
var playerHand = [];
var deck = [];
deck = shuffleDeck();
dealerHand.push(deck.pop());
playerHand.push(deck.pop());
dealerHand.push(deck.pop());
playerHand.push(deck.pop());
dealerCards.innerHTML = dealerHand.join(" ");
playerCards.innerHTML = playerHand.join(" ");
dealerScore = calculatePoints(dealerHand);
playerScore = calculatePoints(playerHand);
dealerPoints.innerHTML = dealerScore.toString();
playerPoints.innerHTML = playerScore.toString();
function calculatePoints(hand) {
    var score = 0;
    var hasAce = false;
    for (var i = 0; i < hand.length; i++) {
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
    }
    else if (card.charAt(0) == "J" || card.charAt(0) == "Q" || card.charAt(0) == "K") {
        return 10;
    }
    else {
        return parseInt(card.charAt(0));
    }
}
function shuffleDeck() {
    var deck = [];
    var suits = ["H", "D", "C", "S"];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 2; j <= 10; j++) {
            deck.push(j + suits[i]);
        }
        deck.push("J" + suits[i]);
        deck.push("Q" + suits[i]);
        deck.push("K" + suits[i]);
        deck.push("A" + suits[i]);
    }
    for (var i = 0; i < 1000; i++) {
        var card1 = Math.floor(Math.random() * deck.length);
        var card2 = Math.floor(Math.random() * deck.length);
        var tmp = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tmp;
    }
    return deck;
}
function hit() {
    playerHand.push(deck.pop());
    playerCards.innerHTML = playerHand.join(" ");
    playerScore = calculatePoints(playerHand);
    playerPoints.innerHTML = playerScore.toString();
    if (playerScore > 21) {
        alert("You lose!");
        reset();
    }
}
function stand() {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerCards.innerHTML = dealerHand.join(" ");
        dealerScore = calculatePoints(dealerHand);
        dealerPoints.innerHTML = dealerScore.toString();
    }
    if (dealerScore > 21 || dealerScore < playerScore) {
        alert("You win!");
        reset();
    }
    else if (dealerScore > playerScore) {
        alert("You lose!");
        reset();
    }
    else {
        alert("It's a tie!");
        reset();
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
    dealerPoints.innerHTML = dealerScore.toString();
    playerPoints.innerHTML = playerScore.toString();
}
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);
dealButton.addEventListener("click", reset);
