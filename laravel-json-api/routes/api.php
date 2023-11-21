<?php

use App\Http\Controllers\Api\Customers\Auth\LoginController as CustomersLoginController;
use App\Http\Controllers\Api\Customers\Auth\LogoutController as CustomersLogoutController;
use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Laravel\Routing\ResourceRegistrar;
use App\Http\Controllers\Api\V2\Auth\LoginController;
use App\Http\Controllers\Api\V2\Auth\LogoutController;
use App\Http\Controllers\Api\V2\Auth\RegisterController;
use App\Http\Controllers\Api\V2\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\V2\Auth\ResetPasswordController;
use App\Http\Controllers\Api\V2\MeController;
use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v2')->middleware('json.api')->group(function () {
    Route::post('/login', LoginController::class)->name('login');
    Route::post('/logout', LogoutController::class)->middleware('auth:api');
//    Route::post('/register', RegisterController::class);
//    Route::post('/password-forgot', ForgotPasswordController::class);
//    Route::post('/password-reset', ResetPasswordController::class)->name('password.reset');
});

//JsonApiRoute::server('v2')->prefix('v2')->resources(function (ResourceRegistrar $server) {
//    $server->resource('users', JsonApiController::class);
//    Route::get('me', [MeController::class, 'readProfile']);
//    Route::patch('me', [MeController::class, 'updateProfile']);
//});





Route::name('customers.')->prefix('customers')->middleware('json.api')->group(function () {

    Route::post('/login', CustomersLoginController::class)->name('login');
    Route::post('/logout', CustomersLogoutController::class)
        ->middleware('auth:customer')->name('logout');




});
