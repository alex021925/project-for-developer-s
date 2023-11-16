<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'taxes',
        'subtotal',
        'total',
        'customer_account_id'
    ];


    /**
     * Get the Customer Account that owns of the Order.
     */
    public function customerAccount(): BelongsTo
    {
        return $this->belongsTo(CustomerAccount::class, 'customer_account_id');
    }

    /**
     * Get the Order Products of the Order.
     */
    public function products(): HasMany
    {
        return $this->hasMany(OrderProduct::class, 'order_id');
    }

}
