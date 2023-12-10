console.log("serverside")
/** 
 * Application State
 * */

// History object of Player guesses
// player guesses are objects in an array
let history = {
  playerOne: [],
  playerTwo: [],
  playerThree: [],
};

// Total number of guesses
let totalGuess = 0;

// Store random number for guessing
let numberToGuess;

// Named Constants for Number Range of random number
const MIN_NUMBER_TO_GUESS = 1;
const MAX_NUMBER_TO_GUESS = 25;


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// This must be added before GET & POST routes.
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
  // set numberToGuess in State
  numberToGuess = generateRandomNumber(); // maybe pull out into onServerLoad function if desired in future
})

app.get('/history', (req, res) => {
  res.send({history, totalGuess});
} )

app.post('/guess', (req, res) => {
  // thanks body parser!
  console.log(req.body);
  totalGuess++;

  // Player one guess generation and storage
  let playerOneGuess = {
    count: totalGuess,
    guess: req.body.playerOneValue,
    answer: req.body.playerOneValue == numberToGuess ? numberToGuess : '?',
    message: generatesMessage(req.body.playerOneValue),
    player: "playerOne"
  }
  history.playerOne.push(playerOneGuess);
  
  // Player two guess generation and storage
  let playerTwoGuess = {
    count: totalGuess,
    guess: req.body.playerTwoValue,
    answer: req.body.playerTwoValue == numberToGuess ? numberToGuess : '?',
    message: generatesMessage(req.body.playerTwoValue),
    player: "playerTwo"
  }
  history.playerTwo.push(playerTwoGuess);
  
  // Player three guess generation and storage
  let playerThreeGuess = {
    count: totalGuess,
    guess: req.body.playerThreeValue,
    answer: req.body.playerThreeValue == numberToGuess ? numberToGuess : '?',
    message: generatesMessage(req.body.playerThreeValue),
    player: "playerThree"
  }
  history.playerThree.push(playerThreeGuess);

  // let data = {playerOneGuess, playerTwoGuess, playerThreeGuess};
  res.status(200);
})


function generateRandomNumber() {
  // gen random num to store in state
  let randomNumber = Math.floor(Math.random() * MAX_NUMBER_TO_GUESS + MIN_NUMBER_TO_GUESS);
  console.log("randomly generated number:", randomNumber);
  return randomNumber;
}

function generatesMessage(guess) {
  console.log("guess:", guess);
  if (guess == numberToGuess) {
    return "You are indeed correct";
  } else if (guess < numberToGuess) {
    return "Aim a little higher";
  } else {
    return "Not that high";
  }
}
