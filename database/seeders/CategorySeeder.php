<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ["type" => "income", "name" => "Salary"],
            ["type" => "income", "name" => "Side Job"],
            ["type" => "income", "name" => "Bonus"],
            ["type" => "income", "name" => "Transfer In"],
            ["type" => "expense", "name" => "Food"],
            ["type" => "expense", "name" => "Transportation"],
            ["type" => "expense", "name" => "Entertainment"],
            ["type" => "expense", "name" => "Health"],
            ["type" => "expense", "name" => "Clothes"],
            ["type" => "expense", "name" => "Household"],
            ["type" => "expense", "name" => "Education"],
            ["type" => "expense", "name" => "Gifts"]
        ];

        foreach ($categories as $category) {
            DB::table("categories")->insert([
                "category_id" => "CTGR-" . Str::ulid(),
                "category_type" => $category["type"],
                "category_name" => $category["name"],
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now()
            ]);
        }

        DB::table("categories")->insert([]);
    }
}
