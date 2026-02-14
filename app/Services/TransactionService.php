<?php

namespace App\Services;

use App\Enums\TransactionMethod;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TransactionService
{
    public function viewPage()
    {
        $user_id = Auth::user()->user_id;
        $categories = Category::all();
        $transactions = Transaction::with('category')->where('user_id', $user_id)->orderBy('transaction_date', 'desc')->limit(10)->get();
        
        // Enums
        $transaction_methods = TransactionMethod::values();
        
        return [
            $user_id,
            $categories,
            $transactions,
            $transaction_methods
        ];
    }
    public function create(array $input)
    {
        $input['transaction_id'] = 'TRSC-' . Str::ulid();
        $input['user_id'] = Auth::user()->user_id;
        
        Transaction::create($input);
    }

    public function viewList(array|string|null $timeframe)
    {
        $user_id = Auth::user()->user_id;

        $query = Transaction::with('category')->where('user_id', $user_id);
        
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
        $transactions = $query->orderBy('transaction_date', 'desc')->paginate(10);

        return TransactionResource::collection($transactions);
    }

    public function showPDF(array|string|null $timeframe)
    {
        $user_id = Auth::user()->user_id;
    
        $query = Transaction::with('category')->where('user_id', $user_id);
        
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

        return [$pdf, $pdfname];
    }
}