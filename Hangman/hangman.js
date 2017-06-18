var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var wrongGuesses = 0;
var puzzle = "You're Hung!".split("");
var puzzleCategory = "Exclamation";
function setUpGame() {
	getPuzzle();
	toggleAllGuesses( "unguessed" );
	for( i=0; i < alphabet.length; i++ ) {
		document.getElementById( alphabet[ i ] + "Guess" ).onclick = guessPress;
	}
	wrongGuesses = 0;
	document.getElementById( "category" ).innerHTML = "Your category is '" + puzzleCategory + "'";
	var thePuzzleDisplay = document.getElementById( "puzzleWords" );
	for( i=0; i < puzzle.length; i++ ) {
		var thisPuzzleCharacter = puzzle[ i ];
		var thisLi = document.createElement( "li" );
		thisLi.id = "puzzleCharacter" + i;
		thisLi.innerHTML = puzzle[ i ];
		thisLi.classList.add( "letter" );
		if( isALetter( thisPuzzleCharacter ) ) {
			thisLi.classList.add( "unrevealed" );
		}
		else {
			thisLi.classList.add( "guessed" );
		}
		thePuzzleDisplay.appendChild( thisLi );
	}
}

function guessPress( evt ) {
	if( puzzleIsSolved() || wrongGuesses >= 10 )
		return;
	if( evt.currentTarget.classList.contains( "unguessed" ) ) {
		processGuess( evt );
		evt.currentTarget.classList.remove( "unguessed" );
		evt.currentTarget.classList.add( "guessed" );
	}
	if( puzzleIsSolved() ) {
		alert( "you won!  Reload page to play again." );
		toggleAllGuesses( "guessed" );
	}
	else if( wrongGuesses == 10 ) {
		alert( "you lost! Reload page to play again." );
		toggleAllGuesses( "guessed" );
	}
}

function puzzleIsSolved() {
	var isSolved = true;
	for( i=0; i < puzzle.length; i++ ) {
		var classList = document.getElementById( "puzzleCharacter" + i ).classList;
		if( document.getElementById( "puzzleCharacter" + i ).classList.contains( "unrevealed" ) ) {
			isSolved = false;
			break;
		}
	}
	return isSolved;
}	

function isALetter( letter ) {
	for( j=0; j< alphabet.length; j++ ) {
		if( letter.toLowerCase() == alphabet[ j ] ) 
			return true;
	}
	return false;
}

function toggleAllGuesses( cssClass ) {
	var fromClass;
	if( cssClass == "guessed" ) {
		fromClass = "unguessed";
	}
	else {
		fromClass = "guessed";
	}
	if( cssClass == "guessed" || cssClass == "unguessed" ) {
		for( i=0; i<alphabet.length; i++ ) {
			var thisGuessNode = document.getElementById( alphabet[ i ] + "Guess" );
			thisGuessNode.classList.remove( fromClass );
			thisGuessNode.classList.add( "letter" );
			thisGuessNode.classList.add( cssClass );
		}
		return;
	}
	alert( "naughty naughty!  toggleAllGuesses only accepts 'guessed' or 'unguessed'" );
}

function processGuess( evt ) {
	var wrongGuess = true;
	var thisGuessLetter = evt.currentTarget.innerHTML.toLowerCase();
	var thisPuzzleLetter;
	for( i = 0; i < puzzle.length; i++ ) {
		thisPuzzleLetter = puzzle[ i ].toLowerCase();
		if( thisGuessLetter == thisPuzzleLetter ) {
			document.getElementById( "puzzleCharacter" + i ).classList.remove( "unrevealed" );
			document.getElementById( "puzzleCharacter" + i ).classList.add( "guessed" );
			wrongGuess = false;
		}
	}
	
	// if the guess is false, increment the wrong guesses counter and 
	// progress with the hanging!
	if( wrongGuess ) {
		wrongGuesses++;
		document.getElementById( "executioner" ).src = "hangman" + wrongGuesses + ".png";
		var red = 255;
		var green = 255 - 255 * wrongGuesses / 10;
		var blue = 255 - 255 * wrongGuesses / 10;
		document.getElementById( "hangmanBox" ).style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
}

function getPuzzle() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open( "GET", "puzzles.json", false );
	xmlhttp.overrideMimeType( "application/json" );
	xmlhttp.send();
	if( xmlhttp.status != 200 )
		alert( "Error retrieving puzzles" );
	puzzleJson = JSON.parse( xmlhttp.responseText );
	thisPuzzleJson =  puzzleJson[ getRandomIntFromRange( 0, puzzleJson.length ) ];
	puzzleCategory = Object.keys( thisPuzzleJson )[0];
	puzzle = thisPuzzleJson[ puzzleCategory ];
}

/* includes min, excludes max */
function getRandomIntFromRange( min, max ) {
	return Math.floor( Math.random() * ( max - min ) ) + min;
}
