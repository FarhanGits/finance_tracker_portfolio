<!DOCTYPE html>
<html lang="en">

@php
use Carbon\Carbon;

function toIDR($amount)
{
    return 'Rp ' . number_format($amount, 0, ',', '.');
}

function formatDate($date)
{
    return Carbon::parse($date)->format('d-m-Y');
}
@endphp

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    <link rel="stylesheet" href="{{ public_path('style/pdf-report.css') }}">
</head>
<body>
    <header>
        <table>
            <tr class="margin: 0 auto; border: 1px solid black;">
                <td><img src="{{ public_path('images/chart-no-axes-combined.png') }}" alt="FinTrackr Logo" class="logo-img"></td>
                <td><p class="logo-text">FinTrackr</p></td>
            </tr>
            <div class="devider"></div>
        </table>
    </header>

    <div>
        <table class="table-data" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($transactions as $transaction)
                    <tr>
                        <td style="text-align: center;">{{ formatDate($transaction->transaction_date) }}</td>
                        <td>{{ $transaction->transaction_note }}</td>
                        <td style="text-align: center;">{{ $transaction->category->category_name }}</td>
                        @if ($transaction->transaction_type === 'income')
                            <td style="color: green; text-align: center;">+ {{ toIDR($transaction->transaction_amount) }}</td>
                        @else
                            <td style="color: red; text-align: center;">- {{ toIDR($transaction->transaction_amount) }}</td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <footer class="pagenum"></footer>
</body>
<script></script>
</html>