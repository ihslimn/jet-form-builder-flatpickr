import flatpickr from 'flatpickr';

const {
		addAction,
		applyFilters,
	} = window.JetPlugins.hooks;

addAction(
	'jet.fb.input.makeReactive',
	'jfb-flatpickr/on-observe',
	function( input ) {

		if ( ! input.nodes || ! input.nodes.length ) {
			return;
		}

		if ( ! input.nodes[0].dataset?.flatpickr ) {
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

function isDisabledDate( element, date ) {
	const disabledDays = element.dataset?.flatpickrDisabledWeekdays || false;
	const isDisabled = disabledDays ? disabledDays.split( ',' ).includes( date.getDay().toString() ) : false;

	return applyFilters( 'jfb-flatpickr.input.isDisabledDate', isDisabled, element, date );
}

function flatpickrDate( element ) {
	let params = {
		altInput: true,
		altFormat: 'd.m.Y'
	};

	params.disable = [
		function( date ) {
			return isDisabledDate( element, date );
		}
	];

	params = applyFilters( 'jfb-flatpickr.input.params', params, element );

	flatpickr( element, params );
}

function flatpickrDateTime( element ) {
	let params = {
		altInput: true,
		enableTime: true,
		altFormat: 'd.m.Y H:i',
		time_24hr: element.dataset.flatpickr24 ? true : false,
		minuteIncrement: element.dataset.flatpickrMinInc || 1,
		onClose: function( selected, asString ) {
			getInput( element ).value.current = asString;
		}
	};

	params.disable = [
		function( date ) {
			return isDisabledDate( element, date );
		}
	];

	params = applyFilters( 'jfb-flatpickr.input.params', params, element );

	flatpickr( element, params );
}

function flatpickrTime( element ) {
	let params = {
		altInput: true,
		enableTime: true,
		noCalendar: true,
		altFormat: 'H:i',
		dateFormat: 'H:i',
		time_24hr: element.dataset.flatpickr24 ? true : false,
		minuteIncrement: element.dataset.flatpickrMinInc || 1
	};

	params = applyFilters( 'jfb-flatpickr.input.params', params, element );

	flatpickr( element, params );
}

function getInput( element ) {
	const form = element.closest( 'form' );

	if ( ! form ) {
		return false;
	}

	const formId = form.dataset.formId;

	return JetFormBuilder[ formId ].getInput( element.name );
}
