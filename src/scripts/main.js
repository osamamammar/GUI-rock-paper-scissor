// initial score
let playerScore = 0;
let computerScore = 0;

// computer random choice
function computerPlay() {
	let choices = ['rock', 'paper', 'scissor'];
	return choices[Math.floor(Math.random() * choices.length)];
}

// return player input in lowercase
function playerInput() {
	return prompt('write rock or paper or scissor', '')?.toLowerCase();
}

// play round
function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return 'Tie! Repeat to break the tie';
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissor') ||
		(playerSelection === 'scissor' && computerSelection === 'rock')
	) {
		// increase computerscore
		computerScore++;
		return `You Lose!`;
	} else if (
		(playerSelection === 'rock' && computerSelection === 'scissors') ||
		(playerSelection === 'paper' && computerSelection === 'rock') ||
		(playerSelection === 'scissor' && computerSelection === 'paper')
	) {
		// increase playerscore
		playerScore++;
		return 'You Win!';
	} else {
		return 'Invalid input! Please try again';
	}
}

// number of game rounds
function game(round = 5) {
	for (let i = 0; ; i++) {
		// calling functions playerInput and computerPlay and save it in variables
		const playerSelection = playerInput();
		const computerSelection = computerPlay();

		// handle cancel button on prompt message
		if (playerSelection == null) {
			return;
		}

		// log function playRound
		console.log(playRound(playerSelection, computerSelection));

		// log scores
		console.log(`Your score: ${playerScore}\nComputer score: ${computerScore}\n`);

		// end game rounds condition
		if (computerScore === round || playerScore === round) {
			console.log('game end');
			break;
		}
	}
	//  log winner
	console.log(gameWinner());
}

// the winner of the game
function gameWinner() {
	return playerScore > computerScore ? 'player won the game' : 'computer won the game';
}

// calling function to start the game
game();
