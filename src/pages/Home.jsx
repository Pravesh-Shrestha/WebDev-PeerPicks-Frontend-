import React, { useState, useEffect } from 'react';
import logo1 from '../assets/logo1.jpg';
import '../styles/Home.css';


const Home = () => {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // State for navbar scroll effect
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search modal
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* Navigation */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-text"><span>Peer</span>Picks</div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about-us" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
            <li><a href="#why-us" onClick={() => setIsMenuOpen(false)}>Why Us?</a></li>
            <li><a href="#top-ratings" onClick={() => setIsMenuOpen(false)}>Top Ratings</a></li>
            <li><a href="/RateNow" className="rate-now-btn">Rate Now</a></li>
            <li><a href="#" className="search-icon" onClick={(e) => {
              e.preventDefault();
              toggleSearch();
              setIsMenuOpen(false);
            }}><i className="fas fa-search"></i></a></li>
          </ul>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <div className={`search-modal ${isSearchOpen ? 'active' : ''}`}>
        <div className="close-search" onClick={toggleSearch}>
          <i className="fas fa-times"></i>
        </div>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" className="search-input" placeholder="Search for places, categories..." />
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Community-Powered <span>Ratings</span></h1>
          <p>Discover the best places and services with genuine reviews from real users. Make informed decisions based on community experiences.</p>
          <div className="cta-buttons">
            <a href="#top-ratings" className="primary-btn">Explore Top Picks</a>
            <a href="/rate" className="secondary-btn">Share Your Experience</a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about-us">
        <div className="container">
          <div className="section-title">
            <h2>About PeerPicks</h2>
            <p>Learn about our mission to create a transparent community-driven rating platform</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h2>Empowering Users Through Community Wisdom</h2>
              <p>PeerPicks was founded with a simple mission: to create a platform where genuine user experiences drive decision-making. We believe in the power of community wisdom and transparent reviews.</p>
              <p>Our platform gathers ratings from real users who have experienced the services firsthand. By aggregating these authentic experiences, we help you make informed choices based on collective knowledge.</p>
              <p>Whether you're looking for the highest-rated restaurant in your neighborhood or the most trusted local shop, PeerPicks provides you with reliable insights from people just like you.</p>
            </div>
            <div className="about-image">
            <img src={logo1} alt="About PeerPicks" />

            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us" id="why-us">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose PeerPicks?</h2>
            <p>Discover what makes our community-based rating system different</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-check"></i>
              </div>
              <h3>Authentic User Reviews</h3>
              <p>All ratings come from verified users who have actually experienced the service, ensuring authenticity and reliability in every review.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Transparent Rating System</h3>
              <p>Our algorithm prioritizes transparency, showing you exactly how ratings are calculated without hidden factors influencing results.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Community-Powered</h3>
              <p>By collecting experiences from diverse users, we create a rich tapestry of perspectives that provides a more complete picture.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Local Focus</h3>
              <p>Find the best local establishments with ratings from people in your community who share your preferences and standards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-filter"></i>
              </div>
              <h3>Personalized Recommendations</h3>
              <p>Our smart filtering system learns your preferences over time to provide tailored suggestions that match your taste.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-comment-alt"></i>
              </div>
              <h3>Detailed Feedback</h3>
              <p>Beyond simple star ratings, our platform encourages detailed reviews that highlight specifics about each experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ratings Section */}
      <section className="top-ratings" id="top-ratings">
        <div className="container">
          <div className="section-title">
            <h2>Top Rated Places</h2>
            <p>Discover the highest-rated establishments according to our community</p>
          </div>
          <div className="ratings-container">
            {/* Rating Card 1 */}
            <div className="rating-card">
              <div className="rating-image">
                <img src="https://noshnepal.s3.ap-southeast-1.amazonaws.com/7114efa7-e44d-45d5-836d-2a123f9a4c02image" alt="Restaurant" />
              </div>
              <div className="rating-content">
                <span className="rating-category">Restaurant</span>
                <div className="rating-header">
                  <div className="rating-name">Garden Kitchen</div>
                  <div className="rating-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
                <p className="rating-description">Farm-to-table restaurant with organic ingredients and seasonal menu. Known for excellent service and cozy atmosphere.</p>
                <div className="rating-footer">
                  <div className="rating-reviews">243 reviews</div>
                  <a href="#" className="view-more">View Details <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>

            {/* Rating Card 2 */}
            <div className="rating-card">
              <div className="rating-image">
                <img src="https://scontent.fktm20-1.fna.fbcdn.net/v/t1.6435-9/177333592_3680579232070375_7210013444868651010_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OWEz0kerAQ4Q7kNvgEn8c7K&_nc_oc=AdihMoS6PPvKxKI8jjNgnUGC6Ut6C8V6YeBBZoRsJ79eOuidWWllkdpFnpytwyHmuuQ&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=Ary7Oydruh4xxWDwwIeUclv&oh=00_AYB2aGFzHigQFVJmuE85mhzFC1Q7AgdWn3UvrARSyy1qSg&oe=67DD1DEA" alt="Cafe" />
              </div>
              <div className="rating-content">
                <span className="rating-category">Cafe</span>
                <div className="rating-header">
                  <div className="rating-name">Genesis Cafe</div>
                  <div className="rating-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <p className="rating-description">Cozy cafe with specialty coffee and homemade pastries. Perfect spot for remote work with free WiFi and plenty of outlets.</p>
                <div className="rating-footer">
                  <div className="rating-reviews">187 reviews</div>
                  <a href="#" className="view-more">View Details <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>

            {/* Rating Card 3 */}
            <div className="rating-card">
              <div className="rating-image">
                <img src="https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/473568775_1027325589428039_4742802745779984453_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=a-FqD2cKe60Q7kNvgGpTc05&_nc_oc=Adi2DrH76GPyKEvy4rPDRZgviSjfTgZNn0haT1L25HigWZu5-jz-KS5tqtL5ovrPamM&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=Ajm4RpmIpEyM3wsxJmZmM2p&oh=00_AYCcJ3oYLaVyMV-Ow-ka0CoMs-AVG36qnBigu6Lik8rckQ&oe=67BB7F09" alt="Bookstore" />
              </div>
              <div className="rating-content">
                <span className="rating-category">Bookstore</span>
                <div className="rating-header">
                  <div className="rating-name">Books Mandala</div>
                  <div className="rating-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <p className="rating-description">Independent bookstore with curated selection, knowledgeable staff, and regular author readings and community events.</p>
                <div className="rating-footer">
                  <div className="rating-reviews">156 reviews</div>
                  <a href="#" className="view-more">View Details <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>PeerPicks</h3>
              <p>Community-powered ratings and reviews to help you make better choices.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#why-us">Why Choose Us</a></li>
                <li><a href="#top-ratings">Top Ratings</a></li>
                <li><a href="/rate">Rate Now</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Categories</h3>
              <ul className="footer-links">
                <li><a href="#">Restaurants</a></li>
                <li><a href="#">Cafes</a></li>
                <li><a href="#">Retail Shops</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Entertainment</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul className="footer-links">
                <li><a href="mailto:info@peerpicks.com">info@peerpicks.com</a></li>
                <li><a href="tel:+977 9824120601">+(977) 9824120601</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} PeerPicks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;