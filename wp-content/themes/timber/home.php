<?php

/*
Template Name: Homepage
*/

use Timber\Timber;

$context = Timber::context();


$context["data"] = [
    "banner" => get_field('banner'),
    "about" => get_field('about'),
    "services" => get_field('services'),
    "values" => get_field('our_values'),
    "contact" => get_field('contact'),
    "forms" => [
        'contactToken' => wp_create_nonce("contact"),
        'quoteToken' => wp_create_nonce("quote")
    ]
];

Timber::render("home/index.twig", $context);
