import { Link } from 'react-router-dom';
import './TractCard.css';

export default function TractCard({ item }) {
  return (
    <article className="tract-card">
      <Link
        to={`?tract=${encodeURIComponent(item.id)}`}
        className="tract-card__link"
        aria-label={`Consulter le tract : ${item.title}`}
      >
        <div className="tract-card__preview">
          <iframe
            src={`${item.external_url}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            title={`Aperçu du tract : ${item.title}`}
            loading="lazy"
            tabIndex={-1}
          />
        </div>

        <div className="tract-card__content">
          <h3>{item.title}</h3>
          {item.published_at && (
            <time dateTime={item.published_at}>
              {new Date(`${item.published_at}T12:00:00`).toLocaleDateString('fr-FR')}
            </time>
          )}
        </div>
      </Link>
    </article>
  );
}
