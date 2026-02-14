<?php

namespace App\Http\Controllers;

use App\Enums\TransactionMethod;
use App\Models\Category;
use App\Models\Transaction;
use App\Services\TransactionService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

use function Illuminate\Support\now;

class TransactionController extends Controller
{
    public function ViewTransactionPage(TransactionService $service): Response {
        [$user_id, $categories, $transactions, $transaction_methods] = $service->viewPage();
        
        return Inertia::render('track-cashflow', [
            'user_id' => $user_id,
            'categories' => $categories,
            'transactions' => $transactions,
            'transaction_methods' => $transaction_methods,
        ]);
    }

    public function CreateTransaction(Request $request, TransactionService $service) {
        $input = $request->all();
        
        $service->create($input);
        
        return redirect()->route('track-cashflow');
    }

    public function ViewTransactionList (Request $request, TransactionService $service) {
        $timeframe = $request->query('timeframe', 'mtd');

        $transactions = $service->viewList($timeframe);

        return Inertia::render('cashflow', [
            'transactions' => $transactions,
            'filters' => $request->only(['timeframe'])
        ]);
    }
    
    public function showPDF(Request $request, TransactionService $service) {
        $timeframe = $request->query('timeframe', 'mtd');

        [$pdf, $pdfname] = $service->showPDF($timeframe);
        
        return $pdf->stream($pdfname . '.pdf');
    }
}
