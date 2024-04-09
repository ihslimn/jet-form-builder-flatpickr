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

		add_action( 'jet-form-builder/before-start-form-row', array( $this, 'add_attributes' ) );	
		
		add_action( 'wp_enqueue_scripts', array( $this, 'register_script' ) );

		add_filter( 'jet-form-builder/render/checkbox-field', array( $this, 'append_select_all_option' ), -100 );
		add_filter( 'jet-form-builder/render/select-field', array( $this, 'append_select_all_option' ), -100 );

		add_filter( 'jet-form-builder/request-handler/request', array( $this, 'remove_all_option' ) );
		
	}

	public function remove_all_option( $data ) {

		foreach( $data as $name => $value ) {
			if ( ! is_array( $value ) ) {
				continue;
			}

			foreach( $data[ $name ] as $i => $option ) {

				if ( ! is_scalar( $option ) ) {
					break;
				}

				if ( '_jfb_select_all' === $option ) {
					unset( $data[ $name ][ $i ] );
					break;
				}
			}
			
		}

		return $data;

	}

	public function select_is_not_multiple( $args ) {

		$block_name = $args['blockName'] ?? '';

		if ( $block_name !== 'jet-forms/select-field' ) {
			return false;
		}

		return empty( $args['multiple'] );

	}

	public function append_select_all_option( $args ) {
		
		if ( count( $args['field_options'] ?? array() ) < 2 || ! empty( $args['jfb_select_all_options_add_as_buttons'] ) ) {
			return $args;
		}

		if ( ! empty( $args['jfb_select_all_options_enabled'] ) && ! $this->select_is_not_multiple( $args ) ) {
			array_unshift( 
				$args['field_options'], 
				array( 
					'value' => '_jfb_select_all', 
					'label' => $args['jfb_select_all_options_select_label'] ?? 'Select All',
					'calculate' => 0,
				)
			);
		}

		$this->enqueue_script();

		return $args;

	}

	public function add_class( $attrs ) {

		return in_array( $attrs['type'] ?? '', array( 'radio-field', 'checkbox-field' ) );

	}

	public function add_attributes( $block ) {

		$args = $block->block_attrs;

		if ( ! empty( $args['jfb_select_all_options_default_all_selected'] ) ) {
			$block->add_attribute( 'data-select-all-default', 'true' );
		}

		if ( empty( $args['jfb_select_all_options_enabled'] ) || $this->select_is_not_multiple( $args ) ) {
			return;
		}

		if ( empty( $args['jfb_select_all_options_add_as_buttons'] ) ) {
			$block->add_attribute( 'data-select-all', 'option' );
		} else {
			$block->add_attribute( 'data-select-all', 'buttons' );
		}

		$block->add_attribute( 'data-select-all-buttons-select-label', $args['jfb_select_all_options_select_label'] ?? 'Select All' );

		$block->add_attribute( 'data-select-all-buttons-deselect-label', $args['jfb_select_all_options_deselect_label'] ?? 'Deselect All' );

		$this->enqueue_script();

	}

	public function register_script() {

		wp_register_script(
			'jfb-select-all-options',
			Plugin::instance()->get_url( '/assets/js/frontend.js' ),
			array( 'jquery', 'jet-plugins' ),
			Plugin::instance()->version,
			true
		);

		return;

		wp_register_style(
			'jfb-update-field-frontend',
			plugins_url( 'assets/css/frontend.css', __FILE__ ),
			array(),
			Plugin::instance()->version,
			false
		);

	}

	public function enqueue_script() {

		if ( $this->script_enqueued ) {
			return;
		}

		$this->script_enqueued = true;

		wp_enqueue_script( 'jfb-select-all-options' );
		//wp_enqueue_style( 'jfb-update-field-frontend' );
	}

}
