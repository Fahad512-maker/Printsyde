<?php

it('contact page is accessible and renders the contact component', function () {
    $response = $this->get(route('contact'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('Contact'));
});
