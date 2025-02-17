import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Ratings from './pages/Ratings';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/ratings" element={<Ratings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;