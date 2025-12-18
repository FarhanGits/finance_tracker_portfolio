<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->string('transaction_id')->primary();
            $table->string('user_id')->nullable();
            $table->string('category_id')->nullable();
            $table->integer('transaction_amount');
            $table->enum('transaction_method', ['cash', 'e-wallet', 'bank-transfer', 'credit-card', 'other']);
            $table->string('transaction_note', 500)->nullable();
            $table->date('transaction_date');
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->nullOnDelete();
            $table->foreign('category_id')->references('category_id')->on('categories')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
