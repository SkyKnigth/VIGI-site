import { useSearchParams, Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent.js';
import TractCard from '../../components/TractCard/TractCard.jsx';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import './ContentPage.css';

const base = `${import.meta.env.BASE_URL}tracts/`;

const VIDEOS = [
  {
    id: 'video-1',
    youtubeId: 'ou2Hz8h-Jog',
    title: 'Boucliers anti-vidéos : les nouveaux équipements de la police',
    date: '',
  },
  {
    id: 'video-2',
    youtubeId: 's6VHSStr-yY',
    title: '« La France a tué mon mari » : témoignage et polémique',
    date: '',
  },
  {
    id: 'video-3',
    youtubeId: 'H-ZxNdt1GqY',
    title: 'Policiers et Gilets jaunes : vers une union sacrée ?',
    date: '',
  },
  {
    id: 'video-4',
    youtubeId: 'fvEl8kxJKGs',
    title: 'La Matinale 26/10 : Acte II : les manifestations (interdites) vu de l’intérieur !',
    date: '',
  },
  {
    id: 'video-5',
    platform: 'dailymotion',
    dailymotionId: 'xbk1fcq',
    title: 'Pourquoi je quitte la Police : le secrétaire général du syndicat Vigi Police explique son choix',
    date: '',
  },
];

const TRACTS = [
  {
    id: 'malaise-services',
    title: 'VIGI dénonce un profond malaise dans les services',
    summary: 'VIGI alerte sur le manque d’effectifs, la charge de travail et les difficultés de management.',
    published_at: '',
    external_url: `${base}malaise-services.pdf`,
  },
  {
    id: 'marche-31-janvier',
    title: 'VIGI ne marchera pas aux côtés d’Alliance le 31 janvier',
    summary: 'Position du syndicat sur la mobilisation du 31 janvier et sur le pluralisme syndical.',
    published_at: '2026-01-20',
    external_url: `${base}marche-31-janvier.pdf`,
  },
  {
    id: 'civils-gendarmerie',
    title: 'VIGI s’ouvre aux personnels civils de la Gendarmerie',
    summary: 'Présentation de l’ouverture de VIGI aux personnels civils de la Gendarmerie.',
    published_at: '',
    external_url: `${base}civils-gendarmerie.pdf`,
  },
  {
    id: 'agents-prefectures',
    title: 'VIGI s’ouvre aux agents des préfectures',
    summary: 'Présentation de l’ouverture du syndicat aux agents administratifs, techniques et scientifiques des préfectures.',
    published_at: '',
    external_url: `${base}agents-prefectures.pdf`,
  },
  {
    id: 'trois-membres-bureau',
    title: 'VIGI dénonce des mesures visant trois membres du bureau national',
    summary: 'Le syndicat dénonce les mesures administratives et judiciaires concernant trois membres de son bureau national.',
    published_at: '',
    external_url: `${base}3-morts.pdf`,
  },
  {
    id: 'promotion-mayotte',
    title: 'Promotion controversée d’un major à Mayotte',
    summary: 'VIGI conteste une promotion au commissariat de Mamoudzou et dénonce le favoritisme dans les avancements.',
    published_at: '',
    external_url: `${base}POLICE-promo-copinage-a-Mayotte.pdf`,
  },
  {
    id: 'titularisation-gendarmerie',
    title: 'VIGI demande la titularisation d’un agent de la Gendarmerie',
    summary: 'VIGI demande la titularisation d’un agent contractuel après une affectation contestée et défend la reconnaissance de son engagement professionnel.',
    published_at: '',
    external_url: `${base}raoul-vigi-wanted.pdf`,
  },
  {
    id: 'policiers-premiere-ligne-europe',
    title: 'L’Europe reconnaît les policiers en première ligne',
    summary: 'VIGI défend la reconnaissance des risques professionnels, des violences subies et des besoins en équipements des policiers.',
    published_at: '',
    external_url: `${base}policiers-premiere-ligne-europe.pdf`,
  },
  {
    id: 'devenir-delegue-syndical',
    title: 'Devenir délégué syndical VIGI',
    summary: 'Un appel à l’engagement pour défendre les collègues, leurs droits et leurs conditions de travail.',
    published_at: '',
    external_url: `${base}devenir-delegue-syndical.pdf`,
  },
  {
    id: 'vigi-reprenons-la-parole',
    title: 'VIGI : reprenons la parole',
    summary: 'Moins de bureaucratie, davantage de présence sur le terrain et une meilleure défense des personnels.',
    published_at: '',
    external_url: `${base}vigi-reprenons-la-parole.pdf`,
  },
  {
    id: 'vigi-combats-a-nos-cotes',
    title: 'VIGI : combats à nos côtés',
    summary: 'Une invitation à rejoindre VIGI et à s’engager dans la représentation syndicale.',
    published_at: '',
    external_url: `${base}vigi-combats-a-nos-cotes.pdf`,
  },
  {
    id: 'independance-syndicale',
    title: 'VIGI défend son indépendance syndicale',
    summary: 'Le syndicat affirme son indépendance et critique le fonctionnement des organisations syndicales majoritaires.',
    published_at: '',
    external_url: `${base}independance-syndicale.pdf`,
  },
  {
    id: 'choose-france-rations',
    title: 'Choose France 2026 : VIGI dénonce les rations périmées',
    summary: 'VIGI dénonce la distribution présumée de rations périmées aux policiers mobilisés pour la sécurité du sommet.',
    published_at: '',
    external_url: `${base}choose-france-rations.pdf`,
  },
  {
    id: 'debut-carriere-smic',
    title: 'Débuts de carrière : le SMIC rattrape la Police nationale',
    summary: 'VIGI demande une revalorisation des débuts de carrière et une progression salariale plus cohérente.',
    published_at: '',
    external_url: `${base}debut-carriere-smic.pdf`,
  },
  {
    id: 'mobilisation-30-juin-bercy',
    title: 'Mobilisation du 30 juin devant Bercy',
    summary: 'VIGI appelle les personnels à se mobiliser pour leurs conditions de travail, leurs missions et leur reconnaissance.',
    published_at: '2026-06-22',
    external_url: `${base}mobilisation-30-juin-bercy.pdf`,
  },
];

const sortedTracts = TRACTS
  .map((tract, index) => ({
    ...tract,
    originalIndex: index,
  }))
  .sort((a, b) => {
    if (a.published_at && b.published_at) {
      return b.published_at.localeCompare(a.published_at);
    }

    if (a.published_at) return -1;
    if (b.published_at) return 1;

    return b.originalIndex - a.originalIndex;
  });

export default function ContentPage({ type }) {
  const isVideo = type === 'video';
  const isTract = type === 'tract';

  const [params] = useSearchParams();

  const { items: contentItems = [] } = useContent(
    isVideo || isTract ? null : type
  );

  const selectedTractId = params.get('tract');

  const selectedTract = isTract
    ? TRACTS.find((item) => item.id === selectedTractId)
    : null;

  if (isTract && selectedTract) {
    return (
      <main className="content-page container">
        <Link to="?" className="tract-detail__back">
          ← Retour à nos tracts
        </Link>

        <section className="tract-detail">
          <div className="tract-detail__document">
            <iframe
              src={`${selectedTract.external_url}#toolbar=0&navpanes=0&view=Fit`}
              title={selectedTract.title}
            />
          </div>

          <div className="tract-detail__info">
            <h1>{selectedTract.title}</h1>

            {selectedTract.published_at && (
              <p>
                Publié le{' '}
                {new Date(
                  `${selectedTract.published_at}T12:00:00`
                ).toLocaleDateString('fr-FR')}
              </p>
            )}

            <p>{selectedTract.summary}</p>

            <a
              href={selectedTract.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="tract-detail__open"
            >
              Consulter le PDF complet
            </a>

            <a
              href={selectedTract.external_url}
              download
              className="tract-detail__download"
            >
              Télécharger le PDF
            </a>
          </div>
        </section>
      </main>
    );
  }

  const items = isVideo
    ? VIDEOS
    : isTract
      ? sortedTracts
      : contentItems;

  const title = isVideo
    ? 'Nos vidéos'
    : isTract
      ? 'Nos tracts'
      : 'Nos publications';

  return (
    <main className="content-page container">
      <h1>{title}</h1>

      <div className="content-page__grid">
        {items.map((item) => {
          if (isVideo) {
            return (
              <VideoCard
                key={item.id}
                item={item}
              />
            );
          }

          if (isTract) {
            return (
              <TractCard
                key={item.id}
                item={item}
              />
            );
          }

          return (
            <TractCard
              key={item.id}
              item={item}
            />
          );
        })}
      </div>

      {items.length === 0 && (
        <p>Aucune publication disponible pour le moment.</p>
      )}
    </main>
  );
}
