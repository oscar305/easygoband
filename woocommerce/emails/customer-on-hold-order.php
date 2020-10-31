<?php
/**
 * Customer on-hold order email
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/customer-on-hold-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates/Emails
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<?php /* translators: %s: Customer first name */ ?>
<p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $order->get_billing_first_name() ) ); ?></p>
<p><?php esc_html_e( 'Thanks for your order. It’s on-hold until we confirm that payment has been received. In the meantime, here’s a reminder of what you ordered:', 'woocommerce' ); ?></p>

<?php

/*
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since 2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::order_meta() Shows order meta data.
 */
do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

// Links to the order & support platform
$lang = explode('_', get_locale())[0];
if ($lang === 'en') {
    $title_link   = '<h2 style="color:#241DBA;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">What are the next steps?</h2>';
    $next_steps   .= '<p>';
    $next_steps   .= '<span>1. If you haven\'t done it yet, fill up the tech form at the <a href="'. str_replace('caja', 'en/checkout', $order->get_checkout_order_received_url()) .'" >order page</a>.</span><br/>';
    $next_steps   .= '<span>2. You can access the support platform <a href="https://easygoband.com/en/support/?your-order='. $order->get_id() .'">here</a></span><br/>';
    $next_steps   .= '<span>3. A technical guy from Easygoband will contact you soon.</span><br/>';
    $next_steps   .= '<span>4. The system integration will be done and you will receive the credentials to your email.</span>';
    $next_steps   .= '</p>';
    echo $title_link;
    echo $next_steps;
} else {
    $title_link   = '<h2 style="color:#241DBA;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">¿Cuáles son los siguientes pasos?</h2>';
    $next_steps   .= '<p>';
    $next_steps   .= '<span>1. Si no lo has hecho todavía, rellena el formulario técnico en la <a href="'. $order->get_checkout_order_received_url() .'" >página del pedido</a>.</span><br/>';
    $next_steps   .= '<span>2. Puedes acceder a la plataforma de soporte <a href="https://easygoband.com/soporte/?your-order='. $order->get_id() .'">aquí</a></span><br/>';
    $next_steps   .= '<span>3. Un técnico de Easygoband se pondrá en contacto con vosotros en breve.</span><br/>';
    $next_steps   .= '<span>4. Se realizará la integración del sistema y se te enviarán tus credenciales de acceso.</span>';
    $next_steps   .= '</p>';
    echo $title_link;
    echo $next_steps;
}

/*
 * @hooked WC_Emails::customer_details() Shows customer details
 * @hooked WC_Emails::email_address() Shows email address
 */
do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

/**
 * Show user-defined additional content - this is set in each email's settings.
 */
if ( $additional_content ) {
	echo wp_kses_post( wpautop( wptexturize( $additional_content ) ) );
}

/*
 * @hooked WC_Emails::email_footer() Output the email footer
 */
do_action( 'woocommerce_email_footer', $email );
