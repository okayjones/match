//Setup the board
card0 = document.getElementById('card0');
card1 = document.getElementById('card1');
card2 = document.getElementById('card2');
card3 = document.getElementById('card3');
score = document.getElementById('score');
reset = document.getElementById('reset');

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
let cardArray = shuffleArray(['a','b','a','b']);

// ------------------------------------------ //

let cardsRevealed = 0;
let cardCompare = '';
let clicks = 0;
let lastCardPlayed = '';
let timeoutId = '';

card0.onclick = cardClick;
card1.onclick = cardClick;
card2.onclick = cardClick;
card3.onclick = cardClick;
reset.onclick = resetGame;

function cardClick(event) {
    console.log('timeoutid, '+timeoutId)
    if (timeoutId !=''){
        clearTimeout(timeoutId);
        resetCards(lastCardPlayed);
    }
    let card = event.target;
    if (cardsRevealed!==2){
        if (!isPlayed(card)){
            clicks++;
            lastCardPlayed=card;
            switch (card.id) {
                case "card0":
                    card0.innerHTML = cardArray[0];
                    cardsRevealed++;
                    break;
                case "card1":
                    card1.innerHTML = cardArray[1];
                    cardsRevealed++;
                    break;
                case "card2":
                    card2.innerHTML = cardArray[2];
                    cardsRevealed++;
                    break;
                case "card3":
                    card3.innerHTML = cardArray[3];
                    cardsRevealed++;
                    break;
            }
            if (cardsRevealed==1) {
                cardCompare = card;
            }
            if (cardsRevealed==2 && isMatch(card)) {

                cardCompare = '';
                cardsRevealed = 0;
            }
            if (cardsRevealed==2 && !isMatch(card)) {
                timeoutId = setTimeout(resetCards,1000);
                console.log(timeoutId);
            } 
            printResults(card);
            score.innerHTML = clicks; 
        }
    }
}

function resetCards(){
    lastCardPlayed.innerHTML='';
    cardCompare.innerHTML='';
    cardCompare = '';
    cardsRevealed = 0;
    timeoutId= '';
}

function printResults(card){
    console.log(card.innerHTML);
    console.log('cards revealed '+ cardsRevealed);
    console.log('card to compare '+ cardCompare.id+
     ', '+cardCompare.innerHTML);
    console.log('isMatch '+ isMatch(card));
}

function isMatch(card){
    if (cardsRevealed==2){
        return card.innerHTML==cardCompare.innerHTML;        
    } else{
        return false;
    }
}

function isPlayed(card){
    return !card.innerHTML =='';
}


function resetGame(){
    resetCards();
    card0.innerHTML='';
    card1.innerHTML='';
    card2.innerHTML='';
    card3.innerHTML='';
    clicks = 0;
    score.innerHTML = clicks; 
}