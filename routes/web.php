<?php

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use SweetAlert2\Laravel\Swal;

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

Route::get('/todos/{todo}/edit', function (Todo $todo): Response {
    return Inertia::render('Todo/Edit', [
        'todo' => $todo,
    ]);
});

Route::patch('/todos/{todo}', function (Todo $todo): RedirectResponse {
    $validated = request()->validate([
        'title' => 'required|string|max:255',
    ]);

    $todo->update($validated);

    Swal::toastSuccess([
        'title' => 'Saved!',
        'position' => 'top-end',
        'showConfirmButton' => false,
        'timer' => 3000,
        'timerProgressBar' => true,
    ]);

    return redirect('/');
});
