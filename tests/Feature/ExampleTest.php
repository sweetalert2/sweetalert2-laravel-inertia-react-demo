<?php

use Inertia\Testing\AssertableInertia;

test('the application returns a successful response', function () {
    $response = $this->get('/');

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Todo/List')
    );
    $response->assertStatus(200);
});

test('browser testing', function () {
    $page = visit('/');

    $page->assertSee('No tasks yet');
});

test('can add a new todo via browser', function () {
    $page = visit('/');

    $page->assertSee('Add');
    $page->type('input[type="text"]', 'Buy groceries');
    $page->click('button[type="submit"]');

    $page->waitForText('Buy groceries');
    $page->assertSee('Buy groceries');
    $page->assertDontSee('No tasks yet');
});

test('can add multiple todos via browser', function () {
    $page = visit('/');

    $page->type('input[type="text"]', 'First todo');
    $page->click('button[type="submit"]');
    $page->waitForText('First todo');

    $page->type('input[type="text"]', 'Second todo');
    $page->click('button[type="submit"]');
    $page->waitForText('Second todo');

    $page->assertSee('First todo');
    $page->assertSee('Second todo');
});
