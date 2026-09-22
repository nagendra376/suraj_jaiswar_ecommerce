import React from "react";
import { FaStar, FaArrowRight } from "react-icons/fa6";

interface Review {
  id: number;
  stars: number;
  text: string;
  name: string;
  meta: string;
  initial: string;
}

const ROW_1_REVIEWS: Review[] = [
  {
    id: 101,
    stars: 5,
    text: "Booked Battery Replacement for my Samsung All-in-One 7 online. Doorstep pickup and clear communication throughout.",
    name: "Priya Menon",
    meta: "Jul 2026 · Chembur",
    initial: "P",
  },
  {
    id: 102,
    stars: 5,
    text: "Needed Samsung WiFi Card Replacement for my Samsung Smart Monitor M8 4K — Solution Systems technicians handled it professionally with a warranty.",
    name: "Devansh Gupta",
    meta: "Jul 2026 · Borivali",
    initial: "D",
  },
  {
    id: 103,
    stars: 5,
    text: "Samsung Virus Removal on my Samsung All-in-One Pro was completed same day with fair, transparent pricing.",
    name: "Sanjana Rao",
    meta: "Jul 2026 · Bandra",
    initial: "S",
  },
  {
    id: 104,
    stars: 5,
    text: "Excellent Samsung SSD Upgrade service for my Samsung All-in-One 7. Diagnosed quickly and used a proper replacement part.",
    name: "Karan Malhotra",
    meta: "Jul 2026 · Andheri",
    initial: "K",
  },
  {
    id: 105,
    stars: 5,
    text: "Booked Samsung RAM Upgrade for my Samsung All-in-One Pro online. Doorstep pickup and clear communication throughout.",
    name: "Vikram Oberoi",
    meta: "Jul 2026 · Malad",
    initial: "V",
  },
  {
    id: 106,
    stars: 5,
    text: "Needed Samsung Power Jack Repair for my Samsung All-in-One 7 — Solution Systems technicians handled it professionally with a warranty.",
    name: "Meera Pillai",
    meta: "Jul 2026 · Dadar",
    initial: "M",
  },
  {
    id: 107,
    stars: 5,
    text: "MacBook Air screen replacement done in 3 hours. Pristine display and very polite technician who picked it up from my flat.",
    name: "Rohan Shah",
    meta: "Jun 2026 · Kandivali",
    initial: "R",
  },
  {
    id: 108,
    stars: 5,
    text: "Dell Latitude keyboard stopped responding. Sourced genuine backlit replacement and fitted it same afternoon.",
    name: "Sneha Joshi",
    meta: "Jun 2026 · Thane",
    initial: "S",
  },
];

const ROW_2_REVIEWS: Review[] = [
  {
    id: 201,
    stars: 5,
    text: "Liquid spilled on keyboard. Chip-level cleaning saved my motherboard and 100% of my company data without any losses.",
    name: "Amit Kulkarni",
    meta: "Jul 2026 · Vashi",
    initial: "A",
  },
  {
    id: 202,
    stars: 5,
    text: "Upgraded from slow HDD to 1TB NVMe SSD. Boot time dropped from 2 minutes to 7 seconds! Truly feels like a brand new PC.",
    name: "Ritu Agarwal",
    meta: "Jul 2026 · Goregaon",
    initial: "R",
  },
  {
    id: 203,
    stars: 5,
    text: "Thermal paste servicing and cooling fan overhaul dropped CPU temps by 28°C. Gaming laptop no longer thermal throttles.",
    name: "Farhan Shaikh",
    meta: "Jun 2026 · Kurla",
    initial: "F",
  },
  {
    id: 204,
    stars: 5,
    text: "Doorstep pickup in Powai was super convenient. Received digital invoice, photos during service, and live status on WhatsApp.",
    name: "Pooja Nair",
    meta: "Jun 2026 · Powai",
    initial: "P",
  },
  {
    id: 205,
    stars: 5,
    text: "Replaced broken left hinge on HP Pavilion. Body reconstructed neatly with metal support brackets, opens smoothly like day one.",
    name: "Rajesh Deshmukh",
    meta: "Jul 2026 · Mira Road",
    initial: "R",
  },
  {
    id: 206,
    stars: 5,
    text: "Very honest service center. They discovered it was only a loose display connector cable rather than charging for a panel replacement.",
    name: "Ananya Roy",
    meta: "Jun 2026 · Santacruz",
    initial: "A",
  },
  {
    id: 207,
    stars: 5,
    text: "Data recovery from a clicking Seagate drive. Recovered over 500GB of client CAD files that other shops declared lost.",
    name: "Saurabh Verma",
    meta: "Jul 2026 · Worli",
    initial: "S",
  },
  {
    id: 208,
    stars: 5,
    text: "Fast turnaround and friendly staff. Resolved a continuous Windows BSOD boot loop and backed up all my files safely.",
    name: "Kavita Iyer",
    meta: "Jun 2026 · Dombivli",
    initial: "K",
  },
];

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="cust-review-card">
      <div className="card-stars-row" aria-label="5 out of 5 stars">
        {[...Array(review.stars)].map((_, i) => (
          <FaStar key={i} className="star-gold" />
        ))}
      </div>
      <p className="card-review-quote">“{review.text}”</p>
      <div className="card-author-meta">
        <div className="author-circle-avatar">{review.initial}</div>
        <div className="author-text-wrap">
          <h4 className="author-display-name">{review.name}</h4>
          <span className="author-date-loc">{review.meta}</span>
        </div>
      </div>
    </div>
  );
};

const WhatCustomersSay: React.FC = () => {
  // Duplicate arrays to create a seamless infinite loop
  const row1Repeated = [...ROW_1_REVIEWS, ...ROW_1_REVIEWS];
  const row2Repeated = [...ROW_2_REVIEWS, ...ROW_2_REVIEWS];

  return (
    <section className="what-customers-say-section" id="customer-reviews">
      <div className="what-customers-say-header">
        {/* Top Pill Badge */}
        <div className="cust-pill-badge">
          <span className="star-icon">⭐</span>
          <span>WHAT OUR CUSTOMERS SAY</span>
        </div>

        {/* Section Heading */}
        <h2 className="cust-main-heading">What Our Customers Say</h2>

        {/* Rating Summary Bar */}
        <div className="cust-rating-summary">
          <div className="summary-stars" aria-label="5 stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="star-gold" />
            ))}
          </div>
          <span className="rating-score">4.9</span>
          <span className="rating-count">from 15,244+ reviews</span>
        </div>
      </div>

      {/* 2 Opposite Auto-scrolling Rows */}
      <div className="reviews-marquee-container">
        {/* Row 1: Scrolls Left */}
        <div className="reviews-marquee-row">
          <div className="reviews-marquee-track track-scroll-left">
            {row1Repeated.map((rev, index) => (
              <ReviewCard key={rev.id + "-" + index} review={rev} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolls Right (Opposite Direction) */}
        <div className="reviews-marquee-row">
          <div className="reviews-marquee-track track-scroll-right">
            {row2Repeated.map((rev, index) => (
              <ReviewCard key={rev.id + "-rev-" + index} review={rev} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Read All Reviews Button */}
      <div className="cust-cta-footer">
        <a
          href="https://wa.me/918655208382?text=Hi%20Solution%20Systems%2C%20I%20would%20like%20to%20read%20more%20customer%20reviews."
          target="_blank"
          rel="noopener noreferrer"
          className="read-all-reviews-btn"
        >
          <span>Read All 15,244+ Reviews</span>
          <FaArrowRight className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default WhatCustomersSay;
