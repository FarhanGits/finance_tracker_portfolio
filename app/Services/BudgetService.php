<?php

namespace App\Services;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BudgetService {
    public function viewPage()
    {
        $user_id = Auth::user()->user_id;
        $budgets = Budget::with('category')
            ->where('user_id', $user_id)
            ->where('month', now()->month)
            ->where('year', now()->year)
            ->get();
        $categories = Category::all();
        $budget_period = now()->month . '-' . now()->year;

        return [
            $user_id,
            $budgets,
            $categories,
            $budget_period
        ];
    }
    
    public function create(array $input)
    {
        $isBudgetExist = Budget::where('category_id', $input['category_id'])
            ->where('month', now()->month)
            ->where('year', now()->year)
            ->firstOrFail();
        
        if($isBudgetExist) {
            return redirect()->route('budgeting')
                ->withErrors(['error' => 'Budget for this category already exists for this month.']);
        }
        $input['month'] = now()->month;
        $input['year'] = now()->year;
        $input['budget_id'] = 'BUDG-' . Str::ulid();
        $input['user_id'] = Auth::user()->user_id;

        Budget::create($input);
    }

    public function update(array $input, string $budget_id)
    {
        $budget = Budget::where('budget_id', $budget_id)->firstOrFail();

        foreach ($input as $key => $value) {
            if ($value === null || $value === 'null') {
                unset($input[$key]);
            }
        }

        $budget->update($input);
    }

    public function destroy(string $budget_id)
    {
        $budgeting = Budget::where('budget_id', $budget_id)->firstOrFail();
        $budgeting->delete();
    }
}