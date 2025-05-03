import React from 'react';

function DestinationCard({ name, image, description }) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-white/90 mb-4 line-clamp-2">{description}</p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition transform opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export function PopularDestinations() {
  const destinations = [
    {
      name: 'Sigiriya',
      image:
        'https://images.unsplash.com/photo-1590177600463-127225166530?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
      description: 'Ancient rock fortress with stunning views and remarkable frescoes',
    },
    {
      name: 'Galle Fort',
      image:
        'https://images.unsplash.com/photo-1578148229115-29105218252d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      description: 'Colonial-era fort with charming streets and ocean views',
    },
    {
      name: 'Ella',
      image:
        'https://images.unsplash.com/photo-1586163213033-aa2f371b16e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      description: 'Scenic hill country with tea plantations and hiking trails',
    },
    {
      name: 'Yala National Park',
      image:
        'https://images.unsplash.com/photo-1581336181035-4a2a3e9a584f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      description: 'Wildlife sanctuary famous for leopards and elephants',
    },
    {
      name: 'Mirissa',
      image:
        'https://images.unsplash.com/photo-1586861256632-61b7bb6e6afb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      description: 'Beautiful beach town known for whale watching and surfing',
    },
    {
      name: 'Kandy',
      image:
        'https://images.unsplash.com/photo-1590579491624-f98f36d4c198?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
      description: 'Cultural capital with the famous Temple of the Tooth Relic',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore Sri Lanka's most beloved locations, from ancient wonders to pristine beaches
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              name={destination.name}
              image={destination.image}
              description={destination.description}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition inline-flex items-center">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}


export default PopularDestinations;