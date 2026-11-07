
import { useState } from 'react';
import { useContent } from '../../hooks/useContent.js';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import TractCard from '../../components/TractCard/TractCard.jsx';
import './ContentPage.css';

const VIDEOS = [
  {
    id: 'parisien-boucliers-2026',
    title: 'Boucliers stroboscopiques : la nouvelle arme anti-foule de la police',
    published_at: '2026-10-07',
    source: 'Le Parisien',
    external_url: 'https://www.dailymotion.com/video/xbjlbou',
    embed_url: 'https://www.dailymotion.com/embed/video/xbjlbou',
    image_url: 'https://www.dailymotion.com/thumbnail/video/xbjlbou',
  },
  {
    id: 'gigou-violences-2019',
    title: 'Jérôme Gigou : les violences contre les policiers',
    published_at: '2019-08-28',
    source: 'Entretien relayé par Nouvelles de France',
    external_url: 'https://ndf.fr/poing-de-vue/28-08-2019/les-policiers-en-ont-ras-le-bol-de-servir-de-punching-ball/',
  },
  {
    id: 'gigou-lbd-2019',
    title: 'Jérôme Gigou : l’utilisation des LBD en manifestation',
    published_at: '2019-06-13',
    source: 'Entretien vidéo (archive)',
    external_url: 'https://french.ava360.com/jerome-gigou-vigi-police-%C2%ABle-lbd-ne-devrait-pas-etre-utilise-pour-les-manifestations%C2%BB_8e6b479b8.html',
  },
];

export default function ContentPage({ type, title }) {
  const { items, loading, error } = useContent(
    type === 'video' ? null : type
  );

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');

  const isVideo = type === 'video';
  const sourceItems = isVideo ? VIDEOS : items;

  const filtered = sourceItems.filter(
    (item) =>
      item.title
        .toLocaleLowerCase('fr')
        .includes(search.toLocaleLowerCase('fr')) &&
      (!isVideo ||
        year === 'all' ||
        item.published_at.startsWith(year))
  );

  return (
    <main className="container content-page">
      <div className="page-intro">
        <h1 className="page-title">
          {isVideo ? 'VIGI dans les médias' : title}
        </h1>

        <p>
          {isVideo
            ? 'Retrouvez les interventions vidéo et prises de parole des représentants de VIGI.'
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
              <option value="2026">2026</option>
              <option value="2019">2019</option>
            </select>
          </label>
        )}
      </div>

      {!isVideo && loading && <p>Chargement…</p>}

      {!isVideo && error && <p role="alert">{error}</p>}

      {(isVideo || (!loading && !error)) &&
        filtered.length === 0 && (
          <p className="empty-state">
            Aucune publication disponible pour le moment.
          </p>
        )}

      <div className="card-grid content-page__grid">
        {(isVideo || (!loading && !error)) &&
          filtered.map((item) =>
            isVideo ? (
              <VideoCard item={item} key={item.id} />
            ) : type === 'tract' ? (
              <TractCard item={item} key={item.id} />
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

      {isVideo && (
        <p className="content-page__copyright">
          Les vidéos restent hébergées par leurs médias
          d'origine. Certaines peuvent être regardées
          directement sur cette page.
        </p>
      )}
    </main>
  );
}
