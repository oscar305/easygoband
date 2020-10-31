<?php
/**
 * Template Name: Support
 * Description: Support template.
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();
$order_id = intval($_GET['your-order']);
$order = wc_get_order($order_id);

if (!empty( $order )){
    \Timber\Timber::render( 'support.twig', $context );
} else {
    \Timber\Timber::render( '404.twig', $context );
}
