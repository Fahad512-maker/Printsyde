<?php

namespace Database\Seeders;

use App\Models\CatalogItem;
use Illuminate\Database\Seeder;

class CatalogItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catalogItems = [
            [
                'name' => 'Urban Oversized Tee',
                'category' => 'Trending',
                'print_type' => 'DTF Print',
                'minimum_order_quantity' => 25,
                'starting_price' => 1250,
                'image_url' => 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Graphic Street Drop',
                'category' => 'Trending',
                'print_type' => 'Screen Print',
                'minimum_order_quantity' => 30,
                'starting_price' => 1350,
                'image_url' => 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Team Polo Basic',
                'category' => 'Corporate',
                'print_type' => 'Embroidery',
                'minimum_order_quantity' => 20,
                'starting_price' => 1550,
                'image_url' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Office Crew Tee',
                'category' => 'Corporate',
                'print_type' => 'Screen Print',
                'minimum_order_quantity' => 30,
                'starting_price' => 1180,
                'image_url' => 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Active Dry Fit Tee',
                'category' => 'Sports',
                'print_type' => 'Sublimation',
                'minimum_order_quantity' => 25,
                'starting_price' => 1300,
                'image_url' => 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Training Team Jersey',
                'category' => 'Sports',
                'print_type' => 'DTF Print',
                'minimum_order_quantity' => 35,
                'starting_price' => 1420,
                'image_url' => 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Campaign Promo Tee',
                'category' => 'Events',
                'print_type' => 'Screen Print',
                'minimum_order_quantity' => 50,
                'starting_price' => 990,
                'image_url' => 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Expo Staff Shirt',
                'category' => 'Events',
                'print_type' => 'Embroidery',
                'minimum_order_quantity' => 40,
                'starting_price' => 1260,
                'image_url' => 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
                'image_urls' => [
                    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
                ],
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($catalogItems as $catalogItem) {
            CatalogItem::query()->updateOrCreate(
                ['name' => $catalogItem['name']],
                $catalogItem,
            );
        }
    }
}
