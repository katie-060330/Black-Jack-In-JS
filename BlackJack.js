//1. create deck 
//2. shuffle deck 
//3. enter deposit 
//4. place wager
//5. play game
//deal 2 cards to each only showing one from the dealers hand 
//let the user play out and then reaserch the rules for the dealer 


const prompt = require("prompt-sync")();
let push; 
let isPlayer21; 

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

//create the deck 
const createDeck = () => {
    const deck = [];
    for(const suit of SUITS){
        for(const [faceCard, cardNumber] of Object.entries(CARD_VALUE)){
            deck.push({faceCard, suit, cardNumber}); 
        }
    }
    return deck; 
}


//shuffle the existing deck, this is done multiple times wiht thte same deck 
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

const playGame = (deck, bet, balance) => {
    //return true or false of the player won
    
    //and array fro the dealers and the players cards 
    const playerCards = []; 
    const dealerCards = []; 
    playerCards.push(deck[0], deck[2]); 
    dealerCards.push(deck[1], deck[3]); 

    //show 3/4 of the cards 
    console.log("Players Cards On the Turn"); 
    console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
    console.log("Dealers cards on the turn "); 
    console.log(dealerCards[0].faceCard + dealerCards[0].suit + "▮"); 
    console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
     let playerTotal = playerCards[0].cardNumber + playerCards[1].cardNumber; 
    let dealerTotal = dealerCards[0].cardNumber + dealerCards[1].cardNumber; 

    //player cards represents the two cards the playe has after the inital turn and same for dealer cards 
    //playerTotal and dealerTotal carry the physical total of the number 

    //first we check if the playe has 21 if this is true then the player automatically wins 

    //we should have a function add card to total, this way we can reuse the ficion for both plyer and dealer

    //these are the 3 black jack cases after the first inital cards 
    if(playerTotal == 21 && dealerTotal == 21){
        push = true; 
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealers Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Push: Both Black Jack');
        return contiueToPlay(balance);
    }

    else if (playerTotal == 21 && dealerTotal != 21){
        console.log('Player Black Jack');
        
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealers Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Push: Both Black Jack');
        balance += 1.5* bet; 
        return contiueToPlay(balance);

    }
    else if (dealerTotal == 21 &&  playerTotal!= 21){
        
        console.log('Dealer Black Jack');
        
        console.log('Player Cards');
        console.log(playerCards[0].faceCard + playerCards[0].suit + ' ' + playerCards[1].faceCard + playerCards[1].suit);
        console.log('Dealers Cards');
        console.log(dealerCards[0].faceCard + dealerCards[0].suit + ' ' + dealerCards[1].faceCard + dealerCards[1].suit);
        console.log('Push: Both Black Jack');
        balance -=  bet; 
        return contiueToPlay(balance);

    

    }
    //if no black jack cases are met then the game will go into this section
    else{
        //we need to get into the spesific cases
        let hit = playerDecisioin(playerTotal);
        if(hit){
            //player hits 
            return false; 
        }
        //else we stay and let the dealer play out
        else{
            return false; 

        }
        

    }
 
        }  


       
       



const game = () =>{

    const deck = createDeck(); 
    let balance = parseFloat(prompt("Enter a deposit amount: "));
    let continueToPlay = true; 

    while (continueToPlay){
        
        console.log("Your Balance is " + balance)
        const shuffleDeck = shufflingDeck(deck); 
        const bet = placeBet(balance); 
        continueToPlay = playGame(shuffleDeck, bet, balance); 


    }
}
game(); 


//input to contiue to play the game 

const contiueToPlay = (balance) =>{
    if(balance <= 0){
        console.log('you dont have enough money to play again Game end');
        return false; 
    }
    else{
        while(true){
            let yesNo = prompt("Play again? yes(y) or no(n): "); 
            yesNo = yesNo.toLowerCase(); 
            if( yesNo !== 'y' && yesNo !== 'n'){
                console.log('Please Enter y/n');
            }
            else if (yesNo === 'y'){
                return true; 
            }
            else{
                return false; 
            }

        }

    }


}

const playerDecisioin = (playerTotal) => {
    while (true) {
        let input = prompt(`Hit (h) or stay (s) at ${playerTotal}: `);
        input = input.toLowerCase(); 
        if (input !== 'h' && input !== 's') {
            console.log('Please enter h/s: ');
        } else if (input === 'h') {
            return true; 
        } else {
            return false; 
        }
    }
}








