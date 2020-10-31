<?php
/**
 * Template Name: Case studies
 * Description: Case studies template.
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();


$enPostName = [
    'oasis' => 'oasis',
    'aapolo' => 'aapolo',
    'beerman' => 'beerman',
    'aquarama' => 'aquarama',
    'rototom' => 'rototom'
];
$postName = $lang == 'en' ? $enPostName[$post->post_name] : $post->post_name;

\Timber\Timber::render( array( 'case-' . $postName . '.twig', 'case-studies.twig' ), $context );

// \Timber\Timber::render( 'layouts/case-studies.twig', $context );
