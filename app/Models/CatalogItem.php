<?php

namespace App\Models;

use Database\Factories\CatalogItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogItem extends Model
{
    /** @use HasFactory<CatalogItemFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'category',
        'print_type',
        'minimum_order_quantity',
        'starting_price',
        'image_url',
        'image_urls',
        'sort_order',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'minimum_order_quantity' => 'integer',
            'starting_price' => 'integer',
            'image_urls' => 'array',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return array<int, string>
     */
    public function resolvedImageUrls(): array
    {
        $imageUrls = $this->image_urls ?? [];

        if (count($imageUrls) > 0) {
            return array_values(array_filter($imageUrls));
        }

        return array_values(array_filter([$this->image_url]));
    }
}
