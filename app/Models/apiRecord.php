<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApiRecord extends Model
{
    use SoftDeletes;

    protected $table = 'api_record';

    protected $fillable = [
        'function_name',
        'url',
        'result'
    ];
}
