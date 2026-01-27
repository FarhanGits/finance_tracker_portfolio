<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

use function Termwind\render;

class BudgetController extends Controller
{
    public function ViewBudgetingPage() {
        $user_id = Auth::user()->user_id;
        $budgets = Budget::with('category')
            ->where('user_id', $user_id)
            ->where('year', now()->year)
            ->where('month', now()->month)
            ->get();
        $categories = Category::all();
        $budget_period = now()->month . '-' . now()->year;
        return Inertia::render('budgeting', [
            'budgets' => $budgets,
            'user_id' => $user_id,
            'categories' => $categories,
            'budget_period' => $budget_period
        ]);
    }

    public function CreateBudgeting(Request $request) {
        $input = $request->all();
        $input['month'] = now()->month;
        $input['year'] = now()->year;
        $input['budget_id'] = 'BUDG-' . Str::ulid();
        $input['user_id'] = Auth::user()->user_id;
        dd($input);
    }
}
