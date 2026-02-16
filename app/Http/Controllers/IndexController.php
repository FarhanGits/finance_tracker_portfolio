<?php

namespace App\Http\Controllers;

use App\Services\IndexService;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function welcome() {
        return redirect()->route('login');
        // return Inertia::render('welcome', [
        //     'canRegister' => Features::enabled(Features::registration()),
        // ]);
    }

    public function dashboard(IndexService $service) {
        [$transaction_period, $transactions, $budget_report, $top_expense_categories, $top_income_categories] = $service->dashboard();
        
        return Inertia::render('dashboard', [
            'transaction_period' => $transaction_period,
            'transactions' => $transactions,
            'budget_report' => $budget_report,
            'top_expense_categories' => $top_expense_categories,
            'top_income_categories' => $top_income_categories,
        ]);
    }
}
