<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
            'images' => ['nullable', 'array'],
            'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'retained_image_paths' => ['nullable', 'array'],
            'retained_image_paths.*' => ['string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $uploadedImages = $this->file('images', []);
            $retainedImagePaths = $this->input('retained_image_paths', []);

            if (count($uploadedImages) === 0 && count($retainedImagePaths) === 0) {
                $validator->errors()->add('images', 'Please keep at least one existing image or upload a new one.');
            }
        });
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
            'images.*.image' => 'Each selected file must be an image.',
            'images.*.mimes' => 'Images must be JPG, PNG, or WEBP format.',
            'images.*.max' => 'Each image must be 5 MB or smaller.',
        ];
    }
}
