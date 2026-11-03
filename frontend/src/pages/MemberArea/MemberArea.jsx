import './MemberArea.css';

export default function MemberArea() {
  return <main className="container member-page">
    <div className="page-intro"><h1 className="page-title">Mon espace adhérent</h1></div>
    <div className="form-panel"><h2>Accès sécurisé en préparation</h2><p>La connexion sera activée après mise en place des comptes, de la protection des données et de la gestion des adhésions.</p><button type="button" className="btn" disabled>Se connecter (à venir)</button></div>
  </main>;
}
