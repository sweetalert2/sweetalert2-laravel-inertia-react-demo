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

test('todo items are clickable links to edit page', function () {
    $page = visit('/');

    // Add a todo
    $page->type('input[type="text"]', 'My clickable todo');
    $page->click('button[type="submit"]');
    $page->waitForText('My clickable todo');

    // Click on the todo item
    $page->click('text=My clickable todo');
    $page->waitForText('Edit Task');

    // Verify we're on the edit page
    $page->assertSee('Edit Task');
    $page->assertSee('Task Title');
    $page->assertSee('Back to Tasks');
});

test('can edit todo from edit page', function () {
    $page = visit('/');

    // Add a todo
    $page->type('input[type="text"]', 'Original todo');
    $page->click('button[type="submit"]');
    $page->waitForText('Original todo');

    // Click on the todo to edit
    $page->click('text=Original todo');
    $page->waitForText('Edit Task');

    // Update the todo
    $page->type('input[type="text"]', 'Updated todo');
    $page->click('button[type="submit"]');
    $page->waitForText('Updated todo');

    // Verify we're back on the list page with the updated todo
    $page->assertSee('All Tasks');
    $page->assertSee('Updated todo');
    $page->assertDontSee('Original todo');
});

test('can navigate back from edit page to list page', function () {
    $page = visit('/');

    // Add a todo
    $page->type('input[type="text"]', 'Test navigation');
    $page->click('button[type="submit"]');
    $page->waitForText('Test navigation');

    // Click on the todo to go to edit page
    $page->click('text=Test navigation');
    $page->waitForText('Edit Task');

    // Click back to tasks link
    $page->click('text=Back to Tasks');
    $page->waitForText('All Tasks');

    // Verify we're back on the list page
    $page->assertSee('All Tasks');
    $page->assertSee('Test navigation');
});
