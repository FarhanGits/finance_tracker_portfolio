<?php

namespace App\Services;

use App\Models\Transaction;
use DomainException;
use Illuminate\Support\Str;

class TransactionService
{
    public function create(string $transaction_id, string $user_id, string $category_id, string $transaction_date, int $transaction_amount, string $transaction_type, string $transaction_method, string $transaction_note)
    {}
}