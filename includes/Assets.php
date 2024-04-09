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
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend' ) );
	}

	public function block_assets() {

		wp_enqueue_script(
			'jfb-select-all-options',
			Plugin::instance()->get_url( '/assets/js/blocks.js' ),
			array( 'wp-components', 'wp-element', 'wp-blocks', 'wp-block-editor', 'wp-edit-post' ),
			Plugin::instance()->version,
			false
		);

	}

	public function frontend() {
		wp_enqueue_script(
			'jfb-flatpickr-frontend',
			Plugin::instance()->get_url( '/assets/js/frontend.js' ),
			array( 'jet-plugins' ),
			Plugin::instance()->version,
			true
		);

		wp_enqueue_style(
			'jfb-flatpickr-frontend',
			Plugin::instance()->get_url( '/assets/css/frontend.css' ),
			array(),
			Plugin::instance()->version
		);
	}

}
