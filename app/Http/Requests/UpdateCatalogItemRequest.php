<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCatalogItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'print_type' => ['required', 'string', 'max:100'],
            'minimum_order_quantity' => ['required', 'integer', 'min:1'],
            'starting_price' => ['required', 'integer', 'min:0'],
            'image_url' => ['required', 'url', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Item name is required.',
            'category.required' => 'Category is required.',
            'print_type.required' => 'Print type is required.',
            'minimum_order_quantity.required' => 'Minimum order quantity is required.',
            'minimum_order_quantity.min' => 'Minimum order quantity must be at least 1.',
            'starting_price.required' => 'Starting price is required.',
            'starting_price.min' => 'Starting price cannot be negative.',
            'image_url.required' => 'Image URL is required.',
            'image_url.url' => 'Please enter a valid image URL.',
        ];
    }
}
