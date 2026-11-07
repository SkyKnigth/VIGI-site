
import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import './VideoCard.css';

export default function VideoCard({ item, featured = false }) {
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const canEmbed = Boolean(item.embed_url);

  return (
    <article className={`video-card ${featured ? 'video-card--featured' : ''}`}>
      <div className="video-card__media">
        {playing && canEmbed ? (
          <iframe
            title={item.title}
            src={item.embed_url}
            allow="autoplay; fullscreen; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            {item.image_url && !imageFailed ? (
              <img
                src={item.image_url}
                alt=""
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="video-card__placeholder">
                VIGI
                <small>Dans les médias</small>
              </span>
            )}

            {canEmbed ? (
              <button
                className="video-card__trigger"
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Lire la vidéo sur cette page : ${item.title}`}
              >
                <span className="video-card__play">
                  <Play fill="currentColor" size={27} />
                </span>
              </button>
            ) : (
              <a
                className="video-card__trigger"
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Voir la vidéo sur le site source : ${item.title}`}
              >
                <span className="video-card__play">
                  <Play fill="currentColor" size={27} />
                </span>
              </a>
            )}
          </>
        )}
      </div>

      <div className="video-card__body">
        <p className="video-card__source">
          {item.source || 'VIGI'}
        </p>

        <h3>{item.title}</h3>

        <time dateTime={item.published_at}>
          {new Date(`${item.published_at}T12:00:00`).toLocaleDateString(
            'fr-FR',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          )}
        </time>

        <a
          className="video-card__original"
          href={item.external_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir la source
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
