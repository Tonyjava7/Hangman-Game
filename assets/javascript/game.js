$(document).ready(function() {

    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];

    for (var i = 0; i < letters.length; i++) {

        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#alphabet-keypad").append(letterBtn);
    }

    $("#alphabet-keypad").on("click", ".letter-button", pickLetter);

    function pickLetter() {
        var letterPicked = $(this);

        letterPicked
            .removeClass("letter-button")
            .addClass("letter-disabled");

        letterPicked = letterPicked.html();
        handlePickedLetter(letterPicked);
    }

    function handlePickedLetter(letterPicked) {
        var resultMatches = [];
        var ind = currentWord.indexOf(letterPicked);


        while (ind !== -1) {
            resultMatches.push(ind);
            ind = currentWord.indexOf(letterPicked, ind + 1);
        }

        if (resultMatches.length > 0) {
            var letterBlocks = document.getElementsByClassName("is-letter");
            resultMatches.map(function(num) {

                var domElem = document.createElement("span");
                domElem.innerHTML = currentWordFull[num].toUpperCase();
                letterBlocks[num].appendChild(domElem);
                displayCongratulatoryMessageOnWin();

            });

        } else {
            var domElem = document.createElement("div");
            domElem.className = "wrong-letter";
            domElem.innerHTML = letterPicked;
            document.getElementById("letter-bottom").appendChild(domElem);
            hangmanGraphic.addBodyPart();
            displayGameOverMessageOnLose();
        }
    }

    function displayCongratulatoryMessageOnWin() {
        var correctlyGuessedLettersCount = $(".is-letter > span").length;
        if (correctlyGuessedLettersCount === currentWord.length) {
            alert("You won this tim. Play again.");
        }
    }

    function displayGameOverMessageOnLose() {
        var incorrectlyGuessedLettersCount = $("#letter-bottom > div").length;
        if (incorrectlyGuessedLettersCount === 7) {
            alert("Good try but not this time.  Try again.");
        }
    }

    //INPUT graphics.

    $(".reset").on("click", hangmanGraphic.reset);

    function resetAlphabetKeypad() {
        $("#alphabet-keypad > .letter-disabled").each(function(index, element) {
            $(element).removeClass().addClass('letter-button');
        });
    }

    function removeBottomLetters() {
        $('#letter-bottom > div').each(function(index, element) {
            $(element).remove();
        });
    }

    function removeCorrectlyGuessedLetters() {
        $('#word-to-guess').each(function(index, element) {
            $(element).children().html('');
        });
    }

    function removeFillInTheBlanksAroundOldWord() {
        $("#word-to-guess").html('');
    }

    var hangmanWords = ["aladdin", "bambi", "cars", "dumbo", "finding nemo", "lion king", "pinocchio", "toy story", "zootopia"];

    var easyArray = hangmanWords.filter(function(word) {
        return word.length <= 4;
    });

    var hardArray = hangmanWords.filter(function(word) {
        return word.length > 4;
    });

    function wordSelect(array) {
        var num = Math.floor(Math.random() * (array.length - 1));
        var word = array[num];
        return word;
    }

    function setWordToBeGuessed() {

        currentWordFull = wordSelect(hangmanWords);

        currentWord = currentWordFull.toUpperCase();

        currentWord.split("").map(function(character) {
            var guessWordBlock = document.getElementById("word-to-guess");

            var domElem = document.createElement("div");

            if (character.match(/[a-z]/i)) {
                domElem.className = "character-block is-letter";

            } else {
                domElem.className = "character-block";
            }

            guessWordBlock.appendChild(domElem);
        });
    }

    var currentWordFull;
    var currentWord;

    setWordToBeGuessed();
})();