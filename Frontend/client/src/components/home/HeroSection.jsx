import React from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          className="absolute inset-0 min-w-full min-h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/698046492/rendition/720p/file.mp4?loc=external&signature=2d6f2fe0c5f0dccb3f052a6e049f0d6f5b2e007b9d08be44deb3a8c7fc0c6342"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Experience the Wonder of{' '}
          <span className="text-amber-500">Sri Lanka</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Discover pristine beaches, ancient temples, lush tea plantations, and
          incredible wildlife in this tropical paradise
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
          Start Your Journey
        </button>
        <div className="absolute bottom-10 animate-bounce">
          <a href="#search" className="text-white flex flex-col items-center">
            <span className="mb-2">Explore More</span>
            <ChevronDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;