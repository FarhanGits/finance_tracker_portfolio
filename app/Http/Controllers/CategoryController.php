<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function CreateCategory(Request $request) {
        $input = $request->all();
        $isAlreadyHave = Category::where('category_name', $input['category_name'])->exists();
        $isUserCreated = Category::where('user_id', Auth::user()->user_id);

        if ($isAlreadyHave && $isUserCreated) {
            return redirect()->route('track-cashflow');
        }
        $data = [
            'category_id' => 'CTGR-' . Str::ulid(),
            'user_id' => Auth::user()->user_id,
            'category_name' => $input['category_name'],
            'category_type' => $input['category_type'],
        ];
        Category::create($data);
        return redirect()->route('track-cashflow');
    }
}
