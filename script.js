//----Setup the board------------------------- //
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
const camera = "<i class='fas fa-camera-retro' aria-hidden='true'></i>";
const cat = "<i class='fas fa-cat' aria-hidden='true'></i>";
const beer = "<i class='fas fa-beer' aria-hidden='true'></i>";
const bed = "<i class='fas fa-bed' aria-hidden='true'></i>";

let cardArray = shuffleArray(
    [camera,camera,
    cat, cat,
    beer,beer,
    bed,bed,]);

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
card4.onclick = cardClick;
card5.onclick = cardClick;
card6.onclick = cardClick;
card7.onclick = cardClick;
reset.onclick = resetGame;

function cardClick(event) {
    if (timeoutId !=''){
        clearTimeout(timeoutId);
        resetFlippedCards(lastCardPlayed);
    }
    let card = event.target;
    if (cardsRevealed!==2){
        if (!isPlayed(card)){
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
                case "card4":
                    card4.innerHTML = cardArray[4];
                    cardsRevealed++;
                    break;
                case "card5":
                    card5.innerHTML = cardArray[5];
                    cardsRevealed++;
                    break;
                case "card6":
                    card6.innerHTML = cardArray[6];
                    cardsRevealed++;
                    break;
                case "card7":
                    card7.innerHTML = cardArray[7];
                    cardsRevealed++;
                    break;
                }
            if (cardsRevealed==1) {
                cardCompare = card;
            }
            if (cardsRevealed==2 && isMatch(card)) {
                card.style.backgroundColor= 'darkcyan';
                card.style.color='#fafaf9';
                cardCompare.style.color='#fafaf9';
                cardCompare.style.backgroundColor='darkcyan';
                cardCompare = '';
                cardsRevealed = 0;
                clicks++;
            }
            if (cardsRevealed==2 && !isMatch(card)) {
                timeoutId = setTimeout(resetFlippedCards,1000);
                console.log(timeoutId)
                clicks++;;
            } 
            score.innerHTML=clicks;
        }
    }
}

function resetFlippedCards(){
    lastCardPlayed.innerHTML='';
    cardCompare.innerHTML='';
    cardCompare = '';
    cardsRevealed = 0;
    timeoutId = '';
}

function printResults(card){
    console.log(card.innerHTML);
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
    cardsRevealed = 0;
    cardCompare = '';
    clicks = 0;
    lastCardPlayed = '';
    timeoutId = '';
    resetCard(card0);
    resetCard(card1);
    resetCard(card2);
    resetCard(card3);
    resetCard(card4);
    resetCard(card5);
    resetCard(card6);
    resetCard(card7);
    score.innerHTML=clicks;
    shuffleArray(cardArray);
}

function resetCard(card) {
    card.innerHTML='';
    card.style.backgroundColor='';
    card.style.color='darkgrey';
}