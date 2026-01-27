<?php

namespace App\Services;

use App\Models\Category;
use DomainException;
use Illuminate\Support\Str;

class CategoryServices {
    public function create(string $category_id, string $user_id, string $category_name, string $category_type)
    {
        $isAlreadyHave = Category::where('category_name', $category_name)->exists();
        $isUserCreated = Category::where('user_id', $user_id);

        if ($isAlreadyHave && $isUserCreated) {
            return new DomainException('Category already exist');
        }
        $data = [
            'category_id' => $category_id,
            'user_id' => $user_id,
            'category_name' => $category_name,
            'category_type' => $category_type,
        ];
        Category::create($data);
    }
}