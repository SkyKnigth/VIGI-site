import { Facebook, Instagram, Youtube } from 'lucide-react';
import { socials } from '../../data/socials.js';
import './SocialSection.css';
import XLogo from '../XLogo/XLogo.jsx';

const icons = { facebook: Facebook, instagram: Instagram, youtube: Youtube, x: XLogo };

export default function SocialSection() {
  return (
    <section className="section social-section container">
      <h2>Suivez-nous</h2>
      <div className="social-section__grid">
        {socials.map((social) => {
          const Icon = icons[social.type];
          return <div className="social-section__card" key={social.label}>
            <Icon size={36} aria-hidden="true" />
            <h3>{social.label}</h3>
            {social.url ? <a className="btn" href={social.url} target="_blank" rel="noopener noreferrer">Voir notre compte</a> : <p>Compte officiel à renseigner</p>}
          </div>;
        })}
      </div>
    </section>
  );
}
