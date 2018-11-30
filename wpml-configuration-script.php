<?php
/**
 * WPML Configuration Script
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://kylerumble.com
 * @since             1.0.1
 * @package           WPML_Configuration_Script
 *
 * @wordpress-plugin
 * Plugin Name:       WPML Configuration Script
 * GitHub Plugin URI: https://github.com/iamcanadian1973/wpml-configuration-script
 * Description:       Hijacks the current script loaded by Marriott theme
 * Version:           1.0.0
 * Author:            Kyle Rumble
 * Author URI:        http://kylerumble.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wpml-configuration-script
 * Domain Path:       /languages
 */
 
 
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'MY_PLUGIN_VERSION', '1.0.0' );



function _kr_enqueue_wpml_scripts() {
    
    wp_enqueue_script( 'wpml-configuration-script-v2', 
                       plugins_url('/js/wpml-configuration-script.js', __FILE__ ), 
                       array('jquery'), 
                       MY_PLUGIN_VERSION, 
                       true 
                     );
}
add_action( 'admin_enqueue_scripts', '_kr_enqueue_wpml_scripts', 10 );


function _kr_denqueue_wpml_scripts() {
    wp_deregister_script( 'wpml-configuration-script' );
    wp_dequeue_script( 'wpml-configuration-script' );
}
add_action( 'wp_print_scripts', '_kr_denqueue_wpml_scripts', 100 );
