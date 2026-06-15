<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCatalogItemRequest;
use App\Http\Requests\UpdateCatalogItemRequest;
use App\Models\CatalogItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CatalogItemController extends Controller
{
    public function store(StoreCatalogItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? true;
        $storedImagePaths = $this->storeUploadedImages($request->file('images', []));
        $validated['image_urls'] = $storedImagePaths;
        $validated['image_url'] = $storedImagePaths[0];
        unset($validated['images']);
       
        CatalogItem::query()->create($validated);

        return $this->redirectToCatalogList('T-shirt item added successfully.');
    }

    public function update(UpdateCatalogItemRequest $request, CatalogItem $catalogItem): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $validated['is_active'] ?? false;
        $currentImagePaths = $catalogItem->resolvedImageUrls();
        $retainedImagePaths = array_values(array_intersect(
            $currentImagePaths,
            $validated['retained_image_paths'] ?? [],
        ));
        $storedImagePaths = $this->storeUploadedImages($request->file('images', []));
        $finalImagePaths = array_values(array_unique([
            ...$retainedImagePaths,
            ...$storedImagePaths,
        ]));

        $this->deleteRemovedImages($currentImagePaths, $retainedImagePaths);

        $validated['image_urls'] = $finalImagePaths;
        $validated['image_url'] = $finalImagePaths[0];
        unset($validated['images'], $validated['retained_image_paths']);

        $catalogItem->update($validated);

        return $this->redirectToCatalogList('T-shirt item updated successfully.');
    }

    public function toggleActive(Request $request, CatalogItem $catalogItem): RedirectResponse
    {
        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $catalogItem->update([
            'is_active' => $validated['is_active'],
        ]);

        return $this->redirectToCatalogList(
            $catalogItem->is_active
                ? 'Catalog item activated successfully.'
                : 'Catalog item deactivated successfully.',
        );
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {
        $this->deleteRemovedImages(
            $catalogItem->resolvedImageUrls(),
            [],
        );
        $catalogItem->delete();

        return $this->redirectToCatalogList('T-shirt item deleted successfully.');
    }

    /**
     * @param  array<int, UploadedFile>  $images
     * @return array<int, string>
     */
    protected function storeUploadedImages(array $images): array
    {
        return collect($images)
            ->map(fn (UploadedFile $image): string => Storage::disk('public')->url(
                $image->store('catalog-items', 'public'),
            ))
            ->values()
            ->all();
    }

    /**
     * @param  array<int, string>  $currentImagePaths
     * @param  array<int, string>  $retainedImagePaths
     */
    protected function deleteRemovedImages(array $currentImagePaths, array $retainedImagePaths): void
    {
        $removedImagePaths = array_diff($currentImagePaths, $retainedImagePaths);

        foreach ($removedImagePaths as $removedImagePath) {
            $storagePath = $this->publicStoragePath($removedImagePath);

            if ($storagePath === null) {
                continue;
            }

            Storage::disk('public')->delete($storagePath);
        }
    }

    protected function publicStoragePath(string $imagePath): ?string
    {
        $path = parse_url($imagePath, PHP_URL_PATH);

        if (! is_string($path) || ! str_starts_with($path, '/storage/')) {
            return null;
        }

        return ltrim(str_replace('/storage/', '', $path), '/');
    }

    protected function redirectToCatalogList(string $message): RedirectResponse
    {
        return redirect()
            ->route('dashboard.admin', [
                'module' => 'catalog',
                'tab' => 'list',
            ])
            ->with('success', $message);
    }
}
