import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PhotoSlider.css';

const slides = [
  { image: '/images/slide-1.svg', caption: 'Engagement et protection' },
  { image: '/images/slide-2.svg', caption: 'Présence sur le terrain' },
  { image: '/images/slide-3.svg', caption: 'Solidarité et défense des droits' },
];

export default function PhotoSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="photo-slider" aria-label="Diaporama VIGI">
      <img src={slides[index].image} alt={slides[index].caption} />
      <div className="photo-slider__caption">{slides[index].caption}</div>
      <button className="photo-slider__prev" onClick={() => setIndex((index + slides.length - 1) % slides.length)} aria-label="Photo précédente"><ChevronLeft /></button>
      <button className="photo-slider__next" onClick={() => setIndex((index + 1) % slides.length)} aria-label="Photo suivante"><ChevronRight /></button>
      <div className="photo-slider__dots">{slides.map((slide, slideIndex) => <button key={slide.image} className={index === slideIndex ? 'is-active' : ''} aria-label={`Afficher la photo ${slideIndex + 1}`} aria-current={index === slideIndex ? 'true' : undefined} onClick={() => setIndex(slideIndex)} />)}</div>
    </section>
  );
}
