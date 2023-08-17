<?php

use Timber\Timber;

add_action("wp_ajax_quote", "quote");

add_action('wp_ajax_nopriv_quote', 'quote');


function quote()
{
    $data = $_POST;

    try {

        $recipient = get_field("Settings", "option")["email"];

        $msg = Timber::compile('email/quote.twig', $data);

        $fullName = $data["fullName"];

        $company = ucfirst($data["company"]);

        $email = $data["email"];

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: Magiclean <' . $recipient . '>',
        ];

        $headers[] = 'From: ' . ucfirst($fullName) . ' <' . $email . '>';

        $headers[] = 'Reply-To: ' . $company . ' <' . $email . '>';

        wp_mail($recipient, "Demande de devis de " . $company . "", $msg, $headers);

        wp_send_json_success("Message is successfully sent");
    } catch (\Exception $e) {

        wp_send_json_error($e->getMessage(), 400);
    }
}
