<?php

use Timber\Timber;

add_action("wp_ajax_contact", "contact");

add_action('wp_ajax_nopriv_contact', 'contact');


function contact()
{
    $data = $_POST;

    try {

        $recipient = get_field("Settings", "option")["email"];

        $msg = Timber::compile('email/contact.twig', $data);

        $firstName = $data["firstName"];

        $lastName = $data["lastName"];

        $email = $data["email"];

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: Magiclean <' . $recipient . '>',
        ];

        $headers[] = 'From: ' . ucfirst($firstName) . ' <' . $email . '>';

        $headers[] = 'Reply-To: ' . implode(" ", [$firstName, $lastName]) . ' <' . $email . '>';

        wp_mail($recipient, "Message depuis Magiclean", $msg, $headers);

        wp_send_json_success("Message is successfully sent");
    } catch (\Exception $e) {

        wp_send_json_error($e->getMessage(), 400);
    }
}
