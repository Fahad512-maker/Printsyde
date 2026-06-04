<?php

test('design page shows the coming soon experience', function () {
    $response = $this->get(route('design'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('ComingSoon'));
});
