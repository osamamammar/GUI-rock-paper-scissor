// player buttons
const playerButtons = document.querySelectorAll('.player__button');
// const playerButtonsContainer = document.querySelector('.player-choices');

// choice display icon
const playerChoice = document.querySelector('.user__icon');
const computerChoice = document.querySelector('.computer__icon');

// Score display
const playerScoreDisplay = document.querySelector('.player__score__score');
const computerScoreDisplay = document.querySelector('.computer__score__score');

// result of round
const resultOfRound = document.querySelector('.result__title');

// play again button
const playAgain = document.querySelector('.play_again');

// change gamearea
const gameAreaStepOne = document.querySelector('.step_one');
const gameAreaStepTwo = document.querySelector('.step_two');

// appear result of round
const resultAppear = document.querySelector('.result');

// computer and user picked icon border and shadow
const computerPicked = document.querySelector('.computer__picked');
const userPicked = document.querySelector('.user__picked');

// btn rules display
const btnRules = document.querySelector('.btn__rules');

// overlay
const layerOverlay = document.querySelector('.layer--overlay');
const overlay = document.querySelector('.overlay');
const overlayCard = document.querySelector('.overlay__card');
const overlayClose = document.querySelector('.overlay__close');
// ===============================================================

// initial score
let playerScore = 0;
let computerScore = 0;
let playerSelection;
let computerSelection;
let numOfRound = 5;
// ===============================================================

// function for computer to play random choice
function computerPlay() {
	let choices = ['rock', 'paper', 'scissor'];
	return choices[Math.floor(Math.random() * choices.length)];
}

// function to play the first round of the game
function playGame() {
	playerButtons.forEach((button) =>
		button.addEventListener('click', (e) => {
			//get player selection
			if (e.target.tagName === 'IMG') {
				playerSelection = e.target.parentElement.getAttribute('data-choice');
			} else {
				playerSelection = e.target.dataset.choice;
			}

			//get computer selection
			computerSelection = computerPlay();

			//call function play round to decision who won and update score and save return value
			let roundResult = playRound(playerSelection, computerSelection);

			// after player selection change game area from step one to step two
			gameAreaStepOne.classList.add('hide');
			gameAreaStepTwo.classList.remove('hide');

			// appear result
			resultAppear.classList.remove('hide');

			// display choice image for player and computer
			playerChoice.setAttribute('src', `./images/icon-${playerSelection}.svg`);
			computerChoice.classList.remove('hide');
			computerPicked.classList.remove('computer__picked--empty');
			computerPicked.classList.add(`computer__picked--${computerSelection}`);
			computerChoice.setAttribute('src', `./images/icon-${computerSelection}.svg`);
			userPicked.classList.add(`user__picked--${playerSelection}`);

			// display round result
			resultOfRound.textContent = roundResult;

			// check if score is 5 to end the game
			if (playerScore >= numOfRound) {
				resultOfRound.textContent = '🥳congrats! you won';
				endGame();
			}
			if (computerScore >= numOfRound) {
				resultOfRound.textContent = '😵Loser! Game Over';
				endGame();
			}
		})
	);
}
// call function
playGame();

// function to decision who won and update score value
function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return 'Tie!';
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissor') ||
		(playerSelection === 'scissor' && computerSelection === 'rock')
	) {
		// increase computerscore
		computerScore++;
		// display computer score
		computerScoreDisplay.textContent = computerScore;
		return `You Lose!`;
	} else if (
		(playerSelection === 'rock' && computerSelection === 'scissor') ||
		(playerSelection === 'paper' && computerSelection === 'rock') ||
		(playerSelection === 'scissor' && computerSelection === 'paper')
	) {
		// increase playerscore
		playerScore++;
		// display player score
		playerScoreDisplay.textContent = playerScore;
		return 'You Win!';
	}
}

// event listener onclick to play again button
playAgain.addEventListener('click', playerPlayAgain);

// event listener onclick to display rules
btnRules.addEventListener('click', displayRules);

// event listener onclick to close overlay
overlayClose.addEventListener('click', closeOverlay);

// function to change game area and play again
function playerPlayAgain() {
	gameAreaStepTwo.classList.add('hide');
	resultAppear.classList.add('hide');
	resultOfRound.textContent = '';
	gameAreaStepOne.classList.remove('hide');
	playerChoice.setAttribute('src', ``);
	computerChoice.classList.add('hide');
	computerPicked.classList.add('computer__picked--empty');
	computerPicked.classList.remove(`computer__picked--${computerSelection}`);
	computerChoice.setAttribute('src', ``);
	userPicked.classList.remove(`user__picked--${playerSelection}`);
}

// function to display rules
function displayRules() {
	layerOverlay.classList.add('container--overlay');
	overlay.classList.remove('hide');
	overlayCard.classList.remove('overlay__card--toggle');
}

// function to close overlay
function closeOverlay() {
	overlayCard.classList.add('overlay__card--toggle');
	overlay.classList.add('hide');
	layerOverlay.classList.remove('container--overlay');
}

// function to endgame
function endGame() {
	// change text of play again button
	playAgain.textContent = 'RESET GAME';

	// reset the game
	playAgain.addEventListener('click', startNewGame);
}

// function to start new game
function startNewGame() {
	// document.location.reload();
	// reset scores
	playerScore = 0;
	computerScore = 0;
	// display reseted value
	playerScoreDisplay.textContent = playerScore;
	computerScoreDisplay.textContent = computerScore;

	// reset the dom to the initial values
	playAgain.textContent = 'PLAY AGAIN';
	gameAreaStepTwo.classList.add('hide');
	resultAppear.classList.add('hide');
	resultOfRound.textContent = '';
	gameAreaStepOne.classList.remove('hide');
	playerChoice.setAttribute('src', ``);
	computerChoice.classList.add('hide');
	computerPicked.classList.add('computer__picked--empty');
	computerPicked.classList.remove(`computer__picked--${computerSelection}`);
	computerChoice.setAttribute('src', ``);
	userPicked.classList.remove(`user__picked--${playerSelection}`);
}
