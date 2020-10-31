<?php

namespace Chisel\Extensions;

/**
 * Class Theme
 * Use this class to extend theme functionality
 * @package Chisel\Extensions
 */
class Theme implements ChiselExtension {
    private $hostStandardId = 189;
    private $hostRoomsId = 258;
    private $hostParcelsId = 332;

	public function extend() {
        $this->addThemeSupports();
        $this->addRoomsToCart();
        $this->addMetaDataToOrder();
        // $this->localeWooCartUrl();
        // $this->localeWooReturnUrl();
	}

	private function addThemeSupports() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'title-tag' );
    }

    public function addRoomsToCart() {
        add_action( 'woocommerce_add_to_cart', function ()
        {
            global $woocommerce;
            $found = false;
            $sector = htmlspecialchars($_GET['sector']);
            $productId = $sector === 'campings' ? $this->hostParcelsId : $this->hostRoomsId;
            //check if product already in cart
            if ( sizeof( WC()->cart->get_cart() ) > 0 ) {
                foreach ( WC()->cart->get_cart() as $cart_item_key => $values ) {
                    $_product = $values['data'];
                    if ( $_product->id == $productId ) {
                        $found = true;
                    }
                }
                // if product not found, add it
                if ( ! $found )
                    WC()->cart->add_to_cart( $productId );
            } else {
                // if no products in cart, add it
                WC()->cart->add_to_cart( $productId );
            }
        } );
    }

    public function getProductData($productName) {
        switch ($productName) {
            case 'standard':
                $productId = $this->hostStandardId;
                break;
            case 'rooms':
                $productId = $this->hostRoomsId;
                break;
            case 'parcels':
                $productId = $this->hostParcelsId;
                break;
            default:
                $productId = $this->hostStandardId;
                break;
        }
        $product = wc_get_product( $productId );
        $data = array(
            'name' => $product->get_name(),
            'price' => $product->get_price(),
            'currency' => get_woocommerce_currency_symbol()
        );
        return $data;
    }

    public function addMetaDataToOrder () {
        add_action('wp_ajax_nopriv_tech_form', function () {
            update_post_meta($_POST['id'], 'tech_form', true);
            wp_die();
        });
        add_action('wp_ajax_tech_form', function () {
          update_post_meta($_POST['id'], 'tech_form', true);
          wp_die();
      });
    }

    // public function localeWooCartUrl () {
    //     add_filter('woocommerce_get_cart_url', function ($url) {
    //         $cart_url = explode('_', get_locale())[0] === 'en' ? '/en/cart' : '/carrito';
    //         return $cart_url;
    //     });
    // }

    // public function localeWooReturnUrl () {
    //     add_filter('woocommerce_get_return_url', function ($url) {
    //         $locale_url = explode('_', get_locale())[0] === 'en' ? str_replace('caja', 'en/checkout', $return_url) : $return_url;
    //         return $locale_url;
    //     }, 10, 2);
    // }

}
