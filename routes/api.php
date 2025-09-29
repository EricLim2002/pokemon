<?php
use App\Http\Controllers\PokemonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'pokemon'], function () {

        Route::get('/', [PokemonController::class, 'getPokemonList']);
        Route::get('/{id}', [PokemonController::class, 'getPokemonDetails']);

    });
});