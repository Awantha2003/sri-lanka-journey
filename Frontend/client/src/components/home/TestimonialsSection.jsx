import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Emma Thompson',
      location: 'London, UK',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      quote:
        "Our trip to Sri Lanka was absolutely magical. From the ancient ruins to the beautiful beaches, everything was perfect. The local guides were knowledgeable and friendly. Can't wait to come back!",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote:
        'The wildlife safari in Yala National Park was the highlight of our trip. We saw elephants, leopards, and so many beautiful birds. The accommodation arranged by Discover Sri Lanka was fantastic too.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      location: 'Sydney, Australia',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      quote:
        'As a solo female traveler, I was worried about safety, but Discover Sri Lanka made me feel secure throughout my journey. The cultural experiences and food were incredible!',
      rating: 4,
    },
    {
      name: 'David Miller',
      location: 'New York, USA',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      quote:
        'The tea plantations in Ella were breathtaking. Our guide was exceptional and the train journey was unforgettable. This was truly a trip of a lifetime.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Real experiences from travelers who explored Sri Lanka with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-500">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonials[currentIndex].rating ? '#f59e0b' : 'none'}
                      className={
                        i < testimonials[currentIndex].rating
                          ? 'text-amber-500'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="font-medium">
                  <p className="text-gray-900">{testimonials[currentIndex].name}</p>
                  <p className="text-emerald-600">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export default TestimonialsSection;