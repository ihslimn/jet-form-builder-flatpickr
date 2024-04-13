import { SUPPORTED_BLOCKS, FLATPICKR_ENABLED, FLATPICKR_24HOUR, FLATPICKR_MIN_INC, FLATPICKR_DISABLED_WEEKDAYS, FLATPICKR_FORMAT, FLATPICKR_ADVANCED_CONFIG } from './constants';

function registerAttributes( settings, name ) {

	if ( ! SUPPORTED_BLOCKS[ name ] ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		[ FLATPICKR_ENABLED ]: {
			type: 'boolean',
			default: false,
		},
		[ FLATPICKR_24HOUR ]: {
			type: 'boolean',
			default: true,
		},
		[ FLATPICKR_FORMAT ]: {
			type: 'string',
			default: SUPPORTED_BLOCKS[ name ],
		},
		[ FLATPICKR_MIN_INC ]: {
			type: 'string',
			default: '1',
		},
		[ FLATPICKR_DISABLED_WEEKDAYS ]: {
			type: 'string',
			default: '',
		},
		[ FLATPICKR_ADVANCED_CONFIG ]: {
			type: 'string',
			default: '',
		},
	};

	return settings;
}

export default registerAttributes;
