const prompt = require("prompt-sync")();
let push; 
let isPlayer21; 
let counter = 4; 
let balance = 0; 

const CARD_VALUE = {
    "A": 11,
    "K": 10,
    "Q": 10,
    "J": 10,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2  
}

const SUITS = ["♥️", "♦️", "♣️", "♠️"];

// Create the deck 
const createDeck = () => {
    const deck = [];
    for (const suit of SUITS) {
        for (const [faceCard, cardNumber] of Object.entries(CARD_VALUE)) {
            deck.push({ faceCard, suit, cardNumber }); 
        }
    }
    return deck; 
}

// Shuffle the existing deck
const shufflingDeck = (deck) => {
    const shuffledDeck = []; 
    while (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length); 
        const toAdd = deck[randomIndex]; 
        deck.splice(randomIndex, 1); 
        shuffledDeck.push(toAdd); 
    }
    return shuffledDeck; 
}

const placeBet = (userBalance) => {
    while (true) {
        const input = prompt("Enter your bet: ");
        const userInput = parseFloat(input);
        if (isNaN(userInput) || userInput <= 0 || userInput > userBalance) {
            console.log("This bet is invalid");
        } else {
            return userInput;
        }
    }
}

const playGame = (deck, bet, balance) => {
    // Return true or false if the player won
    
    // Arrays for dealer's and player's cards
    let playerCards = []; 
    let dealerCards = []; 
    playerCards.push(deck[0], deck[2]); 
    dealerCards.push(deck[1], deck[3]); 

    // Show 3/4 of the cards
    console.log("Player's Cards On the Turn"); 
    console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
    console.log("Dealer's cards on the turn"); 
    console.log(dealerCards[0].faceCard + dealerCards[0].suit + "▮"); 
    console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);

    let playerTotal = playerCards[0].cardNumber + playerCards[1].cardNumber; 
    let dealerTotal = dealerCards[0].cardNumber + dealerCards[1].cardNumber; 

    // Check for blackjack cases
    if (playerTotal == 21 && dealerTotal == 21) {
        push = true; 
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealer Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Push: Both Blackjack');
        return continueToPlay(balance);
    } else if (playerTotal == 21 && dealerTotal != 21) {
      
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealer Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Player Blackjack Player wins!');
        balance += 1.5 * bet; 
        return continueToPlay(balance);
    } else if (dealerTotal == 21 && playerTotal != 21) {
       
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealer Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Dealer Blackjack Dealer wins!');
        balance -= bet; 
        return continueToPlay(balance);
    } else {
        //counter keeps track of where the new card needs to be dreawn from
        
        let hit = playerDecision(playerTotal);
        if (hit) {
            // Player hits
            //return array with updated array and updated player total
            while(hit){
                let temp = addCard(playerCards, playerTotal, counter, deck); 
                playerTotal = temp[0];
                playerCards = temp[1]; 
                counter++; 
                showCards(playerCards); 
                if(playerTotal>21){
                    console.log('Player Bust');
                    return false; 

                }
                hit = playerDecision(playerTotal);
                

            }
           

        } 
            // Player stays, let dealer play out
            while(dealerTotal <= 16){
                let tmp = addCard(dealerCards, dealerTotal, counter, deck); 
                counter++;
                dealerTotal = tmp[0]; 
                dealerCards = tmp[1]; 
                if(dealerTotal >= 17){
                    break; 
                }
               }
               if(dealerTotal> 22){
                console.log('Player Win, dealer bust');
                showCards(playerCards, dealerCards);
                    balance += 2*bet; 

               }
               if(dealerTotal >= 17){
                if(playerTotal > dealerTotal){
                    console.log('Player Win');
                    
                showCards(playerCards, dealerCards);
                    balance += 2*bet; 
                }
                else if (playerTotal === dealerTotal){
                    
                    console.log('Push');
                    
                showCards(playerCards, dealerCards);
                balance += bet
                }
                else{
                    console.log('Player Loses');
                    
                showCards(playerCards, dealerCards);
                    balance-= bet; 
                }
            }
           

        
    }
    
}  

const addCard = (array, total, counter, deck) => {
   
    let updatedArray = [...array, deck[counter]];

    
    return [total + deck[counter].cardNumber, updatedArray];
}

const showCards = (player, dealer) =>{
    console.log('Player cards');
    for(let card of player){
        console.log(card.faceCard + card.suit);
    }
    console.log('Dealer cards');
    for(let card of dealer){
        console.log(card.faceCard + card.suit);
    }

}




const continueToPlay = (balance) => {
    if (balance <= 0) {
        console.log('You don\'t have enough money to play again. Game over.');
        return false; 
    } else {
        while (true) {
            let yesNo = prompt("Play again? yes (y) or no (n): "); 
            yesNo = yesNo.toLowerCase(); 
            if (yesNo !== 'y' && yesNo !== 'n') {
                console.log('Please enter y/n');
            } else if (yesNo === 'y') {
                return false; 
            } else {
                return false; 
            }
        }
    }
}

const playerDecision = (playerTotal) => {
    while (true) {
        let input = prompt(`Hit (h) or stay (s) at ${playerTotal}: `);
        input = input.toLowerCase(); 
        
        if (input !== 'h' && input !== 's') {
            console.log('Please enter h/s: ');
        } else if (input === 'h') {
            return true; 
        } 
        
        else {
            return false; 
        }
    }
}

const game = () => {
    const deck = createDeck(); 
     balance = parseFloat(prompt("Enter a deposit amount: "));
    let continueToPlayGame = true; 

    while (continueToPlayGame) {
        console.log("Your Balance is " + balance);
        const shuffledDeck = shufflingDeck(deck); 
        const bet = placeBet(balance); 
        continueToPlayGame = playGame(shuffledDeck, bet, balance); 
    }
}
game(); 
