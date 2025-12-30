<?php

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function (): Response {
    return Inertia::render('Todo/List', [
        'todos' => Todo::all(),
    ]);
});

Route::post('/todos', function (): RedirectResponse {
    $validated = request()->validate([
        'title' => 'required|string|max:255',
    ]);

    Todo::create($validated);

    return redirect('/');
});
