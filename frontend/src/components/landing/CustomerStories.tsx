import React from "react";
import { FaStar, FaLocationDot, FaCheck } from "react-icons/fa6";
import { BsLaptop } from "react-icons/bs";

interface CustomerStory {
  id: number;
  stars: number;
  quote: string;
  device: string;
  author: string;
  location: string;
  initial: string;
  isHighlighted?: boolean;
}

const STORIES: CustomerStory[] = [
  {
    id: 1,
    stars: 5,
    quote:
      "Battery was swollen and trackpad stopped clicking. Solution Systems replaced the battery safely. MacBook performance is back to day-one speed. Expert Apple technicians!",
    device: "MacBook Air M1",
    author: "Anil Chauhan",
    location: "Malad",
    initial: "A",
  },
  {
    id: 2,
    stars: 5,
    quote:
      "Charging port was loose and not connecting. Solution Systems repaired the port in 2 hours. No data loss, 90-day warranty. Office productivity restored immediately!",
    device: "HP EliteBook 840 G8",
    author: "Nandini Kulkarni",
    location: "Kandivali",
    initial: "N",
    isHighlighted: true,
  },
  {
    id: 3,
    stars: 5,
    quote:
      "My Dell Inspiron screen went completely black after a fall. Solution Systems replaced the display panel in just 3 hours. Looks brand new! The technician was very careful with the laptop and even cleaned the internals.",
    device: "Dell Inspiron 15",
    author: "Vikram Desai",
    location: "Andheri",
    initial: "V",
  },
  {
    id: 4,
    stars: 5,
    quote:
      "My work laptop's keyboard stopped responding. Solution Systems replaced it same day so I didn't miss any deadlines. Professional service and genuine Dell parts used.",
    device: "Dell Latitude 5540",
    author: "Shruti Pandey",
    location: "Borivali",
    initial: "S",
  },
  {
    id: 5,
    stars: 5,
    quote:
      "Battery was draining in 30 minutes. Solution Systems sourced an original Dell battery and replaced it quickly. Now I get 8+ hours of backup again. Highly recommended!",
    device: "Dell XPS 15",
    author: "Nikhil Jain",
    location: "Vashi",
    initial: "N",
  },
  {
    id: 6,
    stars: 5,
    quote:
      "Motherboard failure on my office laptop. Other shops said it was dead, but Solution Systems did chip-level repair and saved all my data. Incredible skill!",
    device: "Dell Vostro 3520",
    author: "Alok Tiwari",
    location: "Dadar",
    initial: "A",
  },
];

const STATS = [
  { value: "500+", label: "Customers Served" },
  { value: "4.9", label: "Average Rating" },
  { value: "Same Day", label: "Most Repairs Completed" },
  { value: "90 Days", label: "Warranty on Repairs" },
];

const CustomerStories: React.FC = () => {
  return (
    <section className="customer-stories-section" id="customer-stories">
      <div className="customer-stories-container">
        {/* Top Pill Badge */}
        <div className="stories-pill-badge">
          <span className="stories-bubble-icon">💬</span>
          <span>REAL CUSTOMER STORIES</span>
        </div>

        {/* Section Heading & Subtitle */}
        <h2 className="stories-main-title">Real Customer Stories</h2>
        <p className="stories-sub-title">
          Hear from real people who trusted Solution Systems with their laptops and computers
        </p>

        {/* 6 Stories Cards Grid */}
        <div className="stories-cards-grid">
          {STORIES.map((story) => (
            <div
              key={story.id}
              className={"story-card" + (story.isHighlighted ? " highlighted" : "")}
            >
              {/* Card Top: Stars & Quote Mark */}
              <div className="story-card-top">
                <div className="stars-row" aria-label="5 out of 5 stars">
                  {[...Array(story.stars)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <span className="quote-mark">“</span>
              </div>

              {/* Review Text */}
              <p className="story-quote-text">“{story.quote}”</p>

              {/* Device Tag */}
              <div className="story-device-tag">
                <BsLaptop className="laptop-icon" />
                <span>{story.device}</span>
              </div>

              {/* Author & Verification Row */}
              <div className="story-author-row">
                <div className="author-info">
                  <div className="author-avatar">{story.initial}</div>
                  <div className="author-details">
                    <h4 className="author-name">{story.author}</h4>
                    <span className="author-location">
                      <FaLocationDot className="loc-icon" />
                      {story.location}
                    </span>
                  </div>
                </div>

                <div className="verified-badge">
                  <FaCheck className="check-icon" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Banner */}
        <div className="stories-stats-strip">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-col">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
