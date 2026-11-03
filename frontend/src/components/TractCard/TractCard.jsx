import './TractCard.css';

export default function TractCard({ item }) {
  return (
    <article className="tract-card">
      <a href={item.external_url} target="_blank" rel="noopener noreferrer" aria-label={`Consulter le tract : ${item.title}`}>
        <img src={item.image_url || '/images/tract-placeholder.svg'} alt={`Visuel du tract : ${item.title}`} loading="lazy" />
      </a>
      <div className="tract-card__body">
        <h3>{item.title}</h3>
        <time dateTime={item.published_at}>{new Date(`${item.published_at}T12:00:00`).toLocaleDateString('fr-FR')}</time>
      </div>
    </article>
  );
}
