<?php
namespace App\Helper;
use Exception;
use App\Http\Controllers\Controller;
use Http;
use Request;
use Session;

class GeneralHelper extends Controller
{   
    public static function returnResponse(Array $data = [], String $message = 'Success',int $status = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $status
        ], $status);
    }
}