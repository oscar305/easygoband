<?php
/**
 * Template Name: Landings
 * Description: Landings template.
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();

\Timber\Timber::render( 'layouts/landings.twig', $context );
