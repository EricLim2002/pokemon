<?php
namespace App\Helper;
use Exception;
use App\Http\Controllers\Controller;
use Http;
use apiRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Session;
use Illuminate\Support\Facades\Log;

class GeneralHelper extends Controller
{
    public static function returnResponse(array $data = [], string $message = 'Success', int $status = 200):JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $status
        ], $status);
    }

    public static function logging(Request $request, $type = 1, $message = 'GeneralLog', $remarks = ''):void
    {
        switch ($type) {
            case (0):
                $logtype = 'error';
                break;
            case (2):
                $logtype = 'warn';
                break;
            case (3):
                $logtype = 'alert';
                break;
            default:
                $logtype = 'info';
                break;
        }
        ;
        if (ENV('APP_DEBUG') == true) {
            Log::$logtype($message, [
                'method' => $request->method(),
                'fullUrl' => $request->fullUrl(),
                'query' => $request->query(),
                'input' => $request->input(),
                'param' => $request->input('param'),
                'remarks' => $remarks
            ]);
        }
    }

    public static function saveApiRecord(Request $request, $functionName, $result = false):ApiRecord  
    {
        try {
            return ApiRecord::create([
                'function_name' => $functionName,
                'url' => $request->fullUrl(),
                'result' => $result
            ]);
        } catch (Exception $e) {
            self::logging($request, 0, 'saveApiRecord', $e->getMessage());
            return new ApiRecord();
        }
    }
}