const FLATPICKR_ENABLED = 'jfb_flatpickr_enabled';
const FLATPICKR_24HOUR = 'jfb_flatpickr_24h';
const FLATPICKR_FORMAT = 'jfb_flatpickr_format';
const FLATPICKR_MIN_INC = 'jfb_flatpickr_min_inc';
const FLATPICKR_DISABLED_WEEKDAYS = 'jfb_flatpickr_disabled_weekdays';
const FLATPICKR_ADVANCED_CONFIG = 'jfb_flatpickr_advanced_config';

const DATE_FIELD = 'jet-forms/date-field';
const DATETIME_FIELD   = 'jet-forms/datetime-field';
const TIME_FIELD   = 'jet-forms/time-field';

const SUPPORTED_BLOCKS = {
				[ DATE_FIELD ] : 'd.m.Y',
				[ DATETIME_FIELD ] : 'd.m.Y H:i',
				[ TIME_FIELD ] : 'H:i',
			};

export {
	FLATPICKR_ENABLED,
	FLATPICKR_24HOUR,
	FLATPICKR_FORMAT,
	SUPPORTED_BLOCKS,
	FLATPICKR_MIN_INC,
	FLATPICKR_DISABLED_WEEKDAYS,
	DATE_FIELD,
	TIME_FIELD,
	FLATPICKR_ADVANCED_CONFIG,
};
