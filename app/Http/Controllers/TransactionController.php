<?php

namespace App\Http\Controllers;

use App\Enums\TransactionMethod;
use App\Models\Category;
use App\Models\Transaction;
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
    public function ViewTransactionPage(Request $request): Response {
        $user_id = Auth::user()->user_id;
        $categories = Category::all();
        $transactions = Transaction::with('category')->where('user_id', $user_id)->orderBy('transaction_date', 'desc')->get();
        
        // Enums
        $transaction_methods = TransactionMethod::values();
        return Inertia::render('track-cashflow', compact('user_id', 'categories', 'transactions', 'transaction_methods'));
    }

    public function CreateTransaction(Request $request) {
        $input = $request->all();
        $data = [
            'transaction_id' => 'TRSC-' . Str::ulid(),
            'user_id' => Auth::user()->user_id,
            'category_id' => $input['category_id'],
            'transaction_date' => $input['transaction_date'],
            'transaction_amount' => $input['transaction_amount'],
            'transaction_type' => $input['transaction_type'],
            'transaction_method' => $input['transaction_method'],
            'transaction_note' => $input['transaction_note']
        ];
        Transaction::create($data);
        return redirect()->route('track-cashflow');
    }

    public function ViewTransactionList (Request $request) {
        $user_id = Auth::user()->user_id;

        $query = Transaction::with('category')->where('user_id', $user_id);
        
        $timeframe = $request->query('timeframe', 'mtd');
        if ($timeframe === 'mtd') {
            $query->whereBetween('transaction_date', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ]);
        } elseif ($timeframe === 'ytd') {
            $query->whereBetween('transaction_date', [
                now()->startOfYear(),
                now()->endOfYear()
            ]);
        } elseif ($timeframe === '30d') {
            $month = Carbon::now()->subDays(30);
            $query->where('transaction_date', ">=", $month);
        }

        // $transactions = $query->paginate(10);
        $transactions = $query->orderBy('transaction_date', 'desc')->get();
        return Inertia::render('cashflow', [
            'transactions' => $transactions,
            'filters' => $request->only(['timeframe'])
        ]);
    }
    
    public function showPDF(Request $request) {
        $user_id = Auth::user()->user_id;
    
        $query = Transaction::with('category')->where('user_id', $user_id);
        
        $timeframe = $request->query('timeframe', 'mtd');
        if ($timeframe === 'mtd') {
            $query->whereBetween('transaction_date', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ]);
        } elseif ($timeframe === 'ytd') {
            $query->whereBetween('transaction_date', [
                now()->startOfYear(),
                now()->endOfYear()
            ]);
        } elseif ($timeframe === '30d') {
            $month = Carbon::now()->subDays(30);
            $query->where('transaction_date', ">=", $month);
        }

        $transactions = $query->orderBy('transaction_date', 'desc')->get();

        $pdf = Pdf::loadView('transaction-report-pdf', [
            'transactions' => $transactions

        ])->setPaper('A4', 'portrait');

        $pdfname = 'Report Bulan Mei';
        return $pdf->stream($pdfname . '.pdf');
    }
}
