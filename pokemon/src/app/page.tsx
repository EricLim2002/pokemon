"use client";

import React, { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Top section: carousel + banners */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-10 bg-white rounded-lg shadow p-4 flex items-center justify-center min-h-[160px]">
            <Carousel />
          </div>
          <div className="col-span-2 space-y-4">
            <div className="bg-pink-100 rounded-lg h-36 flex items-center justify-center">Static Banner</div>
            <div className="bg-pink-100 rounded-lg h-36 flex items-center justify-center">Static Banner</div>
          </div>
        </div>

        {/* Middle section */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <div className="sticky top-6 bg-white rounded-lg h-[420px] flex items-center justify-center shadow"><img src='/picture/pikachu.jpg'/></div>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow p-4">
              <SearchablePokemonList />
            </div>
          </div>
          <div className="col-span-2">
            <div className="sticky top-6 bg-white rounded-lg h-[420px] flex items-center justify-center shadow"><img src='/picture/pokeball.jpg'/></div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Carousel ---------------- */
function Carousel() {
  const slides = ["/picture/banner/pokemon_banner_1.jpg", "/picture/banner/pokemon_banner_2.jpg", "/picture/banner/pokemon_banner_3.jpg"];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full rounded-md overflow-hidden relative bg-pink-50 flex items-center justify-center">
      <img src={slides[idx]} alt={`banner-${idx}`} className="object-cover w-full h-full" style={{ width: "1200px", height: "330px" }}/>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-8 h-1 rounded-full ${i === idx ? "bg-yellow-400" : "bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Pokemon List ---------------- */
function SearchablePokemonList() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
        const res = await fetch(`${base}/pokemons?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch");
        var response = await res.json();
        var data: Pokemon[] = response.data || [];
        if (cancelled) return;

        if (data.length < limit) setHasMore(false);

        setItems((prev) => {
          const merged = page === 1 ? data : [...prev, ...data];
          return search
            ? merged.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            : merged;
        });
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, limit, search]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pokemon Name"
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      <div style={{ height: 520 }} className="overflow-auto p-2">
        <div className="grid grid-cols-3 gap-4">
          {items.length === 0 && !loading && <div className="col-span-3 text-center py-10 text-gray-400">No Pokémon yet</div>}
          {items.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : hasMore ? (
            <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 bg-blue-600 text-white rounded">
              Load More
            </button>
          ) : (
            <div className="text-gray-500">No more Pokémon</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Pokemon Card ---------------- */
function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const image = pokemon.image || "/picture/pokeball.png";

  return (
    <div className="bg-white rounded-md shadow p-3 flex items-center gap-3">
      <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded">
        <img src={image} alt={pokemon.name} className="w-16 h-16 object-contain"  />
      </div>
      <div className="flex-1">
        <div className="font-semibold capitalize">{pokemon.name}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {pokemon.types?.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 border text-gray-700">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right text-sm text-gray-500">
        <div>Ht: {pokemon.height ?? "-"}</div>
        <div>Wt: {pokemon.weight ?? "-"}</div>
      </div>
    </div>
  );
}
