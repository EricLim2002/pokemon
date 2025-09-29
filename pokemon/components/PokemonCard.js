export default function PokemonCard({ pokemon }) {
  const { name, image, types } = pokemon;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: 12,
      border: '1px solid #eee',
      borderRadius: 8,
      marginBottom: 8,
      background: '#fff'
    }}>
      <div style={{ width: 72, height: 72, marginRight: 12 }}>
        <img src={image || '/placeholder-pokemon.png'} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div>
        <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{name}</div>
        <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
          {types?.map(t => (
            <span key={t} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: '#f2f2f2', textTransform: 'capitalize' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
