# Fullstack Pokédex — Take-Home Assessment

Repo layout:
- `/backend` — Laravel API
- `/pokemon` — Next.js frontend

## Goal
Build a Pokédex app using the PokeAPI with a Laravel backend API for data aggregation and a Next.js frontend for display.

## Backend (Laravel)
### Endpoint
`GET /api/pokemons?page=<number>&limit=<number>`

### Behavior
- Calls PokeAPI `https://pokeapi.co/api/v2/pokemon?limit=<limit>&offset=<offset>` to get list.
- For each result, fetches the Pokémon details from its `url`.
- Uses `sprites.other['official-artwork'].front_default` (fallback to `sprites.front_default`) as the main image.
- Returns merged JSON array:
```json
[
  {
    "name": "ivysaur",
    "image": "https://...",
    "types": ["grass", "poison"],
    "height": 10,
    "weight": 130,
    "id": 2
  }
]
