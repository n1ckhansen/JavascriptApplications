var ALPHABET = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ];
var den = 1;

function rot13Encrpyt( rt ) {
	enc13 = "";
	for ( ir = 0; ir < rt.length; ir++ ) {
		var theLetter = rt[ ir ]
		enc13 += rotCrypt( 13, theLetter );
	}
	return enc13;
}

function saltEncrypt( salt, raw ) {
	var encrypted = "";
	var saltIndex = -1;
	for( i = 0; i<raw.length; i++ ) {
		var theLetter = raw[ i ];
		console.log( "before saltIndex is " + saltIndex );
		saltIndex++
		if( saltIndex == salt.length ) {
			saltIndex = 0;
		}
		console.log( "after saltIndex is " + saltIndex );
		var theSaltChar = salt[ saltIndex ].toUpperCase();
		var theSaltRot = ALPHABET.indexOf( theSaltChar );
		encrypted += rotCrypt( theSaltRot, theLetter );
		console.log( encrypted );
	}
	return encrypted;
}

function rotCrypt( rot, raw ) {
	var thisLetter = raw.toUpperCase();
	var thisIndex = ALPHABET.indexOf( thisLetter );
	rot = rot * den;
	if( thisIndex < 0 ) {
		console.log( thisLetter );
		return thisLetter;
	}
	else {
		var newIndex = ( thisIndex + rot ) % 26;
		console.log( "newIndex is " + newIndex );
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
	var inSalt = document.getElementById( 'saltText' ).value;
	den = 1;
	console.log( "inText is " + inText );
	console.log( "saltText is " + inSalt );
	//var encrypted = rot13Encrpyt( inText );
	var encrypted = saltEncrypt( inSalt, inText );
	console.log( encrypted );
	document.getElementById( "encryptedText" ).value = encrypted;
	printResult( encrypted);
}

function processDecryptForm() {
	var inText = document.getElementById( 'encryptedText' ).value;
	var inSalt = document.getElementById( 'saltText' ).value;
	den = -1;
	console.log( "inText is " + inText );
	//var encrypted = rot13Encrpyt( inText );
	var dencrypted = saltEncrypt( inSalt, inText );
	console.log( dencrypted );
	document.getElementById( "rawText" ).value = dencrypted;
	printResult( dencrypted);
}

function printResult( rText ) {
	document.getElementById( "result" ).innerHTML = "RESULT: " + rText;
}

function anchorClick() {
	alert( "Called anchorClick()" );
}

