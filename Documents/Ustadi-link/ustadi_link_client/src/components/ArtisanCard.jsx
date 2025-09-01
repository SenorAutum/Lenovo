// src/components/ArtisanCard.jsx
import React from 'react';

// Notice the '{ artisan }' in the function signature.
// This is how we receive the data for one artisan.
function ArtisanCard({ artisan }) {
  return (
    <div className="artisan-card">
      <img src={artisan.imageUrl} alt={artisan.name} className="artisan-image" />
      <div className="artisan-info">
        <h3 className="artisan-name">{artisan.name}</h3>
        <p className="artisan-skill">{artisan.skill}</p>
        <p className="artisan-location">{artisan.location}</p>
      </div>
    </div>
  );
}

// This is the crucial line that was missing.
export default ArtisanCard;