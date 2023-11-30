<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'date' => $this->created_at,
        'customer' => [
            'id' => $this->customerAccount->id,
            'name' => $this->customerAccount->name,
            ],
        'products' => OrderProductResource::collection($this->products),
        'subtotal' => $this->subtotal,
        'taxes' => $this->taxes,
        'total' => $this->total,
        ];
    }
}
