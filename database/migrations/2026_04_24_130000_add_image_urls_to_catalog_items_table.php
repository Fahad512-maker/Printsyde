<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('catalog_items', function (Blueprint $table) {
            $table->json('image_urls')->nullable()->after('image_url');
        });

        DB::table('catalog_items')
            ->whereNotNull('image_url')
            ->orderBy('id')
            ->eachById(function (object $catalogItem): void {
                DB::table('catalog_items')
                    ->where('id', $catalogItem->id)
                    ->update([
                        'image_urls' => json_encode([$catalogItem->image_url], JSON_THROW_ON_ERROR),
                    ]);
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('catalog_items', function (Blueprint $table) {
            $table->dropColumn('image_urls');
        });
    }
};
