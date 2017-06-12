function setUp() {
	var formName = document.getElementById( 'appForm' ).id;
	alert( "Called setUp() from inside " + formName );
}

function processForm() {
	alert( "Called processForm()" );
}

function anchorClick() {
	alert( "Called anchorClick()" );
}

