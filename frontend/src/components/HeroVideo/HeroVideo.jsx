import { Link } from 'react-router-dom';
import './HeroVideo.css';

export default function HeroVideo() {
  return (
    <section className="hero" aria-label="Présentation de VIGI">
      <video className="hero__video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/videos/vigi-accueil.mp4" type="video/mp4" />
      </video>
      <div className="hero__shade" />
      <div className="hero__content container">
        <p className="hero__eyebrow">VIGI – Ministère de l'Intérieur</p>
        <h1>Défendre ceux<br />qui protègent.</h1>
        <p>Un syndicat au service des personnels et de leurs droits.</p>
        <Link to="/presentation" className="btn btn--red">Découvrir VIGI</Link>
      </div>
    </section>
  );
}
