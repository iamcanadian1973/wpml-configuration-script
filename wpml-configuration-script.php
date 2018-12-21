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
 * @package           WPML_Configuration_Script
 *
 * @wordpress-plugin
 * Plugin Name:       WPML Configuration Script
 * Plugin URI:        https://github.com/iamcanadian1973/wpml-configuration-script
 * GitHub Plugin URI: iamcanadian1973/wpml-configuration-script
 * GitHub Plugin URI: https://github.com/iamcanadian1973/wpml-configuration-script
 * Description:       Hijacks the current script loaded by Marriott theme
 * Version:           1.0.6
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

define( 'MY_PLUGIN_VERSION', '1.0.4' );


/**
 * Activation Hook - Confirm WPML version
 *
 * @since 1.0.0
 */
function activation_hook() {
    if (version_compare(ICL_SITEPRESS_VERSION, '4.1', '<' ) ) {
        deactivate_plugins( plugin_basename( __FILE__ ) );
        wp_die( __( 'Sorry, WPML 4.1 or greater is required to use this plugin.' ) );
    }
}

register_activation_hook( __FILE__, 'activation_hook' );


function my_plugin_wpml_code() {
  if (version_compare(ICL_SITEPRESS_VERSION, '4.1', '>=' ) ) {
      add_action( 'admin_enqueue_scripts', '_kr_enqueue_wpml_scripts', 10 );
      add_action( 'wp_print_scripts', '_kr_denqueue_wpml_scripts', 100 );

  }
}
 
add_action( 'wpml_loaded', 'my_plugin_wpml_code' );



function _kr_enqueue_wpml_scripts() {
    
    wp_enqueue_script( 'wpml-configuration-script-v2', 
                       plugins_url('/js/wpml-configuration-script.js', __FILE__ ), 
                       array('jquery'), 
                       MY_PLUGIN_VERSION, 
                       true 
                     );
}


function _kr_denqueue_wpml_scripts() {
    wp_deregister_script( 'wpml-configuration-script' );
    wp_dequeue_script( 'wpml-configuration-script' );
}
