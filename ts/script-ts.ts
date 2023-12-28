// implement blackjack rules
const dealerPoints: HTMLElement = document.getElementById("dealer-points")!;
const playerPoints: HTMLElement = document.getElementById("player-points")!;
const dealerCards: HTMLElement = document.getElementById("dealer-cards")!;
const playerCards: HTMLElement = document.getElementById("player-cards")!;
const hitButton: HTMLElement = document.getElementById("hit-button")!;
const standButton: HTMLElement = document.getElementById("stand-button")!;
const resetButton: HTMLElement = document.getElementById("reset-button")!;
const dealButton: HTMLElement = document.getElementById("deal-button")!;
let dealerScore: number = 0;
let playerScore: number = 0;
let dealerHand: string[] = [];
let playerHand: string[] = [];
let deck: string[] = [];
deck = shuffleDeck();
dealerHand.push(deck.pop()!);
playerHand.push(deck.pop()!);
dealerHand.push(deck.pop()!);
playerHand.push(deck.pop()!);
dealerCards.innerHTML = dealerHand.join(" ");
playerCards.innerHTML = playerHand.join(" ");
dealerScore = calculatePoints(dealerHand);
playerScore = calculatePoints(playerHand);
dealerPoints.innerHTML = dealerScore.toString();
playerPoints.innerHTML = playerScore.toString();

function calculatePoints(hand: string[]): number {
    let score: number = 0;
    let hasAce: boolean = false;
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

function getCardPoints(card: string): number {
    if (card.charAt(0) == "A") {
        return 1;
    } else if (card.charAt(0) == "J" || card.charAt(0) == "Q" || card.charAt(0) == "K") {
        return 10;
    } else {
        return parseInt(card.charAt(0));
    }
}

function shuffleDeck(): string[] {
    let deck: string[] = [];
    let suits: string[] = ["H", "D", "C", "S"];
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
        let card1: number = Math.floor(Math.random() * deck.length);
        let card2: number = Math.floor(Math.random() * deck.length);
        let tmp: string = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tmp;
    }
    return deck;
}

function hit() {
    playerHand.push(deck.pop()!);
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
        dealerHand.push(deck.pop()!);
        dealerCards.innerHTML = dealerHand.join(" ");
        dealerScore = calculatePoints(dealerHand);
        dealerPoints.innerHTML = dealerScore.toString();
    }
    if (dealerScore > 21 || dealerScore < playerScore) {
        alert("You win!");
        reset();

    } else if (dealerScore > playerScore) {
        alert("You lose!");
        reset();

    } else {
        alert("It's a tie!");
        reset();

    }
}

function reset() {
    dealerHand = [];
    playerHand = [];
    deck = [];
    deck = shuffleDeck();
    dealerHand.push(deck.pop()!);
    playerHand.push(deck.pop()!);
    dealerHand.push(deck.pop()!);
    playerHand.push(deck.pop()!);
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
