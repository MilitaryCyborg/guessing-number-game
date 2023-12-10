/**
 * DOM elements of interest
 */
// guesses rendered on UI in table bodies
let playerOneTB = document.getElementById("playerOneTB");
let playerTwoTB = document.getElementById("playerTwoTB");
let playerThreeTB = document.getElementById("playerThreeTB");

// inputs from players
let playerOneInput = document.getElementById("playerOneInput");
let playerTwoInput = document.getElementById("playerTwoInput");
let playerThreeInput = document.getElementById("playerThreeInput");

// store total number of guesses as textContent
let totalGuessesParagraph = document.getElementById("totalGuessText");

console.log("playerOneTB:", playerOneTB);
console.log("playerTwoTB:", playerTwoTB);
console.log("playerThreeTB:", playerThreeTB);
console.log("playerOneInput:", playerOneInput);
console.log("playerTwoInput:", playerTwoInput);
console.log("playerThreeInput:", playerThreeInput);
console.log(
    "totalGuessesParagraph content:",
    totalGuessesParagraph.textContent
);

function onReady() {
    console.log("JavaScript is loaded!");

    axios({
        method: "GET",
        url: "/history",
    }).then((res) => {
        let history = res.data.history;
        let totalGuess = res.data.totalGuess;

        totalGuess !== "" ? totalGuessesParagraph.innerText = totalGuess : 0;

        //reset dom table body contents
        playerOneTB.innerHTML = "";
        playerTwoTB.innerHTML = "";
        playerThreeTB.innerHTML = "";

        appendsDataToTable(history.playerOne);
        appendsDataToTable(history.playerTwo);
        appendsDataToTable(history.playerThree);
    });

    axios({
      method: "GET",
      url: "/"
    })
}

onReady();

function onSubmitHandler(event) {
    console.log("someone pressed submit!");

    let playerOneValue = playerOneInput.value;
    let playerTwoValue = playerTwoInput.value;
    let playerThreeValue = playerThreeInput.value;
    console.log(
        `Three player inputs: ${playerOneValue} ${playerTwoValue} ${playerThreeValue}`
    );

    axios({
        method: "POST",
        url: "/guess",
        data: {
            playerOneValue,
            playerTwoValue,
            playerThreeValue,
        },
    })
        .then(() => {
            onReady();
        })
        .catch((error) => {
            console.log("server error:", error);
        });
}
console.log("typeof playerOneTB:", playerOneTB.nodeType);
console.log("playerTwoTB:", playerTwoTB);
console.log("playerThreeTB:", playerThreeTB);

// data is guess history array from a player
function appendsDataToTable(historyArray) {
    // [{ count, guess, answer, message, playernum}]

    for (const guess of historyArray) {
        if (guess.player === "playerOne") {
            playerOneTB.innerHTML += `<tr>
                                        <td headers="numberGuessesHeader_P1">${guess.count}</td>
                                        <td headers="guessHeader_P1">${guess.guess}</td>
                                        <td headers="answerHeader_P1">${guess.answer}</td>
                                        <td headers="messageHeader_P1">${guess.message}</td>
                                      </tr>`;
        } else if (guess.player === "playerTwo") {
            playerTwoTB.innerHTML += `<tr>
                                        <td headers="numberGuessesHeader_P2">${guess.count}</td>
                                        <td headers="guessHeader_P2">${guess.guess}</td>
                                        <td headers="answerHeader_P2">${guess.answer}</td>
                                        <td headers="messageHeader_P2">${guess.message}</td>
                                      </tr>`;
        } else if (guess.player === "playerThree") {
            playerThreeTB.innerHTML += `<tr>
                                        <td headers="numberGuessesHeader_P3">${guess.count}</td>
                                        <td headers="guessHeader_P3">${guess.guess}</td>
                                        <td headers="answerHeader_P3">${guess.answer}</td>
                                        <td headers="messageHeader_P3">${guess.message}</td>
                                      </tr>`;
        }
    }
}
