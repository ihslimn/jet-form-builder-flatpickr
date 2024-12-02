import flatpickr from 'flatpickr';
import FlatpickrLanguages from "flatpickr/dist/l10n";

const {
		addAction,
		addFilter,
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

addFilter( 'jfb-flatpickr.input.params', 'jfb-flatpickr.input.advancedConfig', function( params, element ) {

	try {
		let advancedConfig = element.dataset.flatpickrAdvancedConfig;

		if ( ! advancedConfig ) {
			return params;
		}

		advancedConfig = JSON.parse(advancedConfig );

		for ( const param in advancedConfig ) {
			if ( ! params[ param ] || ! Array.isArray( params[ param ] ) ) {
				params[param ] = advancedConfig[ param ];
			} else if ( Array.isArray( params[ param ] ) ) {
				params[ param ] = params[ param ].concat( Array.isArray( advancedConfig[ param ] ) ? advancedConfig[ param ] : [ advancedConfig[ param ] ] );
			}
		}

		if ( params.locale ) {
			params.locale = FlatpickrLanguages[ params.locale ] || false;
		}

		if ( ! params.locale ) {
			params.locale = 'en';
		}

		return params;
	} catch ( e ) {
		console.group( 'Invalid config format in "' + element.name + '" field' );
		console.error( e );
		console.log( element );
		console.groupEnd();
		return params;
	}

} );

function flatpickrDate( element ) {
	let params = {
		altInput: true,
		altFormat: 'd.m.Y'
	};

	if ( element.dataset?.flatpickrDisabledWeekdays ) {
		params.disable = [
			function( date ) {
				return isDisabledDate( element, date );
			}
		];
	}

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

	if ( element.dataset?.flatpickrDisabledWeekdays ) {
		params.disable = [
			function( date ) {
				return isDisabledDate( element, date );
			}
		];
	}

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
