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
        $input = $request->all();
        
        $service->create($input);
        
        return redirect()->route('track-cashflow');
    }
}
