import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent.js';
import TractCard from '../TractCard/TractCard.jsx';
import './TractSection.css';

export default function TractSection() {
  const { items, loading, error } = useContent('tract');

  return (
    <section className="section tract-section" id="nos-tracts">
      <div className="container">
        <div className="section-heading">
          <h2 className="display-title"><span className="title-mark title-mark--red">Les tracts</span></h2>
          <Link className="btn" to="/tracts">Nos tracts</Link>
        </div>
        {loading && <p>Chargement des tracts…</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && items.length === 0 && <p className="empty-state">Les tracts officiels VIGI seront affichés ici dès leur ajout.</p>}
        <div className="tract-section__grid">{items.slice(0, 4).map((item) => <TractCard item={item} key={item.id} />)}</div>
      </div>
    </section>
  );
}
