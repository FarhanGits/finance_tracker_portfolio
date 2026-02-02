<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use App\Services\BudgetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

use function Termwind\render;

class BudgetController extends Controller
{
    public function viewBudgetingPage() {
        $user_id = Auth::user()->user_id;
        $budgets = Budget::with('category')
            ->where('user_id', $user_id)
            ->where('month', now()->month)
            ->where('year', now()->year)
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

    public function createBudgeting(Request $request, BudgetService $service) {
        $input = $request->all();

        $service->create($input);

        return redirect()->route('budgeting');
    }

    public function editBudgeting(Request $request, string $id, BudgetService $service) {
        $input = $request->all();

        $service->update($input, $id);

        return redirect()->route('budgeting');
    }

    public function deleteBudgeting(string $id, BudgetService $service) {
        $service->destroy($id);

        return redirect()->route('budgeting');
    }
}
