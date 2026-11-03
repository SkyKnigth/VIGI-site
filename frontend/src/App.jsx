import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import ContentPage from './pages/ContentPage/ContentPage.jsx';
import InfoPage from './pages/InfoPage/InfoPage.jsx';
import Presentation from './pages/Presentation.jsx';
import Contact from './pages/Contact/Contact.jsx';
import MemberArea from './pages/MemberArea/MemberArea.jsx';
import Join from './pages/Join/Join.jsx';

const informationPages = [
  ['/revendications', 'Revendications'],
  ['/grille-salaires', 'Grille des salaires'],
  ['/faq', 'Questions fréquentes'],
  ['/signaler-un-probleme', 'Signaler un problème'],
  ['/liens-utiles', 'Liens utiles'],
  ['/mentions-legales', 'Mentions légales'],
  ['/confidentialite', 'Confidentialité'],
];

export default function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/qui-sommes-nous" element={<Presentation />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/videos" element={<ContentPage type="video" title="Nos vidéos" />} />
      <Route path="/tracts" element={<ContentPage type="tract" title="Nos tracts" />} />
      <Route path="/actualites" element={<ContentPage type="news" title="Actualités" />} />
      <Route path="/communiques" element={<ContentPage type="press" title="Communiqués de presse" />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/espace-adherent" element={<MemberArea />} />
      <Route path="/adherer" element={<Join />} />
      {informationPages.map(([path, title]) => <Route key={path} path={path} element={<InfoPage title={title} />} />)}
      <Route path="*" element={<InfoPage title="Page introuvable" description="Cette page n'existe pas." />} />
    </Routes>
    <Footer />
  </>;
}
