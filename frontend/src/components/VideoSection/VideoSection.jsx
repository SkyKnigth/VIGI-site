import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent.js';
import VideoCard from '../VideoCard/VideoCard.jsx';
import './VideoSection.css';

export default function VideoSection() {
  const { items, loading, error } = useContent('video');

  return (
    <section className="section video-section" id="nos-videos">
      <div className="container">
        <div className="section-heading">
          <h2 className="display-title"><span className="title-mark">Les news en vidéos</span></h2>
          <Link className="btn" to="/videos">Nos vidéos</Link>
        </div>
        {loading && <p>Chargement des vidéos…</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && items.length === 0 && <p className="empty-state">Les vidéos officielles VIGI seront affichées ici dès leur ajout.</p>}
        {items.length > 0 && <>
          <VideoCard item={items[0]} featured />
          <div className="card-grid video-section__grid">{items.slice(1, 4).map((item) => <VideoCard item={item} key={item.id} />)}</div>
        </>}
      </div>
    </section>
  );
}
