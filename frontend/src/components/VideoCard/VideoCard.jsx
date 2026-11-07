import { useState } from 'react';
import './VideoCard.css';

export default function VideoCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const videoUrl = `https://www.youtube.com/watch?v=${item.youtubeId}`;
  const thumbnail = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

  return (
    <article className="video-card">
      <div className="video-card__media">
        {playing ? (
          <iframe
            title={item.title}
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
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
              aria-label={`Lire la vidéo : ${item.title}`}
            >
              <span className="video-card__play">▶</span>
            </button>
          </>
        )}
      </div>

      <div className="video-card__body">
        <h3>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        </h3>

        {item.date && (
          <time dateTime={item.date}>
            {new Date(`${item.date}T12:00:00`).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        )}
      </div>
    </article>
  );
}
