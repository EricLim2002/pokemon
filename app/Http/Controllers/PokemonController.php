<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Pool;
use Exception;
use GeneralHelper;
use Http;
use Session;

class PokemonController extends Controller
{
    public $baseUrl = 'https://pokeapi.co/api/v2/';

    public function getPokemonList(Request $request)
    {
        try {
            $result = [];
            $limit = 20;
            $offset = Session::get('catelogue_index', 0);

            GeneralHelper::logging($request);
            if (isset($request->limit)) {
                $limit = $request->query('limit');
                if ($limit < 1)
                    $limit = 1;
                if ($limit > 100)
                    $limit = 100;
            }
            if (isset($request->offset)) {
                $offset = $request->query('offset');
                if ($offset < 0)
                    $offset = 0;
            }

            Session::put('catelogue_index', $offset + $limit);
            $data = Http::get($this->baseUrl . 'pokemon?limit=' . $limit . '&offset=' . $offset);
            $data = is_string($data) ? json_decode($data)->json() : $data->json();
            $pokemons = $data['results'] ?? [];

            $pokeDetails = Http::pool(function ($pool) use ($pokemons) {
                $urlArr = [];
                foreach ($pokemons as $r) {
                    $name = $r['name'];
                    $url = $this->baseUrl . 'pokemon/' . $name;
                    $urlArr[$name] = $pool->get($url);
                }
                return $urlArr;
            });

            foreach ($pokeDetails as $r) {
                $r = $r->json();
                if (!isset($r['name']))
                    continue;
                $name = $r['name'];


                $image = self::getImage($r);


                $types = array_map(function ($t) {
                    return $t['type']['name'];
                }, $r['types'] ?? []);


                $result[] = [

                    'id' => $r['order'] ?? null,
                    'name' => $name,
                    'image' => $image,
                    'types' => $types,
                    'height' => $r['height'] ?? null,
                    'weight' => $r['weight'] ?? null,
                ];
            }
            GeneralHelper::saveApiRecord($request, 'getPokemonList', true);
            return GeneralHelper::returnResponse($result);

        } catch (Exception $e) {
            GeneralHelper::saveApiRecord($request, 'getPokemonList');
            return GeneralHelper::returnResponse([], 'Failed to fetch data', 500);

        }
    }

    public function getPokemonDetails(Request $request, $id)
    {
        try {

            $url = $this->baseUrl . 'pokemon/' . $id;
            $data = Http::get($url);
            $detail = $data->json();
            $name = $detail['name'] ?? null;
            $image = self::getImage($detail);

            $types = array_map(function ($t) {
                return $t['type']['name'];
            }, $detail['types'] ?? []);
            $abilities = array_map(function ($a) {
                return $a['ability']['name'];
            }, $detail['abilities'] ?? []);
            $moves = array_map(function ($m) {
                return $m['move']['name'];
            }, $detail['moves'] ?? []);

            $result = [
                'id' => $detail['order'] ?? null,
                'name' => $name,
                'image' => $image,
                'types' => $types,
                'height' => $detail['height'] ?? null,
                'weight' => $detail['weight'] ?? null,
                'abilities' => $abilities,
                'moves' => $moves,
            ];

            return GeneralHelper::returnResponse($result);

        } catch (Exception $e) {
            GeneralHelper::saveApiRecord($request, 'getPokemonDetails');
            return GeneralHelper::returnResponse([], 'Failed to fetch data', 500);

        }
    }

    public static function getImage($detail)
    {
        try {
            $image = data_get($detail, 'sprites.other.official-artwork.front_default')
                ?: data_get($detail, 'sprites.other.home.front_default')
                ?: data_get($detail, 'sprites.front_default');

            return $image;
        } catch (Exception $e) {
            GeneralHelper::logging(new Request(), 0, 'PokemonController@getImage');
            return null;
        }
    }

}
