<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * @package easygoband
 */

$context = \Timber\Timber::get_context();
\Timber\Timber::render( '404.twig', $context );
