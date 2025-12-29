<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Todo/List', [
            'todos' => Todo::orderBy('created_at', 'desc')->get(),
            'user' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Todo::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $todo->update($validated);

        return redirect()->back();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->back();
    }
}
