<?php

namespace App\Http\Controllers;

use App\Models\CatalogItem;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        if ($request->user()?->is_admin) {
            return redirect()->route('dashboard.admin');
        }

        return redirect()->route('dashboard.user');
    }

    public function admin(): Response
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

        $adminMetrics = [
            [
                'key' => 'users',
                'label' => 'Total Users',
                'value' => (string) User::query()->count(),
                'delta' => (string) User::query()->where('is_admin', false)->count().' members',
                'tone' => 'cyan',
            ],
            [
                'key' => 'catalog',
                'label' => 'Catalog Items',
                'value' => (string) CatalogItem::query()->count(),
                'delta' => (string) CatalogItem::query()->where('is_active', true)->count().' active',
                'tone' => 'emerald',
            ],
            [
                'key' => 'admins',
                'label' => 'Admin Accounts',
                'value' => (string) User::query()->where('is_admin', true)->count(),
                'delta' => 'Full access',
                'tone' => 'violet',
            ],
            [
                'key' => 'verified',
                'label' => 'Verified Users',
                'value' => (string) User::query()->whereNotNull('email_verified_at')->count(),
                'delta' => 'Email verified',
                'tone' => 'amber',
            ],
        ];

        $userRows = User::query()
            ->orderByDesc('created_at')
            ->limit(8)
            ->get()
            ->map(function (User $user): array {
                return [
                    'id' => 'USR-'.$user->id,
                    'name' => $user->name,
                    'action' => $user->is_admin ? 'Admin account' : 'User account',
                    'amount' => $user->email,
                    'status' => $user->email_verified_at ? 'Verified' : 'Pending',
                    'time' => $user->created_at?->diffForHumans() ?? 'Just now',
                ];
            });

        return Inertia::render('AdminDashboard', [
            'catalogItems' => $catalogItems,
            'adminMetrics' => $adminMetrics,
            'userRows' => $userRows,
        ]);
    }

    public function user(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('UserDashboard', [
            'accountSummary' => [
                'name' => $user?->name,
                'email' => $user?->email,
                'member_since' => $user?->created_at?->format('d M Y'),
                'email_verified' => (bool) $user?->email_verified_at,
                'role' => $user?->is_admin ? 'Admin' : 'User',
            ],
            'userStats' => [
                [
                    'label' => 'Account Type',
                    'value' => $user?->is_admin ? 'Admin' : 'User',
                    'description' => 'Your current dashboard access level.',
                ],
                [
                    'label' => 'Email Status',
                    'value' => $user?->email_verified_at ? 'Verified' : 'Pending',
                    'description' => 'Verification state of your login email.',
                ],
                [
                    'label' => 'Catalog Access',
                    'value' => 'View only',
                    'description' => 'Admin modules are hidden from user accounts.',
                ],
            ],
        ]);
    }
}
