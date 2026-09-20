import React, { useState } from "react";
import { Link } from "../../utils/router";
import toast from "react-hot-toast";
import {
  BsRepeat,
  BsLaptop,
  BsPcDisplay,
  BsDisplay,
  BsCpu,
} from "react-icons/bs";
import {
  FaCartShopping,
  FaArrowRight,
  FaSquareCheck,
  FaIndianRupeeSign,
  FaBolt,
  FaMoneyBillWave,
  FaTruckFast,
  FaLock,
  FaLaptop,
  FaDesktop,
  FaPrint,
  FaGears,
  FaPlug,
  FaApple,
  FaWhatsapp,
  FaXmark,
} from "react-icons/fa6";

interface RefurbCategory {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon: React.ReactNode;
  theme: "blue" | "green" | "purple" | "amber" | "teal";
  searchQuery: string;
}

const refurbCategories: RefurbCategory[] = [
  {
    id: "laptops",
    title: "Refurbished Laptops",
    subtitle: "Dell, HP, Lenovo, MacBook",
    price: "From ₹8,000",
    icon: <BsLaptop />,
    theme: "blue",
    searchQuery: "laptop",
  },
  {
    id: "macbooks",
    title: "Refurbished MacBooks",
    subtitle: "MacBook Air, MacBook Pro",
    price: "From ₹18,000",
    icon: <FaApple />,
    theme: "green",
    searchQuery: "apple macbook",
  },
  {
    id: "desktops",
    title: "Desktop Computers",
    subtitle: "All brands & configurations",
    price: "From ₹6,000",
    icon: <BsPcDisplay />,
    theme: "purple",
    searchQuery: "desktop",
  },
  {
    id: "monitors",
    title: "Refurbished Monitors",
    subtitle: "Dell, HP, LG & more",
    price: "From ₹3,000",
    icon: <BsDisplay />,
    theme: "amber",
    searchQuery: "monitor",
  },
  {
    id: "all-in-ones",
    title: "All-in-One PCs",
    subtitle: "iMac, Dell AIO, HP AIO",
    price: "From ₹12,000",
    icon: <BsCpu />,
    theme: "teal",
    searchQuery: "all in one",
  },
];

const devicesToSell = [
  { id: "laptops", name: "Laptops", icon: <FaLaptop /> },
  { id: "desktops", name: "Desktops", icon: <FaDesktop /> },
  { id: "printers", name: "Printers", icon: <FaPrint /> },
  { id: "all-in-ones", name: "All-in-Ones", icon: <BsPcDisplay /> },
  { id: "components", name: "Components", icon: <FaGears /> },
  { id: "accessories", name: "Accessories", icon: <FaPlug /> },
];

