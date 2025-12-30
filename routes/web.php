<?php

use App\Models\Todo;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function (): Response {
    return Inertia::render('Todo/List', [
        'todos' => Todo::all(),
    ]);
});
