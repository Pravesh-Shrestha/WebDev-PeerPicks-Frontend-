import React from "react";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <h3>{place.name}</h3>
      <p>Rating: ⭐ {place.rating}</p>
      <p>{place.review}</p>
    </div>
  );
}

export default PlaceCard;
