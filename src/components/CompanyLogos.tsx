
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CompanyLogos = () => {
  const logos = [
    { name: 'PlayStation', logo: '🎮' },
    { name: 'Xbox', logo: '🎮' },
    { name: 'Nintendo', logo: '🎮' },
    { name: 'Steam', logo: '💻' },
    { name: 'Epic Games', logo: '⚡' },
    { name: 'Google Play', logo: '📱' },
    { name: 'App Store', logo: '📱' },
    { name: 'Oculus', logo: '🥽' },
    { name: 'Unity', logo: '⚙️' },
    { name: 'Unreal Engine', logo: '🔧' },
  ];

  return (
    <section className="py-16 bg-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <h2 className="text-2xl font-bold text-center mb-12">
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {logos.map((company, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <div className="p-6 bg-lynx-dark rounded-lg text-center hover:bg-lynx-pink/10 transition-all duration-300">
                    <div className="text-4xl mb-2">{company.logo}</div>
                    <div className="text-sm font-medium text-gray-300">{company.name}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
