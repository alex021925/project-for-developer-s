<?php

namespace App\Http\Controllers\Api\Customers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function __invoke(Request $request): Response
    {
        auth()->guard('customer')->user()->token()->revoke();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
