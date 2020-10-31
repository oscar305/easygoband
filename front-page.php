<?php
/**
 * The home page
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();

$args = array(
    'numberposts' => 4,
    'post_type'   => 'post',
    'order'       => 'ASC',
    'orderby'     => 'menu_order'
);
$context['posts'] = Timber::get_posts( $args );

\Timber\Timber::render( 'front-page.twig', $context );
