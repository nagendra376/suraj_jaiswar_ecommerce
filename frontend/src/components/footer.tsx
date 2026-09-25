import React, { useState } from "react";
import { Link } from "../utils/router";
import toast from "react-hot-toast";
import solutionLogo from "../assets/solution-systems-logo.png";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaLocationDot,
  FaIdCard,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
  FaGraduationCap,
  FaArrowUp,
  FaCircleInfo,
} from "react-icons/fa6";
import {
  BsShieldCheck,
  BsTools,
  BsLightningChargeFill,
  BsPatchCheckFill,
} from "react-icons/bs";

const repairServicesLinks = [
  { name: "Laptop Repair", path: "/search?search=laptop" },
  { name: "Computer repair", path: "/search?search=computer" },
  { name: "MacBook & Mac Repair", path: "/search?search=macbook" },
  { name: "Laptop screen replacement", path: "/search?search=screen" },
  { name: "Battery Replacement", path: "/search?search=battery" },
  { name: "Data recovery", path: "/search?search=data" },
  { name: "Printer Repair", path: "/search?search=printer" },
  { name: "Motherboard repair", path: "/search?search=motherboard" },
  { name: "Keyboard Replacement", path: "/search?search=keyboard" },
  { name: "All-in-one repair", path: "/search?search=all%20in%20one" },
];

const areasGroups = [
  {
    title: "MUMBAI",
    areas: ["Mumbai", "Borivali", "Kandivali", "Andheri", "Bandra"],
  },
  {
    title: "THANE",
    areas: ["Thane"],
  },
  {
    title: "MIRA ROAD",
    areas: ["Mira Road"],
  },
  {
    title: "VASAI-VIRAR",
    areas: ["Vasai", "Nallasopara", "Palghar", "Bhayandar"],
  },
  {
    title: "NAVI MUMBAI",
    areas: ["Panvel", "Vashi"],
  },
];

const quickLinks = [
  { name: "All Brands", path: "/#supported-brands" },
  { name: "Buy Refurbished", path: "/#buy-sell-refurbished" },
  { name: "Refurbished Laptops", path: "/search?search=laptop" },
  { name: "Sell Your Laptop", path: "/#buy-sell-refurbished" },
  { name: "Web Design", path: "/search" },
  { name: "Mobile app dev", path: "/search" },
  { name: "Repair Blog", path: "/search" },
  { name: "Customer reviews", path: "/#reviews" },
  { name: "About Us", path: "/" },
  { name: "Contact Us", path: "tel:+918655208382", isExternal: true },
];

const brandKeywords = [
  "Dell",
  "HP",
  "Lenovo",
  "Apple",
  "Asus",
  "Acer",
  "MSI",
  "Toshiba",
  "Canon",
  "Epson",
  "Brother",
  "Samsung",
];

