<?php

namespace Database\Factories;

use App\Models\CatalogItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CatalogItem>
 */
class CatalogItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Trending', 'Corporate', 'Sports', 'Events'];

        return [
            'name' => fake()->words(3, true),
            'category' => fake()->randomElement($categories),
            'print_type' => fake()->randomElement(['DTF Print', 'Screen Print', 'Embroidery', 'Sublimation']),
            'minimum_order_quantity' => fake()->numberBetween(20, 60),
            'starting_price' => fake()->numberBetween(900, 1800),
            'image_url' => $imageUrl = fake()->imageUrl(900, 600, 'fashion'),
            'image_urls' => [$imageUrl],
            'sort_order' => fake()->numberBetween(1, 100),
            'is_active' => true,
        ];
    }
}
