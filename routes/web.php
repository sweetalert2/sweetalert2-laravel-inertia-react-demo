<?php

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function (): Response {
    return Inertia::render('Todo/List', [
        'user' => auth()->user(),
    ]);
});
