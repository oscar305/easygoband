<?php
/**
 * Template Name: Solutions
 * Description: Solutions template.
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();
// $context['userIp'] = $_SERVER['REMOTE_ADDR'];

// $theme = new \Chisel\Extensions\Theme();
// $context['productStandard'] = $theme->getProductData('standard');
// $context['productRooms'] = $theme->getProductData('rooms');
// $context['productParcels'] = $theme->getProductData('parcels');



$enSolusionsName = [
    'hotels-and-resorts' => 'hoteles-y-resorts',
    'theme-and-water-parks' => 'parques-tematicos',
    'music-festivals' => 'festivales-de-musica',
    'food-and-beverage-festivals' => 'eventos-gastronomicos',
    'sporting-events' => 'recintos-deportivos',
    'solutions-gofun' => 'solucion-gofun'
];
$enSolusionsName = $lang == 'en' ? $enSolusionsName[$post->post_name] : $post->post_name;


\Timber\Timber::render( array( 'solutions-' . $enSolusionsName . '.twig', 'solutions.twig' ), $context );

// \Timber\Timber::render( 'layouts/solutions.twig', $context );
