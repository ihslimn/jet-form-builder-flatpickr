<?php
/**
 * Plugin Name: JetFormBuilder - Flatpickr
 * Plugin URI:  
 * Description: 
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * Text Domain: jsf-store-filters
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

require_once( 'vendor/autoload.php' );

add_action( 'plugins_loaded', function() {
	JetFormBuilder_Flatpickr\Plugin::instance();
}, 100 );
