/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
const player0 = document.querySelector('.player-0-panel');
const player1 = document.querySelector('.player-1-panel');
const dice1Dom = document.querySelector('.dice');
const dice2Dom = document.querySelector('.dice2');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

let scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2;

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	dice1Dom.style.display = 'none';
	dice2Dom.style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
	roundScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	player0.classList.toggle('active'); // classList.toggle() => wheather adds the class or removes
	player1.classList.toggle('active');
	dice1Dom.style.display = 'none';
	dice2Dom.style.display = 'none';
}
init();
btnRoll.addEventListener('click', () => {
	if (gamePlaying) {
		//Generating random number up to 6.
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let dice2 = Math.floor(Math.random() * 6) + 1;

		dice1Dom.style.display = 'block';
		dice1Dom.src = 'dice-' + dice1 + '.png';
		dice2Dom.style.display = 'block';
		dice2Dom.src = 'dice-' + dice2 + '.png';
		//
		if ((dice1 === 6 || dice2 === 6) && (lastDice1 === 6 || lastDice2 === 6)) {
			// console.log('two 6 in a row');
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		} else if (dice1 !== 1 && dice2 !== 1) {
			roundScore += dice1 + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
		lastDice1 = dice1;
		lastDice2 = dice2;
	}

});

btnHold.addEventListener('click', () => {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//undefined, 0, null or "" are COERCED to false
		//Anything else is COERCED to true;
		const finalScore = document.querySelector('.final-score').value;
		let winningScore;
		finalScore ? winningScore = finalScore : winningScore = 20;

		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			dice1Dom.style.display = 'none';
			dice2Dom.style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}

});

btnNew.addEventListener('click', init);






// document.querySelector('#score-' + activePlayer).textContent = dice;