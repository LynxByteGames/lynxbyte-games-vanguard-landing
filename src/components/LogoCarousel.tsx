import React, { useEffect, useRef, useState } from 'react';

interface Logo {
  id: number;
  name: string;
  image: string;
  fallbackImage?: string;
}

// Component for robust image loading with fallbacks
const RobustImage: React.FC<{ 
  src: string; 
  alt: string; 
  fallbackSrc?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, alt, fallbackSrc, className, style }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      console.log(`Falling back to: ${fallbackSrc}`);
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      console.error(`Failed to load image: ${src}`);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      onLoad={() => console.log(`Successfully loaded: ${currentSrc}`)}
      draggable={false}
      loading="eager"
    />
  );
};

const LogoCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Przykładowe loga firm - możesz zastąpić własnymi
  const logos: Logo[] = [
    { 
      id: 1, 
      name: "Company 1", 
      image: "/lovable-uploads/1.webp",
      fallbackImage: "/lovable-uploads/2.png"
    },
    { id: 2, name: "Company 2", image: "/lovable-uploads/2.png" },
    { id: 3, name: "Company 3", image: "/lovable-uploads/3.jpg" },
    { id: 4, name: "Company 4", image: "/lovable-uploads/4.jpg" },
    { id: 8, name: "Company 8", image: "/lovable-uploads/8.png" },
    { id: 5, name: "Company 5", image: "/lovable-uploads/5.png" },
    { id: 6, name: "Company 6", image: "/lovable-uploads/6.svg" },
    { id: 7, name: "Company 7", image: "/lovable-uploads/7.svg" },
    { id: 10, name: "Company 10", image: "/lovable-uploads/gms.png" },
    { 
      id: 9, 
      name: "Company 9", 
      image: "/lovable-uploads/9.avif",
      fallbackImage: "/lovable-uploads/5.png"
    },
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Preload the first image to ensure it's available
    const preloadFirstImage = () => {
      const img = new Image();
      img.onload = () => {
        console.log('First image preloaded successfully');
      };
      img.onerror = () => {
        console.error('Failed to preload first image');
      };
      img.src = logos[0].image;
    };

    preloadFirstImage();

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
  }, [logos]);

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
                  background: [2, 5, 9].includes(logo.id) ? '#000' : 'transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: logo.id === 8 ? '180px' : '140px',
                  height: logo.id === 8 ? '80px' : '60px',
                  margin: '0 auto',
                }}
              >
                <RobustImage
                  src={logo.image}
                  alt={logo.name}
                  fallbackSrc={logo.fallbackImage}
                  className="object-contain"
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
                  background: [5, 9].includes(logo.id) ? '#000' : 'transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: logo.id === 8 ? '180px' : '140px',
                  height: logo.id === 8 ? '80px' : '60px',
                  margin: '0 auto',
                }}
              >
                <RobustImage
                  src={logo.image}
                  alt={logo.name}
                  fallbackSrc={logo.fallbackImage}
                  className="object-contain"
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