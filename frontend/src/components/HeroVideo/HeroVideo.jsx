import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroVideo.css';

export default function HeroVideo() {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const start = () => video.play().catch(() => {});
    start();
    document.addEventListener('visibilitychange', start);
    return () => document.removeEventListener('visibilitychange', start);
  }, []);
  return (
    <section className="hero" aria-label="Présentation de VIGI">
      <video ref={videoRef} className="hero__video" autoPlay muted loop playsInline preload="auto" poster={`${import.meta.env.BASE_URL}images/vigi-video-poster.jpg`} aria-hidden="true">
        <source src={`${import.meta.env.BASE_URL}videos/vigi-accueil.mp4`} type="video/mp4" />
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
