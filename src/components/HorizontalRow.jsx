export default function HorizontalRow({ items = [] }) {
  return (
    <div className="row">
      {items.map((it) => (
        <div className="card" key={it.id}>
          <img className="poster" src={it.poster} alt={it.title} />
          {it.rank && <div className="badge">{it.rank}</div>}
          <div className="caption">{it.title}</div>
        </div>
      ))}
    </div>
  );
}
