<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCatalogItemRequest;
use App\Http\Requests\UpdateCatalogItemRequest;
use App\Models\CatalogItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CatalogItemController extends Controller
{
    public function index(): Response
    {
        $catalogItems = CatalogItem::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(function (CatalogItem $catalogItem): array {
                return [
                    'id' => $catalogItem->id,
                    'name' => $catalogItem->name,
                    'category' => $catalogItem->category,
                    'print_type' => $catalogItem->print_type,
                    'minimum_order_quantity' => $catalogItem->minimum_order_quantity,
                    'starting_price' => $catalogItem->starting_price,
                    'image_url' => $catalogItem->image_url,
                    'sort_order' => $catalogItem->sort_order,
                    'is_active' => $catalogItem->is_active,
                    'updated_at' => $catalogItem->updated_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Dashboard', [
            'catalogItems' => $catalogItems,
        ]);
    }

    public function store(StoreCatalogItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? true;

        CatalogItem::query()->create($validated);

        return redirect()->route('dashboard')->with('success', 'T-shirt item added successfully.');
    }

    public function update(UpdateCatalogItemRequest $request, CatalogItem $catalogItem): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? false;

        $catalogItem->update($validated);

        return redirect()->route('dashboard')->with('success', 'T-shirt item updated successfully.');
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {
        $catalogItem->delete();

        return redirect()->route('dashboard')->with('success', 'T-shirt item deleted successfully.');
    }
}
