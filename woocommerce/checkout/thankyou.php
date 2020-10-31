<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="woocommerce-order">

	<?php if ( $order ) :

		do_action( 'woocommerce_before_thankyou', $order->get_id() ); ?>

		<?php if ( $order->has_status( 'failed' ) ) : ?>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed"><?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?></p>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
				<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
				<?php if ( is_user_logged_in() ) : ?>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="button pay"><?php esc_html_e( 'My account', 'woocommerce' ); ?></a>
				<?php endif; ?>
			</p>

		<?php else : ?>

			<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), $order ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>

			<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">

				<li class="woocommerce-order-overview__order order">
					<?php esc_html_e( 'Order number:', 'woocommerce' ); ?>
					<strong><?php echo $order->get_order_number(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<li class="woocommerce-order-overview__date date">
					<?php esc_html_e( 'Date:', 'woocommerce' ); ?>
					<strong><?php echo wc_format_datetime( $order->get_date_created() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<?php if ( is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email() ) : ?>
					<li class="woocommerce-order-overview__email email">
						<?php esc_html_e( 'Email:', 'woocommerce' ); ?>
						<strong><?php echo $order->get_billing_email(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
					</li>
				<?php endif; ?>

				<li class="woocommerce-order-overview__total total">
					<?php esc_html_e( 'Total:', 'woocommerce' ); ?>
					<strong><?php echo $order->get_formatted_order_total(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<?php if ( $order->get_payment_method_title() ) : ?>
					<li class="woocommerce-order-overview__payment-method method">
						<?php esc_html_e( 'Payment method:', 'woocommerce' ); ?>
						<strong><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></strong>
					</li>
				<?php endif; ?>

			</ul>

		<?php endif; ?>

        <?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
        <?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>

        <div class="mt-16">
            <?php $lang = explode('_', get_locale())[0];
            if ($lang === 'en'): ?>
                <h2 class="text-3xl">What are the next steps?</h2>
                <div class="border-l-2 border-purple ml-2 pl-4">
                    <p class="text-2xl">1. Fill up <span class="scrollto-forminfo cursor-pointer underline">the tech form</span> and send it to us.</p>
                    <p class="text-2xl">2. You can access the support platform <a target="_blank" href="/<?php echo $lang === 'en' ? 'en/support' : 'soporte'; ?>/?your-order=<?php echo $order->get_id() ?>">here</a></p>
                    <p class="text-2xl">3. A technical guy from Easygoband will contact you soon.</p>
                    <p class="text-2xl">4. The system integration will be done and you will receive the credentials to your email.</p>
                </div>
            <?php else: ?>
                <h2 class="text-3xl">¿Cuáles son los siguientes pasos?</h2>
                <div class="border-l-2 border-purple ml-2 pl-4">
                    <p class="text-2xl">1. Rellena el <span class="scrollto-forminfo cursor-pointer underline">formulario técnico</span> y envíanoslo.</p>
                    <p class="text-2xl">2. Puedes acceder a la plataforma de soporte <a target="_blank" href="/soporte/?your-order=<?php echo $order->get_id() ?>">aquí</a></p>
                    <p class="text-2xl">3. Un técnico de Easygoband se pondrá en contacto con vosotros en breve.</p>
                    <p class="text-2xl">4. Se realizará la integración del sistema y se te enviarán tus credenciales de acceso.</p>
                </div>
            <?php endif; ?>
        </div>
        <h2 class="forminfo tech-form-info text-3xl pt-16"><?php echo $lang === 'en' ? 'Tech form' : 'Formulario técnico'; ?>
            <span class="tech-form-label text-white bg-red-600 px-4"><?php echo $lang === 'en' ? 'Not sent' : 'No enviado'; ?></span>
        </h2>
        <div class="tech-form border-2 border-purple rounded-lg p-8">
            <?php echo do_shortcode( "[contact-form-7 id='" . ($lang === 'en' ? '3030' : '272') . "']" ); ?>
        </div>
        <script>
            var App = App || {};
            var techFormInfo = document.querySelector('.tech-form-info');
            var techFormLabel = techFormInfo.querySelector('span');
            App.orderId = <?php echo $order->get_id(); ?>;
            App.isFormSubmitted = <?php echo get_post_meta($order->get_id(), 'tech_form')[0] == true ? 'true' : 'false'; ?>;
            App.ajaxHandler = 'tech_form';

            var orderId = document.querySelector('.woocommerce-order-overview__order.order strong').innerText;
            document.querySelector('input[name*="your-order"]').value = orderId;


            function formIsSubmitted () {
                document.querySelector('.tech-form').remove();
                techFormLabel.textContent = 'Enviado';
                techFormLabel.classList.remove('bg-red-600')
                techFormLabel.classList.add('bg-green-400')
                techFormLabel.classList.remove('bg-red-600')
            }

            if (App.isFormSubmitted) {
                formIsSubmitted();
            } else {
                document.addEventListener( 'wpcf7mailsent', function( event ) {
                    jQuery.ajax({
                        type: 'POST',
                        url: '/wp-admin/admin-ajax.php',
                        data: {
                            'action': App.ajaxHandler,
                            'id': App.orderId
                        },
                        success: function () {
                            formIsSubmitted();
                            window.scrollTo({
                                behavior: 'smooth',
                                left: 0,
                                top: techFormInfo.offsetTop,
                            });
                        }
                    });
                }, false );
            }
        </script>

	<?php else : ?>

		<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), null ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>

	<?php endif; ?>

</div>
