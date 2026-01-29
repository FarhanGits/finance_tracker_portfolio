<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use function Illuminate\Support\now;

class IndexController extends Controller
{
    public function welcome() {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    public function dashboard() {
        $transaction_period = now()->month . '-' . now()->year;
        $user_id = Auth::user()->user_id;
        $budgets = Budget::with(['user', 'category'])
            ->where('user_id', $user_id)
            ->where('month', now()->month)
            ->where('year', now()->year)
            ->get();
        $transactions = Transaction::with(['user', 'category'])
            ->where('user_id', $user_id)
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->get();
        $categories = Category::with(['transactions', 'budgets'])
            ->get();
        return Inertia::render('dashboard', [
            'transaction_period' => $transaction_period,
            'budgets' => $budgets,
            'transactions' => $transactions,
            'categories' => $categories
        ]);
    }
}
