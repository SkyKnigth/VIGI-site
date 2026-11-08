import {
  UsersRound,
  ShieldCheck,
  Scale,
  Wallet,
  Handshake,
} from 'lucide-react';
import './FastFacts.css';

const indicators = [
  {
    icon: UsersRound,
    label: 'Tous les personnels',
    text: 'Défendre les agents du ministère de l’Intérieur, quels que soient leur corps, leur grade ou leur service.',
  },
  {
    icon: ShieldCheck,
    label: 'Conditions de travail',
    text: 'Revendiquer des effectifs suffisants, limiter les heures supplémentaires et améliorer le quotidien des agents.',
  },
  {
    icon: Scale,
    label: 'Respect des droits',
    text: 'Accompagner les personnels face aux décisions injustes et défendre l’application des textes réglementaires.',
  },
  {
    icon: Wallet,
    label: 'Rémunération juste',
    text: 'Privilégier les augmentations collectives et défendre une meilleure reconnaissance du travail des agents.',
  },
  {
    icon: Handshake,
    label: 'Indépendance syndicale',
    text: 'Agir librement, sans dépendre de l’administration, grâce au soutien et aux cotisations des adhérents.',
  },
];

export default function FastFacts() {
  return (
    <section className="section facts container">
      <h2>Nos engagements</h2>

      <p className="facts__intro">
        Des revendications concrètes pour défendre les personnels
        et améliorer leurs conditions de travail.
      </p>

      <div className="facts__grid">
        {indicators.map(({ icon: Icon, label, text }) => (
          <article className="facts__card" key={label}>
            <Icon
              className="facts__icon"
              size={36}
              strokeWidth={1.6}
              aria-hidden="true"
            />

            <h3>{label}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
