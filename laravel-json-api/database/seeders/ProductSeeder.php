<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                "id" => 1,
                "data" => [
                    "name" => "Coffee",
                    "price" => "25",

                ]
            ],
            [
                "id" => 2,
                "data" => [
                    "name" => "Milk",
                    "price" => "10 ",

                ]
            ],
            [
                "id" => 3,
                "data" => [
                    "name" => "Pants",
                    "price" => "50",

                ]
            ],
            [
                "id" => 4,
                "data" => [
                    "name" => "Personal Computer",
                    "price" => "300",

                ]
            ],
            [
                "id" => 5,
                "data" => [
                    "name" => "Laptop",
                    "price" => "500 ",

                ]
            ],
            [
                "id" => 6,
                "data" => [
                    "name" => "Headsets",
                    "price" => "15",

                ]
            ],
            [
                "id" => 7,
                "data" => [
                    "name" => "Compact Disk",
                    "price" => "25",

                ]
            ],
            [
                "id" => 8,
                "data" => [
                    "name" => "RAM",
                    "price" => "75",

                ]
            ],
            [
                "id" => 9,
                "data" => [
                    "name" => "SSD",
                    "price" => "150",

                ]
            ],
        ];

        foreach ($products as $product) {
            $productObj = Product::find($product["id"]);
            if (isset($productObj)) {
                $productObj->update($product["data"]);
            } else {
                $productObj = new Product($product["data"]);
                $productObj->id = $product["id"];
                $productObj->save();
            }
        }
    }
}
