import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  {
    id: 'video-4',
    youtubeId: 'fvEl8kxJKGs',
    title: 'La Matinale 26/10 : Acte II : les manifestations (interdites) vu de l’intérieur !',
    date: '',
  },
  {
    id: 'video-5',
    platform: 'dailymotion',
    dailymotionId: 'xbk1fcq',
    title: 'Pourquoi je quitte la Police : le secrétaire général du syndicat Vigi Police explique son choix',
    date: '',
  },
];

const base = `${import.meta.env.BASE_URL}tracts/`;

const TRACTS = [
  {
    id: 'malaise-services',
    title: 'VIGI dénonce un profond malaise dans les services',
    summary: 'VIGI alerte sur le manque d’effectifs, la charge de travail et les difficultés de management.',
    published_at: '',
    external_url: `${base}malaise-services.pdf`,
  },
  {
    id: 'marche-31-janvier',
    title: 'VIGI ne marchera pas aux côtés d’Alliance le 31 janvier',
    summary: 'Position du syndicat sur la mobilisation du 31 janvier 2026 et sur le pluralisme syndical.',
    published_at: '',
    external_url: `${base}marche-31-janvier.pdf`,
  },
  {
    id: 'civils-gendarmerie',
    title: 'VIGI s’ouvre aux personnels civils de la Gendarmerie',
    summary: 'Présentation de l’ouverture de VIGI aux personnels civils de la Gendarmerie.',
    published_at: '',
    external_url: `${base}civils-gendarmerie.pdf`,
  },
  {
    id: 'agents-prefectures',
    title: 'VIGI s’ouvre aux agents des préfectures',
    summary: 'Présentation de l’ouverture du syndicat aux agents administratifs, techniques et scientifiques des préfectures.',
    published_at: '',
    external_url: `${base}agents-prefectures.pdf`,
  },
];

export default function ContentPage({ type, title }) {
  const isVideo = type === 'video';
  const isTract = type === 'tract';

  const { items, loading, error } = useContent(
    isVideo || isTract ? null : type
  );

  const [params] = useSearchParams();

  const selectedTract = isTract
    ? TRACTS.find((item) => item.id === params.get('tract'))
    : null;

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');
  const [page, setPage] = useState(1);

  const sourceItems = isVideo
    ? VIDEOS
    : isTract
      ? TRACTS
      : items || [];

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

  if (selectedTract) {
    return (
      <main className="container content-page">
        <Link to="?" className="tract-detail__back">
          ← Retour aux tracts
        </Link>

        <div className="tract-detail">
          <div className="tract-detail__visual">
            <iframe
              src={`${selectedTract.external_url}#toolbar=0&navpanes=0&view=FitH`}
              title={`Document PDF : ${selectedTract.title}`}
              className="tract-detail__pdf"
            />

            <a
              className="tract-detail__download"
              href={selectedTract.external_url}
              download
            >
              Télécharger le PDF
            </a>
          </div>

          <div className="tract-detail__text">
            <h1>{selectedTract.title}</h1>
            <p>{selectedTract.summary}</p>

            <a
              href={selectedTract.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulter le PDF complet
            </a>
          </div>
        </div>
      </main>
    );
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

      {!isVideo && !isTract && loading && (
        <p>Chargement…</p>
      )}

      {!isVideo && !isTract && error && (
        <p role="alert">{error}</p>
      )}

      {(isVideo || isTract || (!loading && !error)) &&
        filtered.length === 0 && (
          <div
            className="content-page__empty"
            role="status"
          >
            <h2>
              {normalizedSearch
                ? 'Aucun résultat trouvé'
                : 'Aucune publication disponible'}
            </h2>

            <p>
              {normalizedSearch
                ? `Aucune publication ne correspond à « ${search.trim()} ». Essayez un autre mot-clé.`
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
        {(isVideo || isTract || (!loading && !error)) &&
          displayedItems.map((item) =>
            isVideo ? (
              <VideoCard
                key={item.id}
                item={item}
              />
            ) : isTract ? (
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

      {isVideo && filtered.length > 0 && (
        <nav
          className="content-page__pagination"
          aria-label="Pagination des vidéos"
        >
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
