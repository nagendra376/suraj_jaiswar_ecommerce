import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";

const FixTodayBanner: React.FC = () => {
  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("book-repair");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#book-repair";
    }
  };

  return (
    <section className="fix-today-cta-banner" id="fix-today-banner">
      <div className="fix-today-cta-container">
        {/* Rocket Icon */}
        <div className="cta-rocket-icon" aria-hidden="true">
          🚀
        </div>

        {/* Heading */}
        <h2 className="cta-main-heading">
          Get Your Laptop or Computer Fixed Today!
        </h2>

        {/* Features Subtitle */}
        <p className="cta-features-line">
          ₹250 Inspection Fee (Refunded If You Proceed) • Same-Day Service • 90-Day Warranty • Doorstep Pickup
        </p>

        {/* Hours & Locations Line */}
        <p className="cta-hours-line">
          Open 9 AM – 9 PM · All Days · All Over Mumbai &amp; MMR
        </p>

        {/* Action Buttons Row */}
        <div className="cta-buttons-row">
          {/* Phone Call Button */}
          <a
            href="tel:+917499761196"
            className="cta-action-btn phone-btn"
            aria-label="Call +91 74997 61196"
          >
            <FaPhone className="btn-icon" />
            <span>+91 74997 61196</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/917499761196?text=Hi%20Solution%20Systems%2C%20I%20want%20to%20get%20my%20laptop%2Fcomputer%20fixed."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-action-btn whatsapp-btn"
            aria-label="WhatsApp Solution Systems"
          >
            <FaWhatsapp className="btn-icon" />
            <span>WhatsApp Us</span>
          </a>

          {/* Book Pickup Online Button */}
          <button
            type="button"
            className="cta-action-btn book-online-btn"
            onClick={handleScrollToBooking}
          >
            <span>Book Pickup Online</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FixTodayBanner;
