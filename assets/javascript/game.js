//set function of initial / beginning state in order to reset to this point after end of each game.  Remember to keep the score count as a running total.
function initializeHangmanGame() {

}

var hangmanWord = ["aladdin", "bambi", "cars", "dumbo", "finding nemo", "lion king", "pinocchio", "toy story", "zootopia"];

//randomizes the hangmanWord.
var randomWord = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];

//splits the randomWord into individual letters 
var splitWord = randomWord.split(/(?!$)/);

function hiddenSplitWord(splitWord) {
    Element.style.visibility = "hidden";
}
// var letterBtn = $("<div>");
// letterBtn.addClass("letter-button letter letter-button-color");
// letterBtn.attr("data-letter", splitWord);
// letterBtn.text(splitWord);
$("#currentWord").append(hiddenSplitWord);
// for (var i = 0; i < randomWord.length; i++) {
//     // document.getElementById("currentWord").innerHTML = randomWord;

// $(document).ready(function() {


// });