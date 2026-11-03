import HeroVideo from '../../components/HeroVideo/HeroVideo.jsx';
import Slogan from '../../components/Slogan/Slogan.jsx';
import VideoSection from '../../components/VideoSection/VideoSection.jsx';
import TractSection from '../../components/TractSection/TractSection.jsx';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider.jsx';
import FastFacts from '../../components/FastFacts/FastFacts.jsx';
import SocialSection from '../../components/SocialSection/SocialSection.jsx';
import './Home.css';

export default function Home() {
  return <main className="home">
    <HeroVideo />
    <Slogan />
    <VideoSection />
    <TractSection />
    <PhotoSlider />
    <FastFacts />
    <SocialSection />
  </main>;
}
