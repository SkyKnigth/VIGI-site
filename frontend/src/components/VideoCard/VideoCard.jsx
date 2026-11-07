
import { useState } from 'react';
import './VideoCard.css';

export default function VideoCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const videoId = item.youtubeId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <article className="video-card">
      <div className="video-card__media">
        {playing ? (
          <iframe
            title={item.title}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            {!imageFailed ? (
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="video-card__placeholder">
                VIGI
              </div>
            )}

            <button
              type="button"
              className="video-card__trigger"
              onClick={() => setPlaying(true)}
              aria-label={`Lire ${item.title}`}
            >
              <span className="video-card__play">
                ▶
              </span>
            </button>
          </>
        )}
      </div>

      <div className="video-card__body">
        <p className="video-card__source">
          {item.source || 'YouTube'}
        </p>

        <h3>{item.title}</h3>

        {item.date && (
          <time dateTime={item.date}>
            {new Date(`${item.date}T12:00:00`).toLocaleDateString(
              'fr-FR',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }
            )}
          </time>
        )}

        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="video-card__original"
        >
          Regarder sur YouTube
        </a>
      </div>
    </article>
  );
}
