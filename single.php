<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package easygoband
 */

global $post;

$context = \Timber\Timber::get_context();

$args = array(
    'posts_per_page' => 3,
    'paged' => 1,
    'category__in' => wp_get_post_categories($post->ID),
    'post__not_in' => array($post->ID)
);
$context['related_posts'] = new Timber\PostQuery($args);

if (post_password_required($post->ID)) {
    \Timber\Timber::render('single-password.twig', $context);
} else {
    \Timber\Timber::render(array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context);
}
