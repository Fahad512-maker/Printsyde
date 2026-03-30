<?php

use App\Http\Controllers\CatalogItemController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About/About');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [CatalogItemController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/catalog-items', [CatalogItemController::class, 'store'])->name('dashboard.catalog-items.store');
    Route::put('/dashboard/catalog-items/{catalogItem}', [CatalogItemController::class, 'update'])->name('dashboard.catalog-items.update');
    Route::delete('/dashboard/catalog-items/{catalogItem}', [CatalogItemController::class, 'destroy'])->name('dashboard.catalog-items.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
