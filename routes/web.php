<?php

use App\Http\Controllers\CategoryController;
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

    Route::get('/track-cashflow', [TransactionController::class, 'ViewTransactionPage'])->name('track-cashflow');

    Route::post('/create-transaction', [TransactionController::class, 'CreateTransaction'])->name('transaction.create');

    Route::post('/create-category', [CategoryController::class, 'CreateCategory'])->name('category.create');
});

require __DIR__.'/settings.php';
