<?php

use Inertia\Testing\AssertableInertia;

test('the application returns a successful response', function () {
    $response = $this->get('/');

    $response->assertInertia(fn (AssertableInertia $page) =>
        $page
            ->component('Todo/List')
    );
    $response->assertStatus(200);
});

test('browser testing', function () {
    $page = visit('/');

    $page->assertSee('No todos available.');
});
