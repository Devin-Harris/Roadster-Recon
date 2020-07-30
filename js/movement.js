let Moves = 0;

function ValidMoveCheck() {

    //Get Position of player piece
    let Player_Piece = Board_Pieces.find((Piece, index) => {
        if (Piece.isPlayer) {
            return true;
        }
    });

    //Set row and col attributed to variables
    let PlayerRow = Player_Piece.Row;
    let PlayerCol = Player_Piece.Col;

    //If musk has been found once, make sure musk moves everytime
    if (MuskFound_Var > 0) {
        ++Moves_Since_MuskFound;
        if (Moves_Since_MuskFound > 1) {
            MoveMusk();
        }
    }

    Board_Pieces.find((Piece, index) => {

        //Hide all pieces initially
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("ValidMove");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Visible");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Roadster");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Pinto");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Civic");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Musk");
        $('.Piece:nth-child(' + (index + 1) + ')').html('');

        if ((Piece.Row == PlayerRow) && (Piece.Col == PlayerCol)) {
            if (Piece.Value == "") {
                $('.Piece:nth-child(' + (index + 1) + ')').addClass("Player");
            }
            ShowMainPieces(Piece, index);
        }

        //make sure player loses if they enter wrong car while musk is awake
        if ((Piece.Value != "") && (Piece.Value != "Roadster") && (Piece.Row == PlayerRow) && (Piece.Col == PlayerCol) && (MuskFound_Var > 0)) {
            GameOver('Wrong Car');
        }   

        //Show Valid moves around player piece

        //X-direction check
        if ((Piece.Row == PlayerRow) && ((Piece.Col + 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("ValidMove");
            ShowMainPieces(Piece, index);
        }
        if ((Piece.Row == PlayerRow) && ((Piece.Col - 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("ValidMove");
            ShowMainPieces(Piece, index);
        }

        //Y-direction check
        if ((Piece.Row + 1 == PlayerRow) && ((Piece.Col) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("ValidMove");
            ShowMainPieces(Piece, index);
        }
        if ((Piece.Row - 1 == PlayerRow) && ((Piece.Col) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("ValidMove");
            ShowMainPieces(Piece, index);
        }

        //Check Corners to make visible
        if ((Piece.Row - 1 == PlayerRow) && ((Piece.Col - 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("Visible");
            ShowMainPieces(Piece, index);
        }
        if ((Piece.Row - 1 == PlayerRow) && ((Piece.Col + 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("Visible");
            ShowMainPieces(Piece, index);
        }

        if ((Piece.Row + 1 == PlayerRow) && ((Piece.Col - 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("Visible");
            ShowMainPieces(Piece, index);
        }
        if ((Piece.Row + 1 == PlayerRow) && ((Piece.Col + 1) == PlayerCol)) {
            $('.Piece:nth-child(' + (index + 1) + ')').addClass("Visible");
            ShowMainPieces(Piece, index);
        }
        
    });

    //Check if valid move has been clicked
    $('.ValidMove').on('click', (e) => {
        MovePlayer(e);
    });
    
}

function ShowMainPieces(Piece, index) {
    //Give pieces viewable names
    switch (Piece.Value) {
        case "Roadster":
            $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>R</h4>');
            RoadsterFound();
            break;
        case "Pinto":
            $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>P</h4>');
            break;
        case "Civic":
            $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>C</h4>');
            break;
        case "Musk":
            $('.Piece:nth-child(' + (index + 1) + ')').html('<h4>M</h4>');
            MuskFound();
            break;
        default:
            break;
    }

    //sets piece color
    if (Piece.Value != "") {
        $('.Piece:nth-child(' + (index + 1) + ')').addClass(Piece.Value);
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Visible");
    }
    if ((Piece.isPlayer) && (Piece.Value == "")) {
        $('.Piece:nth-child(' + (index + 1) + ')').addClass("Player");
        $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Visible");
    }
}

function MovePlayer(e) {

    ++Moves;

    //removes events from previous valid moves
    $('.ValidMove').off();

    //Where the new player should be
    let New_Player_Index = e.currentTarget.classList[0];

    //Remove old player index properties
    Board_Pieces.find((Piece, index) => {
        if (Piece.isPlayer) {
            Piece.isPlayer = false;
            $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Player");
        }
    });

    //Set new player index properties
    Board_Pieces[New_Player_Index].isPlayer = true;
    ValidMoveCheck();
}

function MoveMusk() {

    //Get Position of player piece
    let Player_Piece = Board_Pieces.find((Piece) => {
        if (Piece.isPlayer) {
            return true;
        }
    });

    //Get Position of musk piece
    let Musk_Piece = Board_Pieces.find((Piece, index) => {
        if (Piece.Value == "Musk") {
            //Remove musk information from old musk position
            Piece.Value = "";
            $('.Piece:nth-child(' + (index + 1) + ')').removeClass("Musk");
            return true;
        }
    });

    //Set initial direction (y or x)
    let Musk_Dir = 3;

    //Make sure musk moves even if first try is unsuccessful
    while (Musk_Dir == 3) {

        //Set initial direction (y or x)
        Musk_Dir = Math.floor(Math.random() * 3);

        //Y direction
        if (Musk_Dir == 0) {
            if (Musk_Piece.Row > Player_Piece.Row) {
                Board_Pieces.find((Piece, index) => {
                    if ((Musk_Piece.Row - 1 == Piece.Row) && (Musk_Piece.Col == Piece.Col) && (Piece.Value == "")) {
                        Piece.Value = "Musk";
                        $('.Piece:nth-child(' + (index + 1) + ')').addClass("Musk");
                    }
                });

            } else if (Musk_Piece.Row < Player_Piece.Row) {
                Board_Pieces.find((Piece, index) => {
                    if ((Musk_Piece.Row + 1 == Piece.Row) && (Musk_Piece.Col == Piece.Col) && (Piece.Value == "")) {
                        Piece.Value = "Musk";
                        $('.Piece:nth-child(' + (index + 1) + ')').addClass("Musk");
                    }
                });

            } else {
                Musk_Dir = 3;
            }
        } else if (Musk_Dir == 1) {
            //X direction
            if (Musk_Piece.Col > Player_Piece.Col) {
                Board_Pieces.find((Piece, index) => {
                    if ((Musk_Piece.Col - 1 == Piece.Col) && (Musk_Piece.Row == Piece.Row) && (Piece.Value == "")) {
                        Piece.Value = "Musk";
                        $('.Piece:nth-child(' + (index + 1) + ')').addClass("Musk");
                    }
                });

            } else if (Musk_Piece.Col < Player_Piece.Col) {
                Board_Pieces.find((Piece, index) => {
                    if ((Musk_Piece.Col + 1 == Piece.Col) && (Musk_Piece.Row == Piece.Row) && (Piece.Value == "")) {
                        Piece.Value = "Musk";
                        $('.Piece:nth-child(' + (index + 1) + ')').addClass("Musk");
                    }
                });

            } else {
                Musk_Dir = 3;
            }
        } else if (Musk_Dir == 2) {
            //sets a percentage of time where musk doesnt move so the player can gain distance away from him
            Musk_Dir = 2;
            Musk_Piece.Value = "Musk";
        }

    }

}