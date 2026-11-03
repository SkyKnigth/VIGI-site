import './FastFacts.css';

const indicators = [
  { label: 'Adhérents', value: '—' },
  { label: 'Actions syndicales', value: '—' },
  { label: 'Dossiers accompagnés', value: '—' },
  { label: 'Communiqués publiés', value: '—' },
  { label: 'Années d’engagement', value: '—' },
];

export default function FastFacts() {
  return (
    <section className="section facts container">
      <h2>VIGI en quelques chiffres</h2>
      <div className="facts__grid">
        {indicators.map((indicator) => <div className="facts__card" key={indicator.label}><strong>{indicator.value}</strong><span>{indicator.label}</span></div>)}
      </div>
      <p className="facts__note">Chiffres à renseigner après validation par VIGI.</p>
    </section>
  );
}
