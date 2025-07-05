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
    {
      id: 1,
      name: "Company 1",
      image: "/placeholder.svg" // Zastąp rzeczywistymi ścieżkami do logo
    },
    {
      id: 2,
      name: "Company 2", 
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Company 3",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Company 4",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Company 5",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Company 6",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Company 7",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      name: "Company 8",
      image: "/placeholder.svg"
    }
  ];

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
              className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-white rounded-lg p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              style={{ minWidth: '128px' }}
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
          
          {/* Drugi zestaw logo (duplikat dla płynnego przewijania) */}
          {logos.map((logo) => (
            <div
              key={`second-${logo.id}`}
              className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-white rounded-lg p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              style={{ minWidth: '128px' }}
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel; 