const seoAreaChips = [
  "Laptop Repair Andheri",
  "Computer Repair Thane",
  "Laptop Repair Bandra",
  "Computer Repair Virar",
  "Laptop Repair Mira Road",
  "Computer Repair Vasai",
  "Laptop Repair Nallasopara",
  "Laptop Repair Borivali",
  "Computer Repair Andheri",
  "Computer Repair Thane West",
  "Screen Repair Andheri",
  "Battery Replacement Thane",
  "Computer Repair Mira Road",
  "Computer Repair Borivali",
  "Laptop Repair Vashi",
  "Data Recovery Mumbai",
  "Motherboard Repair Thane",
  "Laptop Repair Navi Mumbai",
  "Laptop Repair Powai",
  "Laptop Repair Dadar",
  "Computer Repair Bandra",
  "Laptop Repair Goregaon",
  "Printer Repair Thane",
  "Data Recovery Thane",
  "Laptop Repair Jogeshwari",
  "Computer Repair Santacruz",
];

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success(
      "Thank you for subscribing to repair tips & exclusive discounts!",
    );
    setNewsletterEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 1. Mega Top Footer: 4 Columns */}
        <div className="footer-mega-top">
          {/* Column 1: Brand Profile & Contact Info */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img
                src={solutionLogo.src}
                alt="Solution Systems"
                className="footer-logo-img"
              />
              <span className="footer-brand-title">
                Solution Systems<span className="brand-dot">.</span>
              </span>
            </div>

            <p className="footer-brand-desc">
              Mumbai&apos;s trusted laptop, computer &amp; MacBook repair
              center. Expert screen replacement, motherboard repair, data
              recovery &amp; upgrades for all brands, serving Mumbai, Thane
              &amp; Palghar since 2011.
            </p>

            {/* Contact Details */}
            <div className="footer-contact-list">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+918655208382">+91 86552 08382</a>
              </div>

              <div className="contact-item">
                <FaWhatsapp className="contact-icon green" />
                <a
                  href="https://wa.me/918655208382?text=Hi%20Solution%20Systems,%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@solutionsystems.in">
                  info@solutionsystems.in
                </a>
              </div>

              <div className="contact-item">
                <FaClock className="contact-icon" />
                <span>Open All Days: 9 AM – 9 PM</span>
              </div>

              <div className="contact-item">
                <FaLocationDot className="contact-icon" />
                <span>
                  Shop no.38, Chandak Nishchay Bldg, Swami Vivekanand Rd, opp.
                  Jain Mandir Road, Parbat Nagar, Dahisar, Mumbai, Maharashtra
                  400068
                </span>
              </div>

              <div className="contact-item">
                <FaIdCard className="contact-icon" />
                <span>GSTIN: 27AAPCS1401H1ZT</span>
              </div>
            </div>

            {/* Badges (Google Reviews & WhatsApp) */}
            <div className="footer-action-badges">
              <a
                href="#reviews"
                className="badge-btn reviews"
                title="View customer ratings and reviews"
              >
                <FaStar className="star-icon" />
                <span>Google Reviews</span>
              </a>
              <a
                href="https://wa.me/918655208382"
                target="_blank"
                rel="noopener noreferrer"
                className="badge-btn whatsapp"
                title="Chat directly on WhatsApp"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Follow Us */}
            <div className="footer-social-section">
              <span className="social-label">Follow Us:</span>
              <div className="social-icons-group">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Twitter"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: REPAIR SERVICES */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Repair Services</h4>
            <ul className="footer-nav-links">
              {repairServicesLinks.map((service) => (
                <li key={service.name}>
                  <Link to={service.path}>{service.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="/search" className="view-more-link">
              <span>View All Services</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* Column 3: AREAS WE SERVE */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Areas We Serve</h4>
            <div className="areas-group-list">
              {areasGroups.map((group) => (
                <div key={group.title} className="area-subgroup">
                  <div className="area-subgroup-title">{group.title}</div>
                  <ul>
                    {group.areas.map((area) => (
                      <li key={area}>
                        <Link to={`/search?search=${encodeURIComponent(area)}`}>
                          {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link to="/search" className="view-more-link">
              <span>View All 112 Areas</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* Column 4: QUICK LINKS */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a href={link.path}>{link.name}</a>
                  ) : (
                    <Link to={link.path}>{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Strip */}
      <div className="footer-newsletter-strip">
        <div className="footer-container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h4 className="newsletter-heading">
                Get Repair Tips &amp; Exclusive Offers
              </h4>
              <p className="newsletter-desc">
                Occasional emails with practical fix-it guides and members-only
                repair discounts. No spam — unsubscribe anytime.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Trust Strip (5 Highlights) */}
      <div className="footer-container">
        <div className="footer-trust-strip">
          <div className="trust-stat-box">
            <BsShieldCheck className="stat-icon green" />
            <h5 className="stat-title">90-Day Warranty</h5>
            <p className="stat-subtitle">On All Repairs</p>
          </div>

          <div className="trust-stat-box">
            <BsTools className="stat-icon blue" />
            <h5 className="stat-title">1,00,000+ Repairs</h5>
            <p className="stat-subtitle">Expert Laptops</p>
          </div>

          <div className="trust-stat-box">
            <BsLightningChargeFill className="stat-icon amber" />
            <h5 className="stat-title">Same-Day Repair</h5>
            <p className="stat-subtitle">Most Repairs</p>
          </div>

          <div className="trust-stat-box">
            <FaGraduationCap className="stat-icon blue" />
            <h5 className="stat-title">Certified Techs</h5>
            <p className="stat-subtitle">Expert Engineers</p>
          </div>

          <div className="trust-stat-box">
            <BsPatchCheckFill className="stat-icon yellow" />
            <h5 className="stat-title">ISO 9001:2015</h5>
            <p className="stat-subtitle">Certified Company</p>
          </div>
        </div>

        {/* 4. Inspection Fee Policy Box */}
        <div className="footer-policy-box">
          <FaCircleInfo className="policy-icon" />
          <p className="policy-text">
            <strong>Inspection Fee Policy:</strong> Our inspection fee is ₹350.
            If you proceed with the repair, the ₹350 is refunded / credited in
            full toward your total repair cost. If your laptop is not repairable
            or you decide NOT to proceed, the ₹350 inspection fee still applies.
          </p>
        </div>

        {/* 5. Brand Tags Cloud */}
        <div className="footer-brands-tags">
          {brandKeywords.map((brand, i) => (
            <React.Fragment key={brand}>
              <Link to={`/search?search=${encodeURIComponent(brand)}`}>
                {brand}
              </Link>
              {i < brandKeywords.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* 6. SEO Service Areas Chips */}
        <div className="footer-seo-chips-section">
          <div className="seo-header-title">
            Service Areas: Mumbai City District • Mumbai Suburban District •
            Thane District • Palghar District
          </div>
          <div className="seo-chips-wrap">
            {seoAreaChips.map((chip) => (
              <Link
                key={chip}
                to={`/search?search=${encodeURIComponent(chip)}`}
                className="seo-chip"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        {/* 7. Bottom Legal Copyright */}
        <div className="footer-bottom-legal">
          <div className="legal-inner">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} Solution Systems. All rights
              reserved. | GSTIN: 27AAPCS1401H1ZT
            </p>
            <p className="developer-credit">
              Developed &amp; maintained by{" "}
              <a
                href="https://www.nagendradwivedi.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Nagendra Dwivedi
              </a>
            </p>
            <div className="legal-links">
              <Link to="/search">Privacy Policy</Link>
              <Link to="/search">Terms of Service</Link>
              <Link to="/search">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Action Widget */}
      <aside className="floating-action-widget" aria-label="Quick Actions">
        <button
          type="button"
          className="float-btn scroll-top"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
        <a
          href="tel:+918655208382"
          className="float-btn call"
          title="Call Solution Systems"
          aria-label="Call +91 86552 08382"
        >
          <FaPhone />
        </a>
        <a
          href="https://wa.me/918655208382?text=Hi%20Solution%20Systems,%20I%20have%20an%20urgent%20laptop/computer%20repair%20inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn whatsapp"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
