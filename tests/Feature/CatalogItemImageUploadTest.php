<?php

use App\Models\CatalogItem;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('admin can create a catalog item with multiple uploaded images', function () {
    Storage::fake('public');

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $response = $this
        ->actingAs($admin)
        ->post(route('dashboard.catalog-items.store'), [
            'name' => 'Luxury Tee',
            'category' => 'Trending',
            'print_type' => 'DTF Print',
            'minimum_order_quantity' => 25,
            'starting_price' => 1400,
            'sort_order' => 1,
            'is_active' => true,
            'images' => [
                UploadedFile::fake()->image('catalog-main.jpg'),
                UploadedFile::fake()->image('catalog-detail.webp'),
            ],
        ]);

    $response
        ->assertRedirect(route('dashboard.admin', [
            'module' => 'catalog',
            'tab' => 'list',
        ]))
        ->assertSessionHas('success');

    $catalogItem = CatalogItem::query()->first();

    expect($catalogItem)->not->toBeNull();
    expect($catalogItem->resolvedImageUrls())->toHaveCount(2);
    expect($catalogItem->image_url)->toBe($catalogItem->resolvedImageUrls()[0]);

    foreach ($catalogItem->resolvedImageUrls() as $imageUrl) {
        Storage::disk('public')->assertExists(
            str_replace('/storage/', '', $imageUrl),
        );
    }
});

test('admin can update catalog item images while removing old uploads', function () {
    Storage::fake('public');

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $firstImagePath = UploadedFile::fake()->image('first.jpg')->store(
        'catalog-items',
        'public',
    );
    $secondImagePath = UploadedFile::fake()->image('second.jpg')->store(
        'catalog-items',
        'public',
    );

    $catalogItem = CatalogItem::factory()->create([
        'image_url' => Storage::disk('public')->url($firstImagePath),
        'image_urls' => [
            Storage::disk('public')->url($firstImagePath),
            Storage::disk('public')->url($secondImagePath),
        ],
    ]);

    $newUpload = UploadedFile::fake()->image('fresh-gallery.png');

    $response = $this
        ->actingAs($admin)
        ->put(route('dashboard.catalog-items.update', $catalogItem), [
            'name' => $catalogItem->name,
            'category' => $catalogItem->category,
            'print_type' => $catalogItem->print_type,
            'minimum_order_quantity' => $catalogItem->minimum_order_quantity,
            'starting_price' => $catalogItem->starting_price,
            'sort_order' => $catalogItem->sort_order,
            'is_active' => true,
            'retained_image_paths' => [
                Storage::disk('public')->url($secondImagePath),
            ],
            'images' => [$newUpload],
        ]);

    $response
        ->assertRedirect(route('dashboard.admin', [
            'module' => 'catalog',
            'tab' => 'list',
        ]))
        ->assertSessionHas('success');

    $catalogItem->refresh();

    expect($catalogItem->resolvedImageUrls())->toHaveCount(2);
    expect($catalogItem->resolvedImageUrls())->toContain(
        Storage::disk('public')->url($secondImagePath),
    );

    Storage::disk('public')->assertMissing($firstImagePath);
    Storage::disk('public')->assertExists($secondImagePath);
});

test('admin can update catalog item images through a multipart post method spoof', function () {
    Storage::fake('public');

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $oldImagePath = UploadedFile::fake()->image('old.jpg')->store(
        'catalog-items',
        'public',
    );

    $catalogItem = CatalogItem::factory()->create([
        'image_url' => Storage::disk('public')->url($oldImagePath),
        'image_urls' => [
            Storage::disk('public')->url($oldImagePath),
        ],
    ]);

    $newUpload = UploadedFile::fake()->image('replacement.png');

    $response = $this
        ->actingAs($admin)
        ->post(route('dashboard.catalog-items.update', $catalogItem), [
            '_method' => 'put',
            'name' => $catalogItem->name,
            'category' => $catalogItem->category,
            'print_type' => $catalogItem->print_type,
            'minimum_order_quantity' => $catalogItem->minimum_order_quantity,
            'starting_price' => $catalogItem->starting_price,
            'sort_order' => $catalogItem->sort_order,
            'is_active' => true,
            'retained_image_paths' => [],
            'images' => [$newUpload],
        ]);

    $response
        ->assertRedirect(route('dashboard.admin', [
            'module' => 'catalog',
            'tab' => 'list',
        ]))
        ->assertSessionHas('success');

    $catalogItem->refresh();

    expect($catalogItem->resolvedImageUrls())->toHaveCount(1);
    expect($catalogItem->resolvedImageUrls()[0])->not->toBe(
        Storage::disk('public')->url($oldImagePath),
    );

    Storage::disk('public')->assertMissing($oldImagePath);
});

test('admin dashboard includes catalog items for the list view', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $catalogItem = CatalogItem::factory()->create([
        'name' => 'Fresh Dashboard Tee',
        'category' => 'Trending',
        'sort_order' => 1,
    ]);

    $response = $this
        ->actingAs($admin)
        ->get(route('dashboard.admin'));

    $response
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('AdminDashboard')
            ->where('catalogItems.0.id', $catalogItem->id)
            ->where('catalogItems.0.name', 'Fresh Dashboard Tee')
        );
});

test('admin can toggle catalog item active status from dashboard list', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $catalogItem = CatalogItem::factory()->create([
        'is_active' => false,
    ]);

    $response = $this
        ->actingAs($admin)
        ->put(route('dashboard.catalog-items.toggle-active', $catalogItem), [
            'is_active' => true,
        ]);

    $response
        ->assertRedirect(route('dashboard.admin', [
            'module' => 'catalog',
            'tab' => 'list',
        ]));

    $catalogItem->refresh();

    expect($catalogItem->is_active)->toBeTrue();
});
