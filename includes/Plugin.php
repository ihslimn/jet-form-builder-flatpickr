<?php

namespace JetFormBuilder_Flatpickr;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Plugin {

	private static $instance = null;

	public $storage = null;

	public $settings = null;

	private $url = '';

	public $version = '1.0.0';

	public function __construct() {

		if ( ! function_exists( 'jet_form_builder' ) ) {

			add_action( 'admin_notices', function () {

				$class = 'notice notice-error';
				
				$message = __(
					'<b>Error:</b> <b>JetFormBuilder - Flatpickr</b> plugin requires' . 
					' <b>JetFormBuilder</b> plugin to be installed and activated',
					'jfb-select-all'
				);

				printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), wp_kses_post( $message ) );

			} );

			return;
		}
		
		add_action( 'plugins_loaded', array( $this, 'init' ), 150 );

	}

	public function get_url( $path = '' ) {
		if ( empty( $this->url ) ) {
			$this->url = plugins_url( '', dirname( __FILE__ ) );
		}

		return $this->url . $path;
	}

	public static function instance() {

		if ( empty( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;

	}

	public function init() {
		new Assets();
		//new Block_Attributes();
	}

}
