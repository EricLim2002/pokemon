# Fullstack Pokédex — Take-Home Assessment

Repo layout:
- `/backend` — Laravel API
- `/pokemon` — Next.js frontend

## Goal
Build a Pokédex app using the PokeAPI with a Laravel backend API for data aggregation and a Next.js frontend for display.

## Backend (Laravel)
### Endpoint
`GET /api/v1/pokemons?page=<number>&limit=<number>`
`GET /api/v1/pokemons/{name}`

### Behavior
- Calls PokeAPI `https://pokeapi.co/api/v2/pokemon?limit=<limit>&offset=<offset>` to get list.
- For each result, fetches the Pokémon details from its `url`.
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
```

Setup Instructions
Backend Setup

Clone the repository:

git clone https://github.com/EricLim2002/pokemon.git
cd pokemon/backend


Install PHP dependencies:

composer install


Copy and configure the environment file:

cp .env.example .env


Update the .env file with your database and application settings.

Generate the application key:

php artisan key:generate


Run database migrations:

php artisan migrate


Start the backend server:

php artisan serve


The backend will be accessible at http://127.0.0.1:8000.

Frontend Setup
Vite + Laravel Frontend

Navigate to the frontend directory:

cd frontend


Install JavaScript dependencies:

npm install


Start the development server:

npm run dev


The frontend will be accessible at http://localhost:5173.

Next.js Frontend

Navigate to the Next.js frontend directory:

cd frontend-next


Install JavaScript dependencies:

npm install


Start the development server:

npm run dev


The frontend will be accessible at http://localhost:3000.

Build and start for production:

npm run build
npm run start
