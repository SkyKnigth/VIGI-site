import { useState } from 'react';
import { useContent } from '../../hooks/useContent.js';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import TractCard from '../../components/TractCard/TractCard.jsx';
import './ContentPage.css';

export default function ContentPage({ type, title }) {
  const { items, loading, error } = useContent(type);
  const [search, setSearch] = useState('');
  const filtered = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return <main className="container content-page">
    <div className="page-intro"><h1 className="page-title">{title}</h1><p>Retrouvez les publications officielles de VIGI.</p></div>
    <label className="field content-page__filter">Rechercher une publication
      <input type="search" placeholder="Rechercher par titre" value={search} onChange={(event) => setSearch(event.target.value)} />
    </label>
    {loading && <p>Chargement…</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && !error && filtered.length === 0 && <p className="empty-state">Aucune publication disponible pour le moment.</p>}
    <div className="card-grid">{filtered.map((item) => type === 'video' ? <VideoCard item={item} key={item.id} /> : type === 'tract' ? <TractCard item={item} key={item.id} /> : <article className="content-page__article" key={item.id}><h2>{item.title}</h2><p>{item.summary}</p>{item.external_url && <a href={item.external_url} target="_blank" rel="noopener noreferrer">Lire la publication</a>}</article>)}</div>
  </main>;
}
