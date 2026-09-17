import React from "react";
import { Link } from "react-router-dom";
import {
  BsShieldCheck,
  BsLightningChargeFill,
  BsCheckCircleFill,
  BsGeoAltFill,
} from "react-icons/bs";
import {
  FaMagnifyingGlass,
  FaTruckFast,
  FaIndianRupeeSign,
  FaStar,
  FaArrowRight,
} from "react-icons/fa6";

const whyFeatures = [
  {
    id: "warranty",
    title: "90-Day Warranty",
    desc: "Every repair backed by full parts & labour warranty.",
    icon: <BsShieldCheck />,
  },
  {
    id: "same-day",
    title: "Same-Day Service",
    desc: "Most repairs done in 1–4 hours. Respect for your time.",
    icon: <BsLightningChargeFill />,
  },
  {
    id: "inspection",
    title: "₹350 Inspection Fee",
    desc: "₹350 inspection — refunded if you proceed with repair. Transparent quote before any work starts.",
    icon: <FaMagnifyingGlass />,
  },
  {
    id: "parts",
    title: "Genuine Parts",
    desc: "OEM quality components — no cheap alternatives.",
    icon: <BsCheckCircleFill />,
  },
  {
    id: "pickup",
    title: "Doorstep Pickup",
    desc: "Free pickup & drop across all Mumbai MMR areas.",
    icon: <FaTruckFast />,
  },
  {
    id: "transparent-price",
    title: "Transparent Price",
    desc: "No hidden fees. Fixed quote before any work begins.",
    icon: <FaIndianRupeeSign />,
  },
];

const stats = [
  { value: "1,00,000+", label: "Repairs Completed" },
  { value: "15,244+", label: "Google Reviews" },
  { value: "365", label: "Locations Covered" },
  { value: "37", label: "Brands Serviced" },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="why-choose-container">
        <div className="why-choose-grid">
          {/* Left Column: Title, Subtitle, 6 Trust Cards */}
          <div className="why-left-content">
            <span className="badge-pill">
              <BsShieldCheck /> WHY SOLUTION SYSTEMS
            </span>

            <h2 className="main-heading">
              Why 15,244+ Mumbaikars<br />
              Trust <span className="highlight-blue">Solution Systems</span>
            </h2>

            <p className="main-description">
              More than just a repair shop — we&apos;re your complete laptop and
              computer health partner from repair to buy/sell to digital services.
            </p>

            {/* 6 Feature Trust Cards */}
            <div className="features-2col-grid">
              {whyFeatures.map((item) => (
                <div key={item.id} className="feature-card">
                  <div className="icon-circle">{item.icon}</div>
                  <div className="card-text">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Workshop Image, 2x2 Stats, Rating Card, Workshop Card */}
          <div className="why-right-content">
            {/* Workshop Technician Image */}
            <div className="workshop-image-card">
              <img
                src="/workshop-technician.webp"
                alt="Solution Systems Laptop, Computer & MacBook Repair Technicians in Mumbai Lab"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://xigox.com/images/real-shop/xigox-computer-shop-virar-west-laptop-repair-shop--9.webp";
                }}
              />
            </div>

            {/* 2x2 Stats Grid */}
            <div className="stats-2x2-grid">
              {stats.map((s, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Customer Rating Card */}
            <div className="rating-card">
              <div className="rating-top-row">
                <div className="star-icons">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="score-big">4.9</span>
                <span className="score-max">/ 5</span>
              </div>
              <p className="rating-text">
                Based on 15,244+ Google &amp; customer reviews from all across Mumbai
              </p>
              <Link to="/search" className="read-reviews-link">
                <span>Read All Reviews</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Workshop Address Card */}
            <div className="workshop-address-card">
              <div className="address-pin-box">
                <BsGeoAltFill />
              </div>
              <div className="address-details">
                <h4 className="address-title">Our Workshop</h4>
                <address className="address-text">
                  Gala No 2, Dafftary Complex, Datt Mandir Rd,
                  <br />
                  Virar West, Vasai-Virar, Maharashtra 401303
                </address>
                <div className="address-timings">Mon–Sun · 9 AM – 9 PM</div>
                <a
                  href="https://www.google.com/maps/place/Xigox/@19.4536818,72.8061033,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  <span>View on Google Maps</span>
                  <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;