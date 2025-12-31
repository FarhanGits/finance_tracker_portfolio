<?php

namespace App\Http\Controllers;

use App\Enums\TransactionMethod;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function ViewTransactionPage(Request $request): Response {
        $user_id = Auth::user()->user_id;
        $categories = Category::all();
        $transactions = Transaction::orderBy('transaction_date', 'desc')->paginate(5)->where('user_id', $user_id);
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

    public function ViewTransactionList () {}
}
