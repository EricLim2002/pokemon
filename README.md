# 🎮 Fullstack Pokédex

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

---

# 📋 Prerequisites
Before you begin, ensure your system has the following installed:

Node.js: Version 22.18.0 or later.
PHP : 8.2.12.
Composer :  2.7.8.

# 🚀 Getting Started
Follow these steps to get the project running on your local machine.

-

## 1. Clone the Repository
bash
git clone https://github.com/EricLim2002/pokemon
cd pokemon

-

## 2. Backend (Laravel) Setup
Navigate to the backend directory: cd backend

## Install PHP dependencies:

Copy the .env.example file to .env and update the environment variables for your database and other services.
Generate an application key:
Run database migrations
Start the Laravel development server:
The backend will be available at http://localhost:8000.

bash:
```
composer install

cp .env.example .env

php artisan key:generate

php artisan migrate 

php artisan serve
```
-

## 3. Frontend (Next.js) Setup
Open a new terminal and navigate to the frontend directory: cd frontend

Install JavaScript dependencies:


Create a .env.local file in the frontend root and add the necessary environment variables. For example, to point to your local backend:

text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
Run the Next.js development server (Turbopack is configured for fast refresh):

bash

```
npm install
npm run dev
```
The frontend will be available at http://localhost:3000
