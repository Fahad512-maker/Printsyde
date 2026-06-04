<?php

namespace App\Services;

use App\Models\CatalogItem;
use Illuminate\Support\Collection;

class HomePageService
{
    /**
     * @return array{title: string, catalogTabs: array<int, string>, catalogItems: array<int, array{name: string, tab: string, printType: string, minOrder: string, price: string, image: string, images: array<int, string>, category: string, startingPrice: int, minimumOrderQuantity: int}>}
     */
    public function getHomePageProps(): array
    {
        $catalogItems = $this->getActiveCatalogItems();

        return [
            'title' => 'PrintSyde | Premium Custom Apparel',
            'catalogTabs' => $this->buildCatalogTabs($catalogItems),
            'catalogItems' => $this->buildCatalogItems($catalogItems),
        ];
    }

    /**
     * @return array{title: string, catalogItems: array<int, array{name: string, tab: string, printType: string, minOrder: string, price: string, image: string, images: array<int, string>, category: string, startingPrice: int, minimumOrderQuantity: int}>}
     */
    public function getCollectionPageProps(): array
    {
        return [
            'title' => 'PrintSyde Collections | Luxury Apparel Lines',
            'catalogItems' => $this->buildCatalogItems($this->getActiveCatalogItems()),
        ];
    }

    /**
     * @return Collection<int, CatalogItem>
     */
    protected function getActiveCatalogItems(): Collection
    {
        return CatalogItem::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
    }

    /**
     * @param  Collection<int, CatalogItem>  $catalogItems
     * @return array<int, string>
     */
    protected function buildCatalogTabs(Collection $catalogItems): array
    {
        return $catalogItems
            ->pluck('category')
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, CatalogItem>  $catalogItems
     * @return array<int, array{name: string, tab: string, printType: string, minOrder: string, price: string, image: string, images: array<int, string>, category: string, startingPrice: int, minimumOrderQuantity: int}>
     */
    protected function buildCatalogItems(Collection $catalogItems): array
    {
        return $catalogItems
            ->map(function (CatalogItem $catalogItem): array {
                $images = $catalogItem->resolvedImageUrls();

                return [
                    'name' => $catalogItem->name,
                    'tab' => $catalogItem->category,
                    'printType' => $catalogItem->print_type,
                    'minOrder' => 'MOQ '.$catalogItem->minimum_order_quantity,
                    'price' => 'PKR '.number_format($catalogItem->starting_price),
                    'image' => $images[0] ?? $catalogItem->image_url,
                    'images' => $images,
                    'category' => $catalogItem->category,
                    'startingPrice' => $catalogItem->starting_price,
                    'minimumOrderQuantity' => $catalogItem->minimum_order_quantity,
                ];
            })
            ->values()
            ->all();
    }
}
