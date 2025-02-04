import React, { useEffect, useState } from "react";
import { getPlaces, addPlace } from "../services/api";
import PlaceCard from "../components/Placecard";

function Dashboard() {
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({ name: "", rating: "", review: "" });

  // Fetch places on component load
  useEffect(() => {
    async function fetchData() {
      const data = await getPlaces();
      setPlaces(data);
    }
    fetchData();
  }, []);

  // Handle form submission to add a new place
  async function handleAddPlace(e) {
    e.preventDefault();
    if (newPlace.name && newPlace.rating && newPlace.review) {
      const addedPlace = await addPlace(newPlace);
      setPlaces([...places, addedPlace]);
      setNewPlace({ name: "", rating: "", review: "" });
    } else {
      alert("Please fill out all fields.");
    }
  }

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>

      {/* Place List Section */}
      <div className="places-section">
        <h2>Places You've Reviewed</h2>
        <div className="places-grid">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>

      {/* Add Place Section */}
      <div className="add-place-form">
        <h2>Add a New Place</h2>
        <form onSubmit={handleAddPlace}>
          <input
            type="text"
            placeholder="Place Name"
            value={newPlace.name}
            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rating (1 to 5)"
            value={newPlace.rating}
            onChange={(e) => setNewPlace({ ...newPlace, rating: e.target.value })}
          />
          <textarea
            placeholder="Write a review..."
            value={newPlace.review}
            onChange={(e) => setNewPlace({ ...newPlace, review: e.target.value })}
          />
          <button type="submit">Add Place</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
