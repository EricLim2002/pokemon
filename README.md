# Fullstack Pokédex — Take-Home Assessment

## Repo Layout
- `/backend` — Laravel API
- `/pokemon` — Next.js frontend

## Goal
Build a Pokédex app using the PokeAPI with a Laravel backend API for data aggregation and a Next.js frontend for display.

---

## Backend (Laravel)

### Endpoints

- `GET /api/v1/pokemons?page=<number>&limit=<number>`
- `GET /api/v1/pokemons/{name}`

### Behavior
- Calls PokeAPI: `https://pokeapi.co/api/v2/pokemon?limit=<limit>&offset=<offset>` to get a list of Pokémon.
- For each result, fetches Pokémon details from its `url`.
- Returns a merged JSON array:

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
```
