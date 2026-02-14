<?php

namespace App\Http\Controllers;

use App\Services\CategoryServices;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function CreateCategory(Request $request, CategoryServices $service) {
        $input = $request->all();
        
        $service->create($input);
        
        return redirect()->route('track-cashflow');
    }
}
