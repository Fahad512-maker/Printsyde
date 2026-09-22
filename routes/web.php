<?php

use App\Http\Controllers\CatalogItemController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/collections', [HomeController::class, 'collections'])->name('collections');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/design', [HomeController::class, 'design'])->name('design');
Route::get('/how-it-works', [HomeController::class, 'howItWorks'])->name('how-it-works');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'redirect'])->name('dashboard');
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])
        ->middleware('admin')
        ->name('dashboard.admin');
    Route::get('/user/dashboard', [DashboardController::class, 'user'])->name('dashboard.user');
    Route::post('/dashboard/catalog-items', [CatalogItemController::class, 'store'])
        ->middleware('admin')
        ->name('dashboard.catalog-items.store');
    Route::put('/dashboard/catalog-items/{catalogItem}', [CatalogItemController::class, 'update'])
        ->middleware('admin')
        ->name('dashboard.catalog-items.update');
    Route::put('/dashboard/catalog-items/{catalogItem}/toggle-active', [CatalogItemController::class, 'toggleActive'])
        ->middleware('admin')
        ->name('dashboard.catalog-items.toggle-active');
    Route::delete('/dashboard/catalog-items/{catalogItem}', [CatalogItemController::class, 'destroy'])
        ->middleware('admin')
        ->name('dashboard.catalog-items.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
