import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ActivityCard({ title, image, price, duration, rating }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mx-2 my-4 flex flex-col h-full">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-bold px-2 py-1 rounded">
          {price}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <span className="mr-2">{duration}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-auto">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActivitiesCarousel() {
  const activities = [
    {
      title: 'Whale Watching in Mirissa',
      image:
        'https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      price: '$45',
      duration: '4 hours',
      rating: 4.8,
    },
    {
      title: 'Sigiriya Rock Fortress Tour',
      image:
        'https://images.unsplash.com/photo-1590177600463-127225166530?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
      price: '$30',
      duration: '3 hours',
      rating: 4.9,
    },
    {
      title: 'Kandy Cultural Dance Show',
      image:
        'https://images.unsplash.com/photo-1583243552820-9e4e85b5e4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      price: '$20',
      duration: '2 hours',
      rating: 4.5,
    },
    {
      title: 'Yala Safari Experience',
      image:
        'https://images.unsplash.com/photo-1581336181035-4a2a3e9a584f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      price: '$75',
      duration: 'Full day',
      rating: 4.7,
    },
    {
      title: 'Ella Train Journey',
      image:
        'https://images.unsplash.com/photo-1598416775878-9d2a4ab08ff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      price: '$15',
      duration: '7 hours',
      rating: 4.6,
    },
    {
      title: 'Galle Fort Walking Tour',
      image:
        'https://images.unsplash.com/photo-1578148229115-29105218252d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      price: '$25',
      duration: '3 hours',
      rating: 4.4,
    },
  ];

  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Activities
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover unforgettable experiences across the island
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Previous activities"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activities.map((activity, index) => (
              <div key={index} className="min-w-[280px] md:min-w-[320px] snap-start">
                <ActivityCard
                  title={activity.title}
                  image={activity.image}
                  price={activity.price}
                  duration={activity.duration}
                  rating={activity.rating}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Next activities"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </div>
        <div className="text-center mt-8">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition inline-flex items-center">
            View All Activities
          </button>
        </div>
      </div>
    </section>
  );
}


export default ActivitiesCarousel;