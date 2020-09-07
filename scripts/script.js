// Define possible card values
const camera = "<i class='fas fa-camera-retro' aria-hidden='true'></i>";
const cat = "<i class='fas fa-cat' aria-hidden='true'></i>";
const beer = "<i class='fas fa-beer' aria-hidden='true'></i>";
const bed = "<i class='fas fa-bed' aria-hidden='true'></i>";
const skull = "<i class='fas fa-skull-crossbones' aria-hidden='true'></i>";
const leaf = "<i class='fas fa-leaf' aria-hidden='true'></i>";

let cardValues =[camera,camera,cat,cat,beer,beer,bed,bed, skull, skull, leaf, leaf];

const modal = document.getElementById('winModal');
const reset = document.getElementById('reset');
const submit = document.getElementById('submit');
reset.onclick = resetBoard;

//create individual cards
function createCard(value){

    //create DOM element
    let domCard = document.createElement('div');
    domCard.className="card";
    let card = 
    {
        value: value,
        isPlayed: false,
        domElement: domCard,
        playCard(){
            if(!this.isPlayed){
                domCard.innerHTML = card.value;
                this.isPlayed= true;
            }
        },
        matchCard(){
            domCard.style.backgroundColor= 'darkcyan';
            domCard.style.color='#fafaf9';   
        },
        resetCard(){
            domCard.style.backgroundColor="";
            domCard.style.color="";
            domCard.innerHTML="";
            this.isPlayed= false;
        }
    }
    domCard.onmouseover = () => {
        if (!card.isPlayed){
        domCard.style.cursor = 'pointer';
        domCard.style.transform ='scale(1.1)';    
        }
    }
    domCard.onmouseout = () => {
        domCard.style.cursor = '';
        domCard.style.transform ='';  
    }
    return card;
}

//create a deck from the card values
function createGame(cardValues) {
    let firstCard= "";
    let secondCard= "";
    let timeoutId= "";
    let tries= 0;
    let deck= [];
    let matches= 0;
    
    function createDeck(cardValue) {
        for(i = 0; i < cardValues.length; i++){
            let card = createCard(cardValues[i], i);
            let domCard = card.domElement;
            domCard.onclick = () => {
                if (!card.isPlayed){
                    if (timeoutId){
                        clearTimeout(timeoutId);
                        resetPlayedCards();
                    }
                    card.playCard();
                    if (!firstCard){
                        firstCard= card; 
                    } else {
                        secondCard= card;
                        matchCards();
                    }
                }
            }
            deck.push(card);
        }
    }

    function matchCards() {
        tries++
        if (firstCard.value == secondCard.value){
            firstCard.matchCard();
            secondCard.matchCard();
            firstCard='';
            secondCard='';
            matches++;
            if (matches == deck.length/2){
                modal.style.display = "block";
            }
        } else {
            timeoutId = setTimeout(resetPlayedCards,1500)
        }
    }

    function resetPlayedCards() {
        firstCard.resetCard();
        secondCard.resetCard();
        firstCard='';
        secondCard='';
        timeoutId='';
    }

    submit.onclick = submitScore;

    function submitScore(){
        event.preventDefault();
        if(winnerName.value){
            localStorage.setItem('name', winnerName.value);
            localStorage.setItem('score',tries);
            location.href = "./scores.html";
        }
    }

    createDeck(cardValues);
    return deck; 


}

//display gameboard
function createBoard(cardValues){
    let deck = createGame(cardValues);
    shuffle(deck);
    let gameboard = document.getElementById('gameboard');
    for(i = 0; i < deck.length; i++){
        gameboard.append(deck[i].domElement);
    }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function resetBoard(){
    let gameboard = document.getElementById('gameboard');
    while(gameboard.firstChild){
        gameboard.removeChild(gameboard.firstChild);
    }    
    createBoard(cardValues);
}


createBoard(cardValues);