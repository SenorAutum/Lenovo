// src/pages/DiscoverPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import ArtisanCard from '../components/ArtisanCard'; // Import our new card component

// Let's create some dummy data to work with for now.
const dummyArtisans = [
  {
    id: 1,
    name: 'Beatrice Wanjiru',
    skill: 'Fashion & Design',
    location: 'Kitengela',
    imageUrl: 'https://images.pexels.com/photos/459957/pexels-photo-459957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'James Mwangi',
    skill: 'Carpentry & Woodwork',
    location: 'Athi River',
    imageUrl: 'https://images.pexels.com/photos/1249610/pexels-photo-1249610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Susan Adhiambo',
    skill: 'Leather Goods',
    location: 'Mlolongo',
    imageUrl: 'https://images.pexels.com/photos/1012136/pexels-photo-1012136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

function DiscoverPage() {
  return (
    <div>
      <Navbar />
      <div className="discover-container">
        <h1 className="discover-title">Find Your Mentor</h1>
        <div className="artisan-grid">
          {/* This is the magic: we loop through our data and create a card for each artisan */}
          {dummyArtisans.map(artisan => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;