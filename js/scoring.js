let MuskFound_Var = 0;
let Moves_Since_MuskFound = 0;
let Game_Notification_Timeout;
let Score = 0;
let Score_Interval;

function IncrementScore() {

    Score_Interval = setInterval(() => {
        ++Score;
    }, 1000);

}

function MuskFound() {
    ++MuskFound_Var;

    if (MuskFound_Var == 1) {
        $('#Game_Notifications').html('<h4>Mr. Musk is awake! Find the Roadster quick!</h4>').slideDown();

        Game_Notification_Timeout = setTimeout(() => {
            $('#Game_Notifications').slideUp();
        }, 3000);
    }

    if (MuskFound_Var == 2) {
        GameOver('Lost');
    }
}

function RoadsterFound() {

    let Roadster_Piece = Board_Pieces.find((Piece, index) => {
        if (Piece.Value == "Roadster") {
            return true;
        }
    });

    let Player_Piece = Board_Pieces.find((Piece, index) => {
        if (Piece.isPlayer) {
            return true;
        }
    });

    if ((Roadster_Piece.Row == Player_Piece.Row) && (Roadster_Piece.Col == Player_Piece.Col)) {
        GameOver('Won');
    }

}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function GameOver(inputString) {

    clearInterval(Score_Interval);

    //Clear music and go back btns
    //Moves Music btns
    $('#MusicBtns').slideUp();

    //Hide home btn
    $('#HomeBtn_Container').slideUp();

    //clear the notification timeout
    $('#Game_Notifications').slideUp();
    clearTimeout(Game_Notification_Timeout);

    //removes events from previous valid moves
    await setTimeout(() => {
        $('.Piece').off();
        $('.ValidMove').off();
    }, 10)

    //Show where all the pieces are on screen
    ShowAllPieces();

    await delay(3000);

    //Display the ending message and prompt for game to start again
    if (inputString == 'Lost') {
        $('#Game_Container').slideUp();
        $('#GameOver_Screen').html('<h4>Game Over! You are Rocket Man!</h4>' + '<button id="PlayAgainBtn">Play Again!</button>').slideDown();
    } else if (inputString == 'Won') {
        $('#Game_Container').slideUp();
        let Stats = "<p>You completed the mission in " + Score + " seconds, and only took " + Moves + " moves to find the roadster!</p>";
        $('#GameOver_Screen').html('<h4>Congrats! You won! The roadster is safe!</h4>' + Stats + '<button id="PlayAgainBtn">Play Again!</button>').slideDown();
    } else if (inputString == 'Wrong Car') {
        $('#Game_Container').slideUp();
        $('#GameOver_Screen').html(`<h4>Game Over!</h4><p>You can't enter that car! Mr. Musk is awake!</p>` + '<button id="PlayAgainBtn">Play Again!</button>').slideDown();
    }
    

    $('#PlayAgainBtn').on('click', () => {

        Board_Pieces.find((Piece, index) => {
            if (Piece.isPlayer) {
                $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Player");
            }
        });

        StartGame();
    });
}

function ShowAllPieces() {

    Board_Pieces.find((Piece, index) => {
        if (Piece.Value != "") {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass(Piece.Value);

            switch (Piece.Value) {
                case "Roadster":
                    $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>R</h4>');
                    break;
                case "Pinto":
                    $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>P</h4>');
                    break;
                case "Civic":
                    $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>C</h4>');
                    break;
                case "Musk":
                    $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>M</h4>');
                    break;
                default:
                    break;
            }
        }
    });

}