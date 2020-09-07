//get leaderboard from storage, if it doesn't exist grab dummy board
let leaderboardArray = JSON.parse(localStorage.getItem('leaderboard'));


if (!leaderboardArray){//if empty, create dummy leaderboard array
    leaderboardArray = [
        {name:'Dave', score:8},
        {name:'Mark', score:16},
        {name:'Andy', score:32} 
    ];
}

//get new score from local storage, clear score and add to leaderboard
let name = localStorage.getItem('name');
let score = localStorage.getItem('score');
if (name && score){
    leaderboardArray.push({name,score});
    localStorage.removeItem('name');
    localStorage.removeItem('score');
}

//sort the leaderboard array
leaderboardArray.sort(function(a, b){return a.score-b.score});

//update localstorage
localStorage.setItem('leaderboard', JSON.stringify(leaderboardArray));

// display board
function displayBoard(array){
    let boardhtml= "";
    for(i = 0; i < array.length; i++){
        boardhtml +=`<tr><td>${array[i].name}</td><td>${array[i].score}</td></tr>`
    };
    let leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = boardhtml;
}

displayBoard(leaderboardArray);


