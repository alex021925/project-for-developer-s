<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'products' => 'required',
            'subtotal' => 'required',
            'taxes' => 'required',
            'total' => 'required',


            'products.*.product_id' => 'required',
            'products.*.productAmount' => 'required|numeric|min:1',
            'products.*.price' => 'required',



//            'products.*.eee' => 'required',

        ];
    }


    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        //'products.*.productAmount' => 'MMMAAA',
        $attributes = [];
        $requestDataAll = $this->request->all();
        if(array_key_exists('products',$requestDataAll)){
            foreach ($requestDataAll['products'] as $line => $requestData) {
                foreach ($this->productAttributes() as $input => $value) {
                    $attributes['products.' . $line . '.' . $input] = $requestData['name'].' '.$value;
                }
            }
        }
        return $attributes;
    }



    /**
     * Get Products attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function productAttributes(): array
    {
        return [
            'product_id' => '',
            'productAmount' => 'Amount',
            'price' => 'Price',


//            'eee' => 'Error to test',
        ];
    }



}
