<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCatalogItemRequest;
use App\Http\Requests\UpdateCatalogItemRequest;
use App\Models\CatalogItem;
use Illuminate\Http\RedirectResponse;

class CatalogItemController extends Controller
{
    public function store(StoreCatalogItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? true;

        CatalogItem::query()->create($validated);

        return redirect()->route('dashboard.admin')->with('success', 'T-shirt item added successfully.');
    }

    public function update(UpdateCatalogItemRequest $request, CatalogItem $catalogItem): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? false;

        $catalogItem->update($validated);

        return redirect()->route('dashboard.admin')->with('success', 'T-shirt item updated successfully.');
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {
        $catalogItem->delete();

        return redirect()->route('dashboard.admin')->with('success', 'T-shirt item deleted successfully.');
    }
}
