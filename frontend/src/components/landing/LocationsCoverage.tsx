import React from "react";
import { Link } from "../../utils/router";
import { FaLocationDot } from "react-icons/fa6";

const MUMBAI_CITY_LOCATIONS = [
  "Fort",
  "Churchgate",
  "Colaba",
  "Bandra West",
  "BKC",
  "Santacruz",
  "Andheri West",
  "Juhu",
  "Malad West",
  "Kandivali",
  "Borivali",
  "Dadar",
  "Matunga",
  "Kurla",
];

const THANE_DISTRICT_LOCATIONS = [
  "Thane West",
  "Thane East",
  "Naupada",
  "Ghodbunder Road",
  "Majiwada",
  "Kolshet",
  "Bhayandar",
  "Mira Road",
];

const PALGHAR_DISTRICT_LOCATIONS = [
  "Mira Road",
  "Bhayandar",
  "Vasai West",
  "Vasai East",
  "Nallasopara West",
  "Nallasopara East",
  "Palghar",
  "Boisar",
];

const LocationsCoverage: React.FC = () => {
  return (
    <section className="locations-coverage-section" id="service-locations">
      <div className="locations-coverage-container">
        {/* Top Locations Pill */}
        <div className="locations-pill-badge">
          <FaLocationDot className="pill-icon" />
          <span>LOCATIONS</span>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="locations-main-title">Serving All of Mumbai &amp; MMR</h2>
        <p className="locations-sub-title">
          Doorstep pickup &amp; drop across the entire Mumbai Metropolitan Region
        </p>

        {/* 3 District Cards */}
        <div className="locations-cards-grid">
          {/* Mumbai City Card */}
          <div className="location-district-card">
            <div className="district-card-header">
              <span className="district-icon">🏙️</span>
              <h3 className="district-name">Mumbai City</h3>
            </div>
            <div className="district-locations-list">
              {MUMBAI_CITY_LOCATIONS.map((loc) => (
                <span key={loc} className="location-chip">
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Thane District Card */}
          <div className="location-district-card">
            <div className="district-card-header">
              <span className="district-icon">🏢</span>
              <h3 className="district-name">Thane District</h3>
            </div>
            <div className="district-locations-list">
              {THANE_DISTRICT_LOCATIONS.map((loc) => (
                <span key={loc} className="location-chip">
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Palghar District Card */}
          <div className="location-district-card">
            <div className="district-card-header">
              <span className="district-icon">🌴</span>
              <h3 className="district-name">Palghar District</h3>
            </div>
            <div className="district-locations-list">
              {PALGHAR_DISTRICT_LOCATIONS.map((loc) => (
                <span key={loc} className="location-chip">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Yellow View All Button */}
        <div className="locations-cta-wrapper">
          <Link to="/search?search=locations" className="locations-view-all-btn">
            View All Service Locations &gt;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsCoverage;
