import { useEffect, useState, useRef } from 'react';
import PokemonCard from '../components/PokemonCard';
import TopCarousel from '../components/TopCarousel';
import styles from '../styles/Home.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // reset when page=1 vs search changes
    setPokemons([]);
    setPage(1);
    setHasMore(true);
  }, [limit]);

  useEffect(() => {
    // initial load
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPage(p = page) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pokemons?page=${p}&limit=${limit}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
      } else {
        if (p === 1) setPokemons(data);
        else setPokemons(prev => [...prev, ...data]);
        setPage(p + 1);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  // client-side filter
  const filtered = pokemons.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TopCarousel />
      <div className={styles.middleContainer}>
        <aside className={styles.sideImage}>
          <img src="/place-left.jpg" alt="left" />
        </aside>

        <main className={styles.center}>
          <div className={styles.searchBar}>
            <input
              placeholder="Search Pokémon by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.pokemonList}>
            {filtered.map((p) => (
              <PokemonCard key={p.name + (p.id ?? Math.random())} pokemon={p} />
            ))}
            {filtered.length === 0 && !loading && <div>No Pokémon found.</div>}
          </div>

          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            {hasMore ? (
              <button onClick={() => loadPage()} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            ) : (
              <span>No more Pokémon</span>
            )}
          </div>
        </main>

        <aside className={styles.sideImage}>
          <img src="/place-right.jpg" alt="right" />
        </aside>
      </div>
    </div>
  );
}
