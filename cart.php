<?php
/**
 * Template Name: Woocommerce
 * Description: Woocommerce
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();

\Timber\Timber::render( 'cart.twig', $context );
