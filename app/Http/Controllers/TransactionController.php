<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function viewTransactionPage() {
        return Inertia::render('track-cashflow');
    }
}
