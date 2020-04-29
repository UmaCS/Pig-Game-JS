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
const diceDom = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

let scores, roundScore, activePlayer, gamePlaying;

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	diceDom.style.display = 'none';

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
	diceDom.style.display = 'none';
}
init();
btnRoll.addEventListener('click', () => {
	if (gamePlaying) {
		//Generating random number up to 6.
		let dice = Math.floor(Math.random() * 6) + 1;

		diceDom.style.display = 'block';
		diceDom.src = 'dice-' + dice + '.png';
		//
		if (dice !== 1) {
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}

});

btnHold.addEventListener('click', () => {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		if (scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			diceDom.style.display = 'none';
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