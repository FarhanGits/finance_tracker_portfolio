<?php

namespace App\Enums;

enum TransactionMethod: string
{
    case CASH = 'cash';
    case E_WALLET = 'e-wallet';
    case BANK_TRANSFER = 'bank-transfer';
    case CREDIT_CARD = 'credit-card';
    case OTHER = 'other';

    public static function values(): array 
    {
        return [
            self::CASH,
            self::E_WALLET,
            self::BANK_TRANSFER,
            self::CREDIT_CARD,
            self::OTHER
        ];
    }
}