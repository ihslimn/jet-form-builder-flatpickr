import flatpickr from "flatpickr";
import styles from "flatpickr/dist/flatpickr.css";

const {
		addAction,
	} = window.JetPlugins.hooks;

addAction(
	'jet.fb.input.makeReactive',
	'jfb-flatpickr/on-observe',
	function( input ) {

		if ( ! input.nodes || ! input.nodes.length ) {
			return;
		}

		if ( input.nodes[0].classList.contains('date-field') ) {
			flatpickrDate( input.nodes[0] );
		}

		if ( input.nodes[0].classList.contains('datetime-field') ) {
			flatpickrDateTime( input.nodes[0] );
		}

		if ( input.nodes[0].classList.contains('time-field') ) {
			flatpickrTime( input.nodes[0] );
		}

	}
);

function flatpickrDate( element ) {
	flatpickr( element, {
		altInput: true,
		altFormat: 'd.m.Y'
	} );
}

function flatpickrDateTime( element ) {
	flatpickr( element, {
		altInput: true,
		enableTime: true,
		altFormat: 'd.m.Y',
		onClose: function( selected, asString ) {
			getInput( element ).value.current = asString;
		}
	} );
}

function flatpickrTime( element ) {
	flatpickr( element, {
		altInput: true,
		enableTime: true,
		noCalendar: true,
		altFormat: 'd.m.Y',
		onClose: function( selected, asString ) {
			getInput( element ).value.current = asString;
		}
	} );
}

function getInput( element ) {
	const form = element.closest( 'form' );

	if ( ! form ) {
		return false;
	}

	const formId = form.dataset.formId;

	return JetFormBuilder[ formId ].getInput( element.name );
}
