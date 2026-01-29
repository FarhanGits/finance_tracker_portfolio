<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        "category_id",
        "user_id",
        "category_type",
        "category_name",
        "created_at",
        "updated_at"
    ];

    protected $table = "categories";
    protected $primaryKey = "category_id";
    protected $keyType = 'string';
    public $incrementing = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'category_id', 'category_id');
    }
    
    public function budgets(): HasMany
    {
        return $this->hasMany(Budget::class, 'category_id', 'category_id');
    }
}
