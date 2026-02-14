<?php

namespace App\Http\Controllers;

use App\Services\BudgetService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function viewBudgetingPage(BudgetService $service) {
        [$user_id, $budgets, $categories, $budget_period] = $service->viewPage();
        
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
