import './InfoPage.css';

export default function InfoPage({ title, description }) {
  return <main className="container info-page">
    <div className="page-intro"><h1 className="page-title">{title}</h1></div>
    <p>{description || 'Le contenu officiel de cette rubrique sera ajouté après validation par VIGI.'}</p>
  </main>;
}
