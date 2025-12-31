# SweetAlert2 + Laravel + Inertia React Demo

A simple demo application showing how to integrate [SweetAlert2](https://sweetalert2.github.io/) with Laravel and Inertia React using the [`sweetalert2/laravel`](https://github.com/sweetalert2/sweetalert2-laravel) package.

## Features

- 🎉 Beautiful alerts and toasts with SweetAlert2
- ⚡ Seamless Laravel + Inertia React integration
- 🔄 Server-side alert triggering with client-side display
- 📦 Simple todo app demonstrating the integration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sweetalert2/sweetalert2-laravel-inertia-react-demo.git
cd sweetalert2-laravel-inertia-react-demo
```

2. Install dependencies and set up the application:
```bash
composer setup
```

3. Run the development server:
```bash
composer dev
```

The application will be available at `http://localhost:8000`.

## How It Works

### 1. Include SweetAlert2 in Your Layout

Add the SweetAlert2 template to your Blade layout (`resources/views/app.blade.php`):

```blade
@include('sweetalert2::index')
```

### 2. Configure Inertia Middleware

Share the SweetAlert2 session data in `HandleInertiaRequests.php`:

```php
use SweetAlert2\Laravel\Swal;

public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'flash' => [
            Swal::SESSION_KEY => fn () => $request->session()->pull(Swal::SESSION_KEY),
        ],
    ]);
}
```

### 3. Trigger Alerts from Laravel

Use the `Swal` facade anywhere in your Laravel controllers or routes:

```php
use SweetAlert2\Laravel\Swal;

// Show a success toast after saving
Swal::toastSuccess([
    'title' => 'Saved!',
    'position' => 'top-end',
    'showConfirmButton' => false,
    'timer' => 3000,
    'timerProgressBar' => true,
]);

return redirect('/');
```

### Available Methods

```php
// Alerts with icons
Swal::success(['title' => 'Success!']);
Swal::error(['title' => 'Error!']);
Swal::warning(['title' => 'Warning!']);
Swal::info(['title' => 'Info!']);
Swal::question(['title' => 'Question?']);

// Toast notifications
Swal::toast(['title' => 'Toast']);
Swal::toastSuccess(['title' => 'Success!']);
Swal::toastError(['title' => 'Error!']);
Swal::toastWarning(['title' => 'Warning!']);
Swal::toastInfo(['title' => 'Info!']);
Swal::toastQuestion(['title' => 'Question?']);

// Full configuration
Swal::fire([
    'title' => 'Custom Alert',
    'text' => 'With custom options',
    'icon' => 'success',
    'confirmButtonText' => 'OK',
    // ...any SweetAlert2 option
]);
```

See the [SweetAlert2 documentation](https://sweetalert2.github.io/#configuration) for all available options.

## Tech Stack

- Laravel 12
- Inertia.js 2
- React 19
- Tailwind CSS 4
- SweetAlert2

## License

MIT
