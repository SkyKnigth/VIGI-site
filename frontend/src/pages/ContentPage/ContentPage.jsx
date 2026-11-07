
import { useState } from 'react';
import { useContent } from '../../hooks/useContent.js';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import TractCard from '../../components/TractCard/TractCard.jsx';
import './ContentPage.css';

const VIDEOS = [
  {
    id: 'video-1',
    youtubeId: 'ou2Hz8h-Jog',
    title: 'Vidéo VIGI – 1',
    source: 'YouTube',
    date: '',
  },
  {
    id: 'video-2',
    youtubeId: 's6VHSStr-yY',
    title: 'Vidéo VIGI – 2',
    source: 'YouTube',
    date: '',
  },
  {
    id: 'video-3',
    youtubeId: 'H-ZxNdt1GqY',
    title: 'Vidéo VIGI – 3',
    source: 'YouTube',
    date: '',
  },
];

export default function ContentPage({ type, title }) {
  const { items, loading, error } = useContent(
    type === 'video' ? null : type
  );

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');

  const isVideo = type === 'video';
  const sourceItems = isVideo ? VIDEOS : items || [];

  const normalizedSearch = search.trim().toLocaleLowerCase('fr');

  const years = isVideo
    ? [...new Set(
        VIDEOS
          .filter((video) => video.date)
          .map((video) => video.date.slice(0, 4))
      )].sort((a, b) => b.localeCompare(a))
    : [];

  const filtered = sourceItems.filter((item) => {
    const searchableText = [
      item.title,
      item.source,
      item.summary,
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('fr');

    const matchesSearch = searchableText.includes(normalizedSearch);

    const matchesYear =
      !isVideo ||
      year === 'all' ||
      (item.date || '').startsWith(year);

    return matchesSearch && matchesYear;
  });

  return (
    <main className="container content-page">
      <div className="page-intro">
        <h1 className="page-title">
          {isVideo ? 'Nos vidéos' : title}
        </h1>

        <p>
          {isVideo
            ? 'Retrouvez les vidéos et interventions de VIGI.'
            : 'Retrouvez les publications officielles de VIGI.'}
        </p>
      </div>

      <div className="content-page__controls">
        <label className="field content-page__filter">
          Rechercher une publication

          <input
            type="search"
            placeholder="Rechercher par titre"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        {isVideo && (
          <label className="field content-page__year">
            Filtrer par année

            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="all">Toutes</option>

              {years.map((availableYear) => (
                <option
                  key={availableYear}
                  value={availableYear}
                >
                  {availableYear}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {!isVideo && loading && (
        <p>Chargement…</p>
      )}

      {!isVideo && error && (
        <p role="alert">{error}</p>
      )}

      {(isVideo || (!loading && !error)) &&
        filtered.length === 0 && (
          <div
            className="content-page__empty"
            role="status"
          >
            <h2>
              {normalizedSearch
                ? 'Aucun résultat trouvé'
                : isVideo
                  ? 'Aucune vidéo disponible'
                  : 'Aucune publication disponible'}
            </h2>

            <p>
              {normalizedSearch
                ? `Aucune vidéo ou publication ne correspond à « ${search.trim()} ». Essayez un autre mot-clé.`
                : 'Aucun contenu ne correspond aux filtres sélectionnés.'}
            </p>

            {(normalizedSearch || year !== 'all') && (
              <button
                type="button"
                className="content-page__reset"
                onClick={() => {
                  setSearch('');
                  setYear('all');
                }}
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}

      <div className="content-page__grid">
        {(isVideo || (!loading && !error)) &&
          filtered.map((item) =>
            isVideo ? (
              <VideoCard
                key={item.id}
                item={item}
              />
            ) : type === 'tract' ? (
              <TractCard
                key={item.id}
                item={item}
              />
            ) : (
              <article
                className="content-page__article"
                key={item.id}
              >
                <h2>{item.title}</h2>
                <p>{item.summary}</p>

                {item.external_url && (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lire la publication
                  </a>
                )}
              </article>
            )
          )}
      </div>
    </main>
  );
}
