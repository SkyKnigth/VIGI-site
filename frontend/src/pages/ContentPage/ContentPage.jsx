
import { useState } from 'react';
import { useContent } from '../../hooks/useContent.js';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import TractCard from '../../components/TractCard/TractCard.jsx';
import './ContentPage.css';

const VIDEOS_PER_PAGE = 9;

const VIDEOS = [
  {
    id: 'video-1',
    youtubeId: 'ou2Hz8h-Jog',
    title: 'Boucliers anti-vidéos : les nouveaux équipements de la police',
    date: '',
  },
  {
    id: 'video-2',
    youtubeId: 's6VHSStr-yY',
    title: '« La France a tué mon mari » : témoignage et polémique',
    date: '',
  },
  {
    id: 'video-3',
    youtubeId: 'H-ZxNdt1GqY',
    title: 'Policiers et Gilets jaunes : vers une union sacrée ?',
    date: '',
  },
];

export default function ContentPage({ type, title }) {
  const isVideo = type === 'video';

  const { items, loading, error } = useContent(
    isVideo ? null : type
  );

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');
  const [page, setPage] = useState(1);

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

  const totalPages = isVideo
    ? Math.max(1, Math.ceil(filtered.length / VIDEOS_PER_PAGE))
    : 1;

  const currentPage = Math.min(page, totalPages);

  const displayedItems = isVideo
    ? filtered.slice(
        (currentPage - 1) * VIDEOS_PER_PAGE,
        currentPage * VIDEOS_PER_PAGE
      )
    : filtered;

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function changeYear(value) {
    setYear(value);
    setPage(1);
  }

  function changePage(nextPage) {
    setPage(nextPage);
    document.querySelector('.content-page__controls')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

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
            onChange={(event) => changeSearch(event.target.value)}
          />
        </label>

        {isVideo && years.length > 0 && (
          <label className="field content-page__year">
            Filtrer par année

            <select
              value={year}
              onChange={(event) => changeYear(event.target.value)}
            >
              <option value="all">Toutes</option>

              {years.map((availableYear) => (
                <option key={availableYear} value={availableYear}>
                  {availableYear}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {!isVideo && loading && <p>Chargement…</p>}

      {!isVideo && error && <p role="alert">{error}</p>}

      {(isVideo || (!loading && !error)) &&
        filtered.length === 0 && (
          <div className="content-page__empty" role="status">
            <h2>
              {normalizedSearch
                ? 'Aucun résultat trouvé'
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
                  setPage(1);
                }}
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}

      <div className="content-page__grid">
        {(isVideo || (!loading && !error)) &&
          displayedItems.map((item) =>
            isVideo ? (
              <VideoCard key={item.id} item={item} />
            ) : type === 'tract' ? (
              <TractCard key={item.id} item={item} />
            ) : (
              <article className="content-page__article" key={item.id}>
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

      {isVideo && filtered.length > 0 && (
        <nav className="content-page__pagination" aria-label="Pagination des vidéos">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Précédent
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Suivant
          </button>
        </nav>
      )}
    </main>
  );
}
