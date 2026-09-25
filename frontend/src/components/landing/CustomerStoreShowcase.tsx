import React, { useRef, useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

// Single representative placeholder image used across all cards in this section as requested
const DEFAULT_SHOWCASE_IMAGE = "/customer-showcase-placeholder.svg";

export interface CustomerDeliveryItem {
  id: number;
  image: string;
  customerName: string;
  productDelivered: string;
}

// Configurable list of showcase cards - currently using 1 repetitive image
const CUSTOMER_DELIVERIES: CustomerDeliveryItem[] = [
  {
    id: 1,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Happy Customer",
    productDelivered: "Custom PC & Laptop Delivery",
  },
  {
    id: 2,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Trading Setup Client",
    productDelivered: "Dual Monitor Workstation",
  },
  {
    id: 3,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Family Home Setup",
    productDelivered: "All-in-One Desktop System",
  },
  {
    id: 4,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Gaming Enthusiast",
    productDelivered: "Custom Liquid-Cooled Build",
  },
  {
    id: 5,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Architecture Studio",
    productDelivered: "High-Performance Workstation",
  },
  {
    id: 6,
    image: DEFAULT_SHOWCASE_IMAGE,
    customerName: "Creative Professional",
    productDelivered: "Editing PC & Studio Setup",
  },
];

const CustomerStoreShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Total pages or steps (e.g. 3 pagination dots as shown in reference)
  const TOTAL_DOTS = 3;

  // Handle scroll position updates to compute active dot
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    const dotIndex = Math.min(
      TOTAL_DOTS - 1,
      Math.max(0, Math.round(ratio * (TOTAL_DOTS - 1)))
    );
    setActiveDot(dotIndex);
  };

  // Scroll carousel left or right
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Scroll to a specific dot page
  const scrollToDot = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const targetScroll = (index / (TOTAL_DOTS - 1)) * maxScroll;
    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveDot(index);
  };

  // Auto-scroll carousel every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const step = el.clientWidth * 0.7;
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="customer-store-showcase-section">
      <div className="showcase-container">
        {/* LEFT COLUMN: Customer Delivery Showcase Carousel */}
        <div
          className="customers-carousel-column"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="carousel-nav-btn left"
            onClick={() => scroll("left")}
            aria-label="Previous customer showcase"
          >
            <BsChevronLeft />
          </button>

          {/* Sliding Track */}
          <div
            className="customers-scroll-track"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {CUSTOMER_DELIVERIES.map((item) => (
              <div key={item.id} className="customer-framed-card">
                {/* Decorative Blue Side Tabs on the Orange Frame */}
                <span className="card-side-tab left" aria-hidden="true" />
                <span className="card-side-tab right" aria-hidden="true" />

                {/* Inner Image Container */}
                <div className="card-inner-frame">
                  <img
                    src={item.image}
                    alt={item.customerName}
                    loading="lazy"
                    className="customer-showcase-img"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="carousel-nav-btn right"
            onClick={() => scroll("right")}
            aria-label="Next customer showcase"
          >
            <BsChevronRight />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="carousel-dots-indicator">
            {Array.from({ length: TOTAL_DOTS }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`dot-pill ${activeDot === idx ? "active" : ""}`}
                onClick={() => scrollToDot(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: "Our Store" Card */}
        <div className="our-store-showcase-column">
          <div className="our-store-card">
            {/* Top Ornamental Header */}
            <div className="store-header-wrap">
              <div className="ornament-line">
                <span className="line" />
                <span className="diamond">◆</span>
                <span className="line" />
              </div>
              <h3 className="store-title">Our Store</h3>
              <div className="ornament-line">
                <span className="line" />
                <span className="diamond">◆</span>
                <span className="line" />
              </div>
            </div>

            {/* Storefront Image Showcase */}
            <div className="store-image-box">
              <img
                src={DEFAULT_SHOWCASE_IMAGE}
                alt="Our Storefront"
                className="store-front-img"
                loading="lazy"
              />
            </div>

            {/* Bottom Location Badge */}
            <div className="store-location-badge">
              <div className="location-pin-row">
                <FaLocationDot className="red-map-pin" />
                <span className="location-city-name">Ranchi Jharkhand</span>
              </div>
              <div className="location-dotted-line">
                <span className="dash" />
                <span className="dot" />
                <span className="dash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerStoreShowcase;
