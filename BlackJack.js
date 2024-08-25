//1. create deck 
//2. shuffle deck 
//3. enter deposit 
//4. place wager
//5. play game
//deal 2 cards to each only showing one from the dealers hand 
//let the user play out and then reaserch the rules for the dealer 


const prompt = require("prompt-sync")();

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

const createDeck = () => {
    const deck = [];
    for(const suit of SUITS){
        for(const [faceCard, cardNumber] of Object.entries(CARD_VALUE)){
            deck.push({faceCard, suit, cardNumber}); 
        }
    }
    return deck; 
}

const shufflingDeck = (deck) => {
    
    const shuffledDeck = []; 
    while(deck.length > 0){
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
    };

const playGame = (deck) => {
    //return true or false of the player won
    const playerCards = []; 
    const dealerCards = []
    playerCards.push(deck[0], deck[2]); 
    dealerCards.push(deck[1], deck[3]); 
    console.log("Players Cards On the Turn"); 
    console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
    console.log("Dealers cards on the turn "); 
    console.log(dealerCards[0].faceCard + dealerCards[0].suit + "▮"); 
    let playerTotal = playerCards[0].cardNumber + playerCards[1].cardNumber; 

    
        if(playerCards[0].cardNumber === 10){
            if(playerCards[1].faceCard === 'A'){
                console.log("Player BlackJack"); 
                return true; 
            }
        }
        else if(playerCards[0].faceCard === 'A'){
            if(playerCards[1].cardNumber === 10){
                console.log(" YOU WIN Player BlackJack"); 
                return true; 
            }
        }
        else if(dealerCards[0].faceCard === 'A'){
            if(dealerCards[1].cardNumber === 10){
                console.log("YOU LOSE Banker BlackJack"); 
                console.log(dealerCards[0].faceCard + dealerCards[0].suit + dealerCards[1].faceCard + dealerCards[1].suit); 
                return false; 
            }
        }
       else if(dealerCards[0].cardNumber === 10){
            if(dealerCards[1].faceCard === 'A'){
                console.log("YOU LOSE Banker BlackJack"); 
                console.log(dealerCards[0].faceCard + dealerCards[0].suit + dealerCards[1].faceCard + dealerCards[1].suit); 
                return false; 
            }
        }
        else{
            while(true){
                let hitStay = prompt("You have a total of " + playerTotal  + " do you want to HIT (h) or STAY (s): "); 
                let counter = 4; 
                if (hitStay === 's' || hitStay === 'h'){
                    if(hitStay === 'h'){
                        playerCards.push(deck[counter]);
                        playerTotal += deck[counter].cardNumber; 
                        for( let i = 0; i < counter; i++){
                            console.log(playerCards[i].faceCard + playerCards[i].suit + ' ');
                            
                        }
                        counter++; 
                        
                        if(playerTotal > 21){
                            console.log("YOU LOSE"); 
                            return false;
                        }
                        else if (playerTotal === 21){
                            console.log("YOU WIN Player BlackJack"); 
                            return true; 
                        }
                        else{
                            hitStay = prompt("You have a total of " + playerTotal  + " do you want to HIT (h) or STAY (s): "); 
                            playerCards.push(deck[counter]);
                            playerTotal += deck[counter].cardNumber; 
                            for( let i = 0; i < counter; i++){
                                console.log(playerCards[i].faceCard + playerCards[i].suit + ' ');
                                
                            }
                            counter++; 
                            
                        }
        
                    }
                }
                else{
                    console.log("Please enter (h) for hit or (s) for stay"); 
                }
        
            }

           


        }
    
    

    
    return false; 




}

const game = () =>{

    const deck = createDeck(); 
    let balance = prompt("Enter a deposit ammount:  "); 
    let continueToPlay = true; 
    while (balance > 0 && continueToPlay){
        
        console.log("Your Balance is " + balance)
        const shuffleDeck = shufflingDeck(deck); 
        const bet = placeBet(balance); 
        continueToPlay = playGame(shuffleDeck); 


    }
}
game(); 

