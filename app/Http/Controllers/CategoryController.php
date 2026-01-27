<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryServices;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function CreateCategory(Request $request, CategoryServices $service) {
        $service->create(
            category_id: 'CTGR-' . Str::ulid(),
            user_id: Auth::user()->user_id,
            category_name: $request->category_name,
            category_type: $request->category_type
        );
        return redirect()->route('track-cashflow');
    }
}
