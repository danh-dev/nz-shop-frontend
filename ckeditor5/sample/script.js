DecoupledEditor
	.create( document.querySelector( '.editor' ), {
		// Editor configuration.
	} )
	.then( editor => {
		window.editor = editor;

		// Set a custom container for the toolbar.
		document.querySelector( '.document-editor__toolbar' ).appendChild( editor.ui.view.toolbar.element );
		document.querySelector( '.ck-toolbar' ).classList.add( 'ck-reset_all' );
	} )
	.catch( handleSampleError );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "p9uhlnqgtlxb-jnwuddhnohr" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
