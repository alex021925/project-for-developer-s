<?php

namespace Database\Seeders;

use App\Models\CustomerAccount;
use Illuminate\Database\Seeder;

class CustomerAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerAccounts = [
            [
                "id" => 1,
                "data" => [
                    "name" => "CustomerAccount1",
                    "password" => 'password',
                    "phone" => "+1 (786) 301-9361",
                    "address_street" => "8900 N Kendall",
                    "address_city" => "Miami",
                    "address_state" => "Florida",
                    "zip" => "33101 ",

                ]
            ],
            [
                "id" => 2,
                "data" => [
                    "name" => "CustomerAccount2",
                    "password" => 'password',
                    "phone" => "+1 (786) 302-9361",
                    "address_street" => "8910 N Kendall",
                    "address_city" => "Miami",
                    "address_state" => "Florida",
                    "zip" => "33100 ",

                ]
            ],
            [
                "id" => 3,
                "data" => [
                    "name" => "CustomerAccount3",
                    "password" => 'password',
                    "phone" => "+1 (786) 303-9361",
                    "address_street" => "8930 N Kendall",
                    "address_city" => "Miami",
                    "address_state" => "Florida",
                    "zip" => "33103 ",

                ]
            ],
        ];

        foreach ($customerAccounts as $customerAccount) {
            $customerAccountObj = CustomerAccount::find($customerAccount["id"]);
            if (isset($customerAccountObj)) {
                $customerAccountObj->update($customerAccount["data"]);
            } else {
                $customerAccountObj = new CustomerAccount($customerAccount["data"]);
                $customerAccountObj->id = $customerAccount["id"];
                $customerAccountObj->save();
            }
        }
    }
}
