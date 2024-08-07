<?php

namespace JetFormBuilder_Flatpickr;

use \JetFormBuilder_Flatpickr\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Block_Attributes {

	public $script_enqueued = false;

	public function __construct() {
		add_filter( 'jet-form-builder/render/date-field/attributes', array( $this, 'add_flatpickr' ), 10, 2 );
		add_filter( 'jet-form-builder/render/datetime-field/attributes', array( $this, 'add_flatpickr' ), 10, 2 );
		add_filter( 'jet-form-builder/render/time-field/attributes', array( $this, 'add_flatpickr' ), 10, 2 );
	}

	public function add_flatpickr( $attrs, $block ) {
		
		$saved_attrs = $block->block_type->block_attrs;

		if ( empty( $saved_attrs['jfb_flatpickr_enabled'] ) ) {
			return $attrs;
		}

		$attrs['data-flatpickr'] = 1;

		$default_formats = array(
			'date-field'     => 'd.m.Y',
			'datetime-field' => 'd.m.Y H:i',
			'time-field'     => 'H:i',
		);

		$format = isset( $saved_attrs['jfb_flatpickr_format'] ) ? $saved_attrs['jfb_flatpickr_format'] : $default_formats[ $saved_attrs['type'] ];

		$attrs['data-flatpickr-format'] = $format;

		$hours_24 = isset( $saved_attrs['jfb_flatpickr_24h'] ) ? $saved_attrs['jfb_flatpickr_24h'] : true;
		$min_inc  = isset( $saved_attrs['jfb_flatpickr_min_inc'] ) ? $saved_attrs['jfb_flatpickr_min_inc'] : 1;

		if ( in_array( $saved_attrs['type'], array( 'datetime-field', 'time-field' ) ) ) {
				if ( $hours_24 ) {
					$attrs['data-flatpickr24'] = 1;
				}
				$attrs['data-flatpickr-min-inc'] = $min_inc;
		}

		if ( in_array( $saved_attrs['type'], array( 'date-field', 'datetime-field' ) ) && ! empty( $saved_attrs['jfb_flatpickr_disabled_weekdays'] ) ) {
			$attrs['data-flatpickr-disabled-weekdays'] = $saved_attrs['jfb_flatpickr_disabled_weekdays'];
		}

		if ( ! empty( $saved_attrs['jfb_flatpickr_advanced_config'] ) ) {
			$attrs['data-flatpickr-advanced-config'] = sanitize_text_field( $saved_attrs['jfb_flatpickr_advanced_config'] );
		}

		if ( ! $this->script_enqueued ) {
			jfb_flatpickr()->assets->frontend();
			$this->script_enqueued = true;
		}

		return $attrs;

	}

}
