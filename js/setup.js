
//When document loads
$(document).ready(() => {

    $('#Game_Notifications').hide();

    //Click event listener for Play btn
    $('#Play_Btn').click(() => {
        StartGame();
    });

    //Make pieces in game container square on resize of window
    $(window).on("resize", MakeSquarePieces);

    //Audio Setup
    let Audio = document.querySelector('#myAudio');

    $('#MusicBtns').css({
        top: $('#Play_Btn').position().top + $('#MusicBtns').outerHeight(),
    });

    $('#MusicBtnOn').click(() => {
        Audio.volume = 0.02;
        Audio.play();

        $('#MusicBtnOn').css({
            backgroundColor: '#ff5252',
            border: 'none',
        });

        $('#MusicBtnOff').css({
            backgroundColor: 'transparent',
            border: '2px solid #f7f1e3',
        });
    })

    $('#MusicBtnOff').click(() => {
        Audio.pause();

        $('#MusicBtnOff').css({
            backgroundColor: '#ff5252',
            border: 'none',
        });

        $('#MusicBtnOn').css({
            backgroundColor: 'transparent',
            border: '2px solid #f7f1e3',
        });
    })

});

//Declare Array of objects globally
let Board_Pieces = new Array;

//Needs to set pieces, display board, and reset all values in case of play again option later
function StartGame() {
    
    //Hide Intro and Game Over screen if they are visible
    $('#Intro_Screen').slideUp();
    $('#GameOver_Screen').slideUp();
    $('#Game_Notifications').slideUp();

    //Show game container
    $('#Game_Container').slideDown();
    $('#Game_Container').html('');

    //Reset the board pieces for the setup
    Board_Pieces = [];
    MuskFound_Var = 0;
    Moves_Since_MuskFound = 0;
    Score = 0;
    Moves = 0;
    for (i = 1; i <= 15; ++i) {
        for (j = 1; j <= 15; ++j) {
            let New_Piece = { Row: i, Col: j, Value: "", isPlayer: false };
            Board_Pieces.push(New_Piece);
        }
    }

    //Set the pieces positions and values
    for (let i = 0; i < 5; i++) {
        SetAllPieces(i);
    }

    //Load all the pieces to the screen
    LoadAllPieces(); 

    let BtnWidth = (($(window).width() - $('#Game_Container').width()) / 2) / 2;

    //Moves Music btns
    $('#MusicBtns').css({
        flexDirection: 'column',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: $(window).width() - BtnWidth + 'px',
    }).slideDown();

    //Show home btn
    $('#HomeBtn_Container').slideDown().css({
        left: BtnWidth + 'px',
        display: 'flex',
    });

    $('#HomeButton').click(() => {
        HomeScreen();
    });

    //Start the scoring
    IncrementScore();

    //Only show possible moves
    ValidMoveCheck();

}

function HomeScreen() {
    //Show Intro and Game Over screen if they are visible
    $('#Intro_Screen').slideDown();
    $('#GameOver_Screen').slideUp();
    $('#Game_Notifications').slideUp();

    //Moves Music btns
    $('#MusicBtns').css({
        flexDirection: 'row',
        top: '70%',
        left: '50%',
    });

    //Hide home btn
    $('#HomeBtn_Container').slideUp();

    //Hide game container
    $('#Game_Container').slideUp();
    $('#Game_Container').html('');
}

function SetAllPieces(i) {

    //Initiliaze random col and row values
    let Piece_Value = "";
    let New_Row = Math.floor(Math.random() * 15) + 1;
    let New_Col = Math.floor(Math.random() * 15) + 1;

    //Make sure position at new row and col arent filled with a piece
    while (Board_Pieces[(New_Row * New_Col) + ((New_Row - 1) * (15 - New_Col) - 1)].Value != "" && !(Board_Pieces[(New_Row * New_Col) + ((New_Row - 1) * (15 - New_Col) - 1)].isPlayer)) {
        New_Row = Math.floor(Math.random() * 15) + 1;
        New_Col = Math.floor(Math.random() * 15) + 1;
    }

    //Set piece value based on for loop calling setpieces
    switch (i) {
        case 0:
            Piece_Value = "Roadster";
            break;
        case 1:
            Piece_Value = "Pinto";
            break;
        case 2:
            Piece_Value = "Civic";
            break;
        case 3:
            Piece_Value = "Musk";
            break;
        case 4:
            Piece_Value = "Player";
            break;
        default:
            break;
    }

    //Set the value
    if (Piece_Value == "Player") {
        Board_Pieces[(New_Row * New_Col) + ((New_Row - 1) * (15 - New_Col) - 1)].isPlayer = true;
    } else {
        Board_Pieces[(New_Row * New_Col) + ((New_Row - 1) * (15 - New_Col) - 1)].Value = Piece_Value;
    }

}

function MakeSquarePieces() {
    //Make the pieces square and centered
    let height = $('#Game_Container').height();
    $('#Game_Container').width(height);

    $('#Game_Container').css({
        margin: (($(window).height() - height) / 2) + 'px ' + 'auto',
    });

    $('#Game_Notifications').css({
        top: (($(window).height() - height) / 2) / 2 + 'px',
    });
}

function LoadAllPieces() {

    //Create all the pieces and assign the ones with value special properties
    Board_Pieces.forEach((Piece, index) => {
        let NewElm = document.createElement('Div');
        NewElm.classList.add(index);
        NewElm.classList.add("Piece");

        $('#Game_Container').append(NewElm);
    });

    MakeSquarePieces();

}

