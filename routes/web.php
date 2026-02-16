<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [IndexController::class, 'welcome'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [IndexController::class, 'dashboard'])->name('dashboard');

    Route::get('/track-cashflow', [TransactionController::class, 'ViewTransactionPage'])->name('track-cashflow');
    Route::post('/transaction/create', [TransactionController::class, 'CreateTransaction'])->name('transaction.create');
    Route::post('/category/create', [CategoryController::class, 'CreateCategory'])->name('category.create');

    Route::get('/cashflow', [TransactionController::class, 'ViewTransactionList'])->name('cashflow');
    Route::get('/cashflow/export', [TransactionController::class, 'showPDF'])->name('export-cashflow');

    Route::get('/budgeting', [BudgetController::class, 'viewBudgetingPage'])->name('budgeting');
    Route::post('/budgeting/create', [BudgetController::class, 'createBudgeting'])->name('budgeting.create');
    Route::patch('/budgeting/edit/{id}', [BudgetController::class, 'editBudgeting'])->name('budgeting.edit');
    Route::delete('/budgeting/delete/{id}', [BudgetController::class, 'deleteBudgeting'])->name('budgeting.delete');
});

require __DIR__.'/settings.php';
