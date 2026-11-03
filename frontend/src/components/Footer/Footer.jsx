import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { socials } from '../../data/socials.js';
import './Footer.css';
import XLogo from '../XLogo/XLogo.jsx';

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube };

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <img className="site-footer__logo" src="/images/vigi-logo.jpg" alt="Logo VIGI" />
        <h2>VIGI – Ministère de l'Intérieur</h2>
        <p>Syndicat des personnels du ministère de l'Intérieur</p>
      </div>
      <div className="container site-footer__bottom">
        <div className="site-footer__links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="site-footer__socials" aria-label="Réseaux sociaux de VIGI">
          {socials.map(({ label, url, type }) => {
            const Icon = socialIcons[type];
            return <a key={type} href={url} target="_blank" rel="noopener noreferrer" aria-label={`VIGI sur ${label}`} title={label}>
              {Icon ? <Icon size={22} aria-hidden="true" /> : <XLogo size={22} />}
            </a>;
          })}
        </div>
        <span>© {new Date().getFullYear()} VIGI</span>
      </div>
    </footer>
  );
}