const RefurbishedBuySell: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>("Laptops");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [brandModel, setBrandModel] = useState<string>("");
  const [condition, setCondition] = useState<string>("Working Perfectly");
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userArea, setUserArea] = useState<string>("");

  const handleOpenModal = (deviceName?: string) => {
    if (deviceName) {
      setSelectedDevice(deviceName);
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    toast.success(
      `Thank you ${userName}! Our valuation engineer will call you in under 30 minutes with the best price for your ${selectedDevice}.`,
      { duration: 5000 }
    );
    setIsModalOpen(false);
    setBrandModel("");
    setUserName("");
    setUserPhone("");
    setUserArea("");
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Solution Systems! I want to sell my used ${selectedDevice}.\n` +
      `Model: ${brandModel || "To be discussed"}\n` +
      `Condition: ${condition}\n` +
      `Location: ${userArea || "Mumbai"}`
  );

  return (
    <section className="refurbished-section" id="buy-sell-refurbished">
      <div className="refurbished-container">
        {/* Section Header */}
        <div className="refurbished-header">
          <div className="buy-sell-badge">
            <BsRepeat />
            <span>BUY &amp; SELL</span>
          </div>
          <h2 className="refurbished-title">
            Buy Refurbished Laptops &amp; Computers.{" "}
            <span className="highlight-green">Sell Your Old Ones.</span>
          </h2>
          <p className="refurbished-subtitle">
            Certified, tested, warranted refurbished laptops &amp; computers —
            and best prices when you sell
          </p>
        </div>

        {/* Sub-block A: Buy Certified Refurbished */}
        <div className="buy-subblock">
          <div className="buy-subblock-header">
            <div className="header-title-wrap">
              <FaCartShopping className="cart-icon" />
              <h3>Buy Certified Refurbished Laptops &amp; Computers</h3>
            </div>
            <Link to="/search" className="view-all-link">
              <span>View All</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* 5 Cards Grid */}
          <div className="refurbished-cards-grid">
            {refurbCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/search?search=${encodeURIComponent(cat.searchQuery)}`}
                className="refurb-card"
                title={`Shop ${cat.title}`}
              >
                <div className={`refurb-icon-box ${cat.theme}`}>{cat.icon}</div>
                <h4 className="refurb-card-title">{cat.title}</h4>
                <p className="refurb-card-subtitle">{cat.subtitle}</p>
                <span className={`refurb-price-pill ${cat.theme}`}>
                  {cat.price}
                </span>
              </Link>
            ))}
          </div>

          {/* Trust Guarantees Ribbon */}
          <div className="trust-guarantee-bar">
            <div className="trust-item">
              <FaSquareCheck className="check-icon" />
              <span>3–6 Month Warranty on All Laptops &amp; Computers</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <FaSquareCheck className="check-icon" />
              <span>50-Point Quality Check</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <FaSquareCheck className="check-icon" />
              <span>Easy Exchange Available</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <FaSquareCheck className="check-icon" />
              <span>Home Delivery Available</span>
            </div>
          </div>
        </div>

        {/* Sub-block B: Sell Your Laptop Card (Warm Amber Frame) */}
        <div className="sell-laptop-container">
          {/* Left Column: Device Selection & CTA */}
          <div className="sell-left-col">
            <div className="sell-badge">
              <FaIndianRupeeSign />
              <span>SELL YOUR LAPTOP</span>
            </div>
            <h3 className="sell-heading">
              Get Best Price for Your Old Laptop or Computer
            </h3>
            <p className="sell-description">
              We buy used laptops, desktops, all-in-ones and printers. Instant
              quote. Same-day payment. Free pickup.
            </p>

            {/* 6 Device Chips (2x3 Grid) */}
            <div className="device-selector-grid">
              {devicesToSell.map((dev) => (
                <button
                  type="button"
                  key={dev.id}
                  className={`device-pill-btn ${
                    selectedDevice === dev.name ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDevice(dev.name);
                    handleOpenModal(dev.name);
                  }}
                  title={`Sell your ${dev.name}`}
                >
                  <span className="device-icon">{dev.icon}</span>
                  <span>{dev.name}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="btn-instant-quote"
              onClick={() => handleOpenModal()}
            >
              <span>Get Instant Price Quote</span>
              <FaArrowRight />
            </button>
          </div>

          {/* Right Column: 2x2 Feature Highlights */}
          <div className="sell-right-col">
            <div className="features-2x2-grid">
              <div className="sell-feature-box">
                <div className="feature-icon-row amber">
                  <FaBolt />
                </div>
                <h4 className="feature-title">30-Min Quote</h4>
                <p className="feature-desc">
                  Price estimate in under 30 minutes
                </p>
              </div>

              <div className="sell-feature-box">
                <div className="feature-icon-row green">
                  <FaMoneyBillWave />
                </div>
                <h4 className="feature-title">Best Market Price</h4>
                <p className="feature-desc">
                  We match and beat competitor offers
                </p>
              </div>

              <div className="sell-feature-box">
                <div className="feature-icon-row blue">
                  <FaTruckFast />
                </div>
                <h4 className="feature-title">Free Pickup &amp; Drop</h4>
                <p className="feature-desc">
                  We come to you across all of Mumbai MMR
                </p>
              </div>

              <div className="sell-feature-box">
                <div className="feature-icon-row slate">
                  <FaLock />
                </div>
                <h4 className="feature-title">Data Wiped</h4>
                <p className="feature-desc">
                  Certified data erasure — your privacy protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sell Quote Modal */}
      {isModalOpen && (
        <div
          className="sell-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="sell-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FaXmark />
            </button>

            <div className="modal-header">
              <span className="modal-badge">INSTANT VALUATION</span>
              <h3>Sell Your {selectedDevice}</h3>
              <p>
                Get highest market payout with free doorstep pickup across Mumbai.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Device Category</label>
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                >
                  {devicesToSell.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Brand &amp; Model Details</label>
                <input
                  type="text"
                  placeholder="e.g. Dell Inspiron 15 / MacBook Air M1 / HP Pavilion"
                  value={brandModel}
                  onChange={(e) => setBrandModel(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Device Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="Working Perfectly">Working Perfectly (Like New)</option>
                  <option value="Minor Scratches / Battery Issue">
                    Good condition (Minor scratches or battery issue)
                  </option>
                  <option value="Broken Screen / Faulty">
                    Faulty (Screen cracked / Keyboard issue)
                  </option>
                  <option value="Dead / Not Powering On">
                    Dead / Not powering on
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Mumbai Location / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Andheri West, Borivali, Dadar, Thane, Virar"
                  value={userArea}
                  onChange={(e) => setUserArea(e.target.value)}
                  required
                />
              </div>

              <div className="modal-action-row">
                <button type="submit" className="btn-submit-modal">
                  Get 30-Min Call Quote
                </button>
                <a
                  href={`https://wa.me/917499761196?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-modal"
                >
                  <FaWhatsapp />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RefurbishedBuySell;
