
import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-20 bg-lynx-dark">
      <div className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-8">
              WHO WE <span className="gradient-text">ARE</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              LYNXBYTE GAMES is a leading game development studio with over 8 years of experience 
              in creating extraordinary gaming experiences. We specialize in developing games across 
              multiple platforms, from mobile to console, using cutting-edge technology and innovative design.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our team of passionate developers, designers, and storytellers work together to bring 
              creative visions to life. We've worked on 50+ games and have established ourselves 
              as a trusted partner for both indie developers and major gaming companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
