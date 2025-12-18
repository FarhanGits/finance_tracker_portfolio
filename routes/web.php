<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/track-cashflow', [TransactionController::class, 'viewTransactionPage'])->name('track-cashflow');;

    Route::post('users/{id}', function ($id) {
        return redirect()->route('users.show', $id);
    })->name('');
});

require __DIR__.'/settings.php';
