import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UsersRound, Scale, ArrowRight } from 'lucide-react';
import './Presentation.css';

const base = import.meta.env.BASE_URL;

const history = [
  {
    year: '1883',
    title: 'Les origines',
    text: 'Création de la Société amicale des personnels de la Préfecture de police, point de départ de l’histoire syndicale revendiquée par VIGI.',
  },
  {
    year: '1906',
    title: 'Une fédération nationale',
    text: 'L’organisation devient la Fédération des sociétés amicales de la police de France et des colonies.',
  },
  {
    year: '1944',
    title: 'La Libération de Paris',
    text: 'Selon l’histoire publiée par VIGI, des adhérents de l’organisation participent à la Libération de Paris.',
  },
  {
    year: '1946',
    title: 'La période CGT-Police',
    text: 'L’organisation prend le nom de Fédération CGT-Police, qu’elle conserve pendant plusieurs décennies.',
  },
  {
    year: '2017',
    title: 'Naissance du nom VIGI',
    text: 'Au congrès de juin 2017, la fédération adopte le nom VIGI – Ministère de l’Intérieur, tout en restant alors affiliée à la CGT.',
  },
  {
    year: '2018',
    title: 'L’indépendance',
    text: 'À l’occasion des élections professionnelles de décembre 2018, VIGI quitte la CGT et reprend son indépendance syndicale.',
  },
  {
    year: '2022',
    title: 'Une nouvelle équipe',
    text: 'Élection d’un nouveau bureau et de Jérôme Gigou au poste de secrétaire général.',
  },
  {
    year: '2024',
    title: 'Une ambition européenne',
    text: 'VIGI entreprend des démarches pour rejoindre la fédération européenne de syndicats de police EUPol.',
  },
  {
    year: '2025',
    title: 'Un périmètre élargi',
    text: 'VIGI annonce son adhésion à EUPol et étend son action aux agents des préfectures ainsi qu’aux personnels civils de la Gendarmerie.',
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Défendre',
    text: 'Accompagner les agents dans la défense de leurs droits, de leurs carrières et de leurs conditions de travail.',
  },
  {
    icon: Scale,
    title: 'Agir avec équité',
    text: 'Défendre des décisions justes, fondées sur les règles applicables, sans passe-droit ni favoritisme.',
  },
  {
    icon: UsersRound,
    title: 'Rassembler',
    text: 'Faire travailler ensemble les personnels de tous corps, grades et services, plutôt que les opposer.',
  },
];

const events = [
  {
    id: 'congres',
    label: 'CONGRÈS 2026',
    title: 'CONGRÈS VIGI 2026',
    text: 'Le congrès VIGI 2026 a été coorganisé avec nos alliés de la FA-MI Force et Honneur, dans la perspective des élections professionnelles de décembre 2026. Ce rassemblement témoigne de notre volonté commune de défendre les droits et les intérêts des personnels du ministère de l’Intérieur.',
    images: [
      {
        src: `${base}images/evenements/congres-vigi-1.jpg`,
        alt: 'Congrès VIGI 2026, première photographie',
      },
      {
        src: `${base}images/evenements/congres-vigi-2.jpg`,
        alt: 'Congrès VIGI 2026, deuxième photographie',
      },
    ],
  },
  {
    id: 'eupol',
    label: 'ENGAGEMENT EUROPÉEN',
    title: 'VIGI À L’ÉCHELLE EUROPÉENNE',
    text: 'Sous l’impulsion de son secrétaire général, Jérôme Gigou, VIGI renforce sa présence à l’échelle européenne en rejoignant EU.Pol, la Fédération européenne des syndicats de police. Cette adhésion permet de développer les échanges avec d’autres organisations européennes et de porter les préoccupations des personnels au-delà des frontières françaises.',
    images: [
      {
        src: `${base}images/evenements/eupol-vigi-1.jpg`,
        alt: 'Rencontre européenne de VIGI, première photographie',
      },
      {
        src: `${base}images/evenements/eupol-vigi-2.jpg`,
        alt: 'Rencontre européenne de VIGI, deuxième photographie',
      },
    ],
  },
  {
    id: 'hommage',
    label: 'HOMMAGE',
    title: 'HOMMAGE À UN COLLÈGUE DISPARU TROP TÔT',
    text: 'VIGI a tenu à rendre hommage à un collègue disparu prématurément. À travers sa présence et le dépôt d’une gerbe de fleurs, le syndicat a souhaité honorer sa mémoire et témoigner de sa solidarité envers ses proches. Un moment de recueillement et de respect, pour ne pas oublier celles et ceux qui nous ont quittés trop tôt.',
    images: [
      {
        src: `${base}images/evenements/hommage-vigi-1.jpg`,
        alt: 'Hommage rendu par VIGI à un collègue disparu, première photographie',
      },
      {
        src: `${base}images/evenements/hommage-vigi-2.jpg`,
        alt: 'Hommage rendu par VIGI à un collègue disparu, deuxième photographie',
      },
    ],
  },
];

