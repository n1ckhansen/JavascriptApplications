var ALPHABET = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ];

function rot13Encrpyt( rt ) {
	enc13 = "";
	for ( ir = 0; ir < rt.length; ir++ ) {
		var theLetter = rt[ ir ]
		enc13 += rotCrypt( 13, theLetter );
	}
	return enc13;
}

function rotCrypt( rot, raw ) {
	var thisLetter = raw.toUpperCase();
	var thisIndex = ALPHABET.indexOf( thisLetter );
	if( thisIndex < 0 ) {
		console.log( thisLetter );
		return thisLetter;
	}
	else {
		var newIndex = ( thisIndex + rot ) % 26;
		console.log( ALPHABET[ newIndex ] );
		return ALPHABET[ newIndex ];
	}
}

function setUp() {
	//var formName = document.getElementById( 'appForm' ).id;
	//alert( "Called setUp() from inside " + formName );
        console.log( "Completed setUp()" );
}

function processEncryptForm() {
	var inText = document.getElementById( 'rawText' ).value;
	console.log( "inText is " + inText );
	var encrypted = rot13Encrpyt( inText );
	console.log( encrypted );
	document.getElementById( "encryptedText" ).value = encrypted;
	printResult( encrypted);
}

function processDecryptForm() {
	var inText = document.getElementById( 'encryptedText' ).value;
	console.log( "inText is " + inText );
	var encrypted = rot13Encrpyt( inText );
	console.log( encrypted );
	document.getElementById( "rawText" ).value = encrypted;
	printResult( encrypted);
}

function printResult( rText ) {
	document.getElementById( "result" ).innerHTML = "RESULT: " + rText;
}

function anchorClick() {
	alert( "Called anchorClick()" );
}

