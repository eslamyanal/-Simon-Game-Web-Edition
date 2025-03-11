var score = 0;
var gamePattern = [];
var clickedbyuser = [];
var gameStarted = false;

function nextSequence() {
    var randnumber = Math.floor(Math.random() * 4);
    var randcolor = ["blue", "green", "red", "yellow"];
    var randomChosenColour = randcolor[randnumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);

    $("#" + randomChosenColour).addClass("flash");
    setTimeout(function () {
        $("#" + randomChosenColour).removeClass("flash");
    }, 100);

    // Display the current score
    $("h1").text("Score: " + score);
}

$("button").click(function (event) {
    if (!gameStarted) {
        // Start the game on the first click
        gameStarted = true;
        $("h1").text("Game Started!").css("color", "#e9d8a6");
        score = 0; // Reset the score
        gamePattern = [];
        clickedbyuser = [];
        nextSequence(); // Generate the first sequence
    } else {
        // Handle user input
        var userchoosen = event.currentTarget.id;
        clickedbyuser.push(userchoosen);

        var currentIndex = clickedbyuser.length - 1;

        // Check if the user's input matches the game pattern
        if (userchoosen === gamePattern[currentIndex]) {
            var audio = new Audio('sounds/' + userchoosen + '.mp3');
            audio.play();

            // If the user completes the sequence
            if (clickedbyuser.length === gamePattern.length) {
                score++; // Increment the score
                $("h1").text("Score: " + score).css("color", "#e9d8a6");
                console.log(clickedbyuser);
                // Generate the next sequence after a delay
                setTimeout(nextSequence, 200);
            }
        } else {
            // If the user makes a mistake
            $("h1").text("Game Over! Final Score: " + score).css("color", "#b8001f");
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            console.log(clickedbyuser);
            gameStarted = false; // Reset the game state

        }
    }
});
