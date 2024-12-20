<?php

namespace JetFormBuilder_Flatpickr;

use \JetFormBuilder_Flatpickr\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Assets {

	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_assets' ), -100 );
		//add_action( 'wp_enqueue_scripts', array( $this, 'frontend' ) );
	}

	public function block_assets() {

		wp_enqueue_script(
			'jfb-select-all-options',
			Plugin::instance()->get_url( '/assets/js/blocks.js' ),
			array( 'wp-components', 'wp-element', 'wp-blocks', 'wp-block-editor', 'wp-edit-post' ),
			Plugin::instance()->get_version(),
			true
		);

	}

	public function frontend() {
		wp_enqueue_script(
			'jfb-flatpickr-frontend',
			Plugin::instance()->get_url( '/assets/js/frontend.js' ),
			array( 'jet-plugins' ),
			Plugin::instance()->get_version(),
			true
		);

		$themes = array(
			'dark',
			'material_blue',
			'material_green',
			'material_red',
			'material_orange',
			'airbnb',
			'confetti'
		);

		$theme = apply_filters( 'jsf-flatpickr/assets/theme', 'default' );

		if ( $theme === 'default' || ! in_array( $theme, $themes ) ) {
			$style_url = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.css';
		} else {
			$style_url = sprintf( 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/%s.css', $theme );
		}

		wp_enqueue_style(
			'jfb-flatpickr-lib',
			$style_url,
			array(),
			Plugin::instance()->get_version()
		);
	}

}