export default function Presentation() {
  const [active, setActive] = useState(0);

  return (
    <main className="presentation">
      <section className="presentation-hero">
        <div className="presentation-inner">
          <span className="presentation-eyebrow">LE SYNDICAT</span>

          <h1>
            UNE HISTOIRE.
            <br />
            UNE VOIX <em>INDÉPENDANTE.</em>
          </h1>

          <p>
            Héritier d’une histoire syndicale remontant à 1883,
            VIGI – Ministère de l’Intérieur défend les personnels,
            quels que soient leur métier, leur grade ou leur affectation.
          </p>

          <div className="presentation-hero-stats">
            <div>
              <strong>1883</strong>
              <span>Origines historiques</span>
            </div>

            <div>
              <strong>2018</strong>
              <span>Indépendance retrouvée</span>
            </div>

            <div>
              <strong>2025</strong>
              <span>Ouverture à de nouveaux personnels</span>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-section presentation-lead presentation-inner">
        <div className="presentation-lead-copy">
          <span className="presentation-tag">NOTRE ENGAGEMENT</span>

          <h2>
            UN SYNDICAT POUR <span>TOUS LES PERSONNELS</span>
          </h2>

          <p>
            Police nationale, préfectures, personnels civils de la
            Gendarmerie : VIGI défend une vision collective du service
            public et refuse que les métiers ou les grades soient
            opposés les uns aux autres.
          </p>

          <p>
            Son action porte notamment sur des effectifs suffisants,
            de meilleures conditions de travail, une rémunération plus
            juste et le respect des droits de chaque agent.
          </p>
        </div>

        <aside className="presentation-secretary">
          <div className="presentation-avatar">
            <img
              src={`${base}images/jerome-gigou.png`}
              alt="Portrait de Jérôme Gigou"
              className="presentation-secretary-photo"
            />
          </div>

          <h3>JÉRÔME GIGOU</h3>

          <p>
            Secrétaire général de VIGI – Ministère de l’Intérieur
          </p>
        </aside>
      </section>

      <section className="presentation-section presentation-history">
        <div className="presentation-inner">
          <span className="presentation-tag">NOTRE HISTOIRE</span>

          <h2>
            DE 1883 À <span>AUJOURD’HUI</span>
          </h2>

          <p className="presentation-section-intro">
            Une histoire qui traverse plusieurs générations et
            accompagne l’évolution des personnels du ministère de
            l’Intérieur.
          </p>

          <div
            className="presentation-timeline"
            role="group"
            aria-label="Choisir une date de l’histoire de VIGI"
          >
            {history.map((item, index) => (
              <button
                type="button"
                key={item.year}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="presentation-dot" />
                <strong>{item.year}</strong>
              </button>
            ))}
          </div>

          <div className="presentation-history-detail" aria-live="polite">
            <span>{history[active].year}</span>

            <div>
              <h3>{history[active].title}</h3>
              <p>{history[active].text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-section presentation-events">
        <div className="presentation-inner">
          <span className="presentation-tag">NOS ÉVÉNEMENTS</span>

          <h2>
            NOS ACTIONS <span>EN IMAGES</span>
          </h2>

          <p className="presentation-section-intro">
            Des rencontres, des engagements et des moments de solidarité
            qui témoignent de la présence de VIGI auprès des personnels.
          </p>

          <div className="presentation-events-list">
            {events.map((event) => (
              <article className="presentation-event" key={event.id}>
                <div className="presentation-event__heading">
                  <span className="presentation-event__label">
                    {event.label}
                  </span>

                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </div>

                <div className="presentation-event__gallery">
                  {event.images.map((photo) => (
                    <figure key={photo.src}>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="presentation-section presentation-inner">
        <span className="presentation-tag presentation-tag-red">
          NOS VALEURS
        </span>

        <h2>
          CE QUI NOUS <span>RASSEMBLE</span>
        </h2>

        <div className="presentation-values">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={36} strokeWidth={1.6} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="presentation-section presentation-priorities">
        <div className="presentation-inner">
          <span className="presentation-tag">NOS PRIORITÉS</span>

          <h2>
            DES DROITS RESPECTÉS.
            <br />
            <span>UN SERVICE PUBLIC RENFORCÉ.</span>
          </h2>

          <div className="presentation-priority-grid">
            <article>
              <h3>Conditions de travail</h3>
              <p>
                Demander des effectifs adaptés aux missions et lutter
                contre l’accumulation d’heures supplémentaires et les
                situations de travail dégradées.
              </p>
            </article>

            <article>
              <h3>Reconnaissance et rémunération</h3>
              <p>
                Défendre une revalorisation collective et questionner
                les dispositifs de primes individuelles qui peuvent
                mettre les agents en concurrence.
              </p>
            </article>

            <article>
              <h3>Respect des règles</h3>
              <p>
                Accompagner les collègues lorsqu’ils contestent une
                décision injuste ou demandent l’application des
                textes en vigueur.
              </p>
            </article>

            <article>
              <h3>Connaissance des droits</h3>
              <p>
                Rendre les règles compréhensibles et diffuser des
                informations pratiques fondées sur les références
                réglementaires et juridiques.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="presentation-section presentation-inner presentation-action">
        <div>
          <h2>
            VOTRE QUOTIDIEN <span>VOUS APPARTIENT</span>
          </h2>

          <p>
            Un agent informé et entouré est mieux armé pour faire
            respecter ses droits. VIGI entend mettre l’entraide et
            la solidarité au cœur de son action.
          </p>
        </div>

        <Link to="/adherer" className="presentation-join">
          Découvrir l’adhésion
          <ArrowRight size={20} />
        </Link>
      </section>
    </main>
  );
}
