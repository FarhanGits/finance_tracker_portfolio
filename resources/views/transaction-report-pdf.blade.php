<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    @vite('resources/css/app.css')
</head>
<body class="flex justify-end">
    <p>Ini Buktinya 😹</p>
    <span>
        @foreach ($transactions as $transaction)
            <p>{{ $transaction->transaction_id }}</p>
        @endforeach
    </span>
        
</body>
<script></script>
</html>