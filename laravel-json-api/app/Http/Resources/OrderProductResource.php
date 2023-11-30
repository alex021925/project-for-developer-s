<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product->id,
            'date' => $this->product->created_at,
            'name' => $this->product->name,
            'price' => $this->price,
            'productAmount' => $this->productAmount,
            'totalPrice' => $this->price * $this->productAmount,
        ];;
    }
}
