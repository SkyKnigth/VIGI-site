import { Link } from 'react-router-dom';
import './TractCard.css';

export default function TractCard({ item }) {
  const detailUrl = `?tract=${encodeURIComponent(item.id)}`;

  return (
    <article className="tract-card">
      <div className="tract-card__preview">
        <iframe
          src={`${item.external_url}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          title={`Aperçu du tract : ${item.title}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />

        <Link
          className="tract-card__preview-link"
          to={detailUrl}
          aria-label={`Consulter le tract : ${item.title}`}
        />
      </div>

      <div className="tract-card__body">
        <h3>
          <Link to={detailUrl}>{item.title}</Link>
        </h3>

        {item.published_at && (
          <time dateTime={item.published_at}>
            {new Date(`${item.published_at}T12:00:00`).toLocaleDateString('fr-FR')}
          </time>
        )}
      </div>
    </article>
  );
}
