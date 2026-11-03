import { Link } from 'react-router-dom';
import './Join.css';

export default function Join() {
  return <main className="container join-page">
    <div className="page-intro"><h1 className="page-title">Adhérer à VIGI</h1></div>
    <div className="form-panel"><h2>Rejoignez VIGI</h2><p>Les modalités officielles d'adhésion et le formulaire sécurisé seront ajoutés après validation par le syndicat.</p><Link className="btn btn--solid" to="/contact">Nous contacter</Link></div>
  </main>;
}
