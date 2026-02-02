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
        
        $transactions = Transaction::with(['user', 'category'])
            ->where('user_id', $user_id)
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->get();
        
        $budget_report = Category::with(['budgets','transactions'])
            ->where('category_type', 'expense')
            ->get()
            ->map(function($category) {
                $expense_category = $category->category_name;
                $limit = $category->budgets()
                    ->where('month', now()->month)
                    ->where('year', now()->year)
                    ->sum('budget_amount');
                $spent = $category->transactions()
                    ->whereMonth('transaction_date', now()->month)
                    ->whereYear('transaction_date', now()->year)
                    ->sum('transaction_amount');
                $percentage = $limit > 0 ? ($spent / $limit) * 100 : 0;

                // // Null return to category with no budgeting based on budget amount
                // if ($limit === 0 && $percentage === 0) return null;

                return [
                    'expense_category' => $expense_category,
                    'limit' => $limit,
                    'spent' => $spent,
                    'percentage' => $percentage
                ];
            });
        
        $top_expense_categories = Category::with('transactions')
            ->where('category_type', 'expense')
            ->get()
            ->map(function($category) {
                $expense_category = $category->category_name;
                $total_amount = $category->transactions()
                    ->whereMonth('transaction_date', now()->month)
                    ->whereYear('transaction_date', now()->year)
                    ->sum('transaction_amount');
                
                return [
                    'category' => $expense_category,
                    'total_amount' => $total_amount
                ];
            });
            
        $top_income_categories = Category::with('transactions')
            ->where('category_type', 'income')
            ->get()
            ->map(function($category) {
                $income_category = $category->category_name;
                $total_amount = $category->transactions()
                ->whereMonth('transaction_date', now()->month)
                ->whereYear('transaction_date', now()->year)
                ->sum('transaction_amount');
                
                return [
                    'category' => $income_category,
                    'total_amount' => $total_amount
                ];
            });
        
        return Inertia::render('dashboard', [
            'transaction_period' => $transaction_period,
            'transactions' => $transactions,
            'budget_report' => $budget_report,
            'top_expense_categories' => $top_expense_categories,
            'top_income_categories' => $top_income_categories,
        ]);
    }
}
