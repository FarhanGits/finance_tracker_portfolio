<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        "transaction_id",
        "user_id",
        "category_id",
        "transaction_amount",
        "transaction_type",
        "transaction_method",
        "transaction_note",
        "transaction_date"
    ];

    protected $table = "transactions";
    protected $primaryKey = "transaction_id";
    protected $keyType = 'string';
    public $incrementing = false;

    public function users(): BelongsTo
    {
        return $this->belongsTo('users', 'user_id');
    }

    public function categories(): BelongsTo
    {
        return $this->belongsTo('categories', 'category_id');
    }
}
