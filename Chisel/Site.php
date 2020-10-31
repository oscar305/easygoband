<?php

namespace Chisel;

use Timber\Timber;

/**
 * Class Site
 * @package Chisel
 *
 * Use this class to setup whole site related configuration
 */
class Site extends \Timber\Site {
	/**
	 * Site constructor.
	 */
	public function __construct() {
		// set default twig templates directory
		Timber::$dirname = Settings::TEMPLATES_DIR;

		$this->chiselInit();

		parent::__construct();
	}

	/**
	 * Initiate chisel configuration.
	 */
	public function chiselInit() {
		add_filter( 'timber_context', array( $this, 'addToContext' ) );
		add_filter( 'Timber\PostClassMap', array( '\Chisel\Post', 'overrideTimberPostClass' ) );
	}

	/**
	 * You can add custom global data to twig context
	 *
	 * @param array $context
	 *
	 * @return array
	 */
	public static function addToContext( $context ) {
		global $post;
		$post = Timber::get_post();

        $context['lang'] = explode('_', get_locale())[0];
		$context['base_path'] = $context['lang'] === 'en' ? '/en' : '/';
		$context['base_url'] = 'https://www.easygoband.com';
        $menu_lang_selector = $context['lang'] === 'en' ? 'En' : '';
		$context['main_nav'] = new \Timber\Menu("Main$menu_lang_selector");
		$context['sec_nav'] = new \Timber\Menu("Secondary$menu_lang_selector");
        $context['post'] = Timber::get_post();
        // Theme
        $parent = get_page($post->post_parent);
        $parent->post_name;
        $context['theme']  = in_array($parent->post_name, array('caja', 'carrito', 'politica-de-privacidad', 'politica-de-cookies', 'politica-de-ventas', 'cart', 'checkout', 'privacy-policy', 'cookies-policy', 'sales-policy', 'cdti','solutions','soluciones', 'home','inicio')) ? 'light' : 'dark';
        $context['theme'] = is_page(['inicio', 'home']) ? 'light' : $context['theme'];
        $context['no_nav'] = is_page(['soporte', 'support']);

		return $context;
	}
}
