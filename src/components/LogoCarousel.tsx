import React, { useEffect, useRef } from 'react';

interface Logo {
  id: number;
  name: string;
  image: string;
}

const LogoCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Przykładowe loga firm - możesz zastąpić własnymi
  const logos: Logo[] = [
    { id: 1, name: "Company 1", image: "lovable-uploads/1.webp" },
    { id: 2, name: "Company 2", image: "lovable-uploads/2.png" },
    { id: 3, name: "Company 3", image: "lovable-uploads/3.jpg" },
    { id: 4, name: "Company 4", image: "lovable-uploads/4.png" },
    { id: 5, name: "Company 5", image: "lovable-uploads/6.svg" },
    { id: 6, name: "Company 6", image: "lovable-uploads/7.svg" },
    { id: 7, name: "Company 7", image: "lovable-uploads/9.avif" },
  ];

  // Zasady tła wg wytycznych:
  // 1: czarne, 2: bez zmian, 3: bez zmian, 4: białe, 5: czarne,
  // 6: bez zmian, 7: bez zmian, 8: czarne, 9: czarne
  // Białe tło jest domyślne (kafelek ma białe tło), więc ustawiamy
  // czarne tylko dla wybranych ID.
  const blackBackgroundLogoIds = new Set<number>([1, 5, 8, 9]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Prędkość przewijania w pikselach na klatkę

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset pozycji gdy osiągnie koniec
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-lynx-dark overflow-hidden">
      <div className="container-width">
        <div className="text-center mb-12 animate-fade-in">
          {/* <h2 className="text-3xl lg:text-4xl font-black mb-4">
            TRUSTED BY <span className="text-lynx-pink">LEADING COMPANIES</span>
          </h2> */}
          <p className="text-gray-300 max-w-2xl mx-auto">
            Games & consoles experts increasing sales of your games
          </p>
        </div>

        <div 
          ref={carouselRef}
          className="flex items-center gap-12 overflow-hidden select-none"
          style={{ 
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Pierwszy zestaw logo */}
          {logos.map((logo) => (
            <div
              key={`first-${logo.id}`}
              className="flex-shrink-0 flex items-center justify-center w-48 h-24 bg-white rounded-xl border border-gray-200 shadow-md"
              style={{ minWidth: '192px', minHeight: '96px', maxWidth: '192px', maxHeight: '96px' }}
            >
              <div
                style={{
                  background: blackBackgroundLogoIds.has(logo.id) ? '#000' : 'transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: logo.id === 8 ? '180px' : '140px',
                  height: logo.id === 8 ? '80px' : '60px',
                  margin: '0 auto',
                }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="object-contain"
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
            </div>
          ))}
          
          {/* Drugi zestaw logo (duplikat dla płynnego przewijania) */}
          {logos.map((logo) => (
            <div
              key={`second-${logo.id}`}
              className="flex-shrink-0 flex items-center justify-center w-48 h-24 bg-white rounded-xl border border-gray-200 shadow-md"
              style={{ minWidth: '192px', minHeight: '96px', maxWidth: '192px', maxHeight: '96px' }}
            >
              <div
                style={{
                  background: blackBackgroundLogoIds.has(logo.id) ? '#000' : 'transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: logo.id === 8 ? '180px' : '140px',
                  height: logo.id === 8 ? '80px' : '60px',
                  margin: '0 auto',
                }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="object-contain"
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel; 