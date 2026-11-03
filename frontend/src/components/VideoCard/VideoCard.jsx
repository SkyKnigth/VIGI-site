import { Play } from 'lucide-react';
import './VideoCard.css';

export default function VideoCard({ item, featured = false }) {
  return (
    <article className={`video-card ${featured ? 'video-card--featured' : ''}`}>
      <a className="video-card__media" href={item.external_url} target="_blank" rel="noopener noreferrer" aria-label={`Voir la vidéo : ${item.title}`}>
        <img src={item.image_url || '/images/video-placeholder.svg'} alt="" loading="lazy" />
        <span className="video-card__play"><Play fill="currentColor" size={30} /></span>
      </a>
      <div className="video-card__body">
        <h3>{item.title}</h3>
        <time dateTime={item.published_at}>{new Date(`${item.published_at}T12:00:00`).toLocaleDateString('fr-FR')}</time>
        {featured && <a className="btn btn--solid" href={item.external_url} target="_blank" rel="noopener noreferrer">Voir la vidéo</a>}
      </div>
    </article>
  );
}
