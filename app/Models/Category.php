<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
