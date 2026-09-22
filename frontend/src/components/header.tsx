import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "../utils/router";
import { useSelector, useDispatch } from "react-redux";
import { openCart } from "../redux/reducer/cartReducer";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaBoxOpen,
  FaShieldAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { User } from "../types/types";
import { RootState } from "../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import solutionLogo from "../assets/solution-systems-logo.png";
import { serviceAreasData } from "../data/serviceAreas";

interface PropsType {
  user: User | null;
}

// Categories from Browse Gear dropdown (kept unchanged)
const browseCategories = [
  { name: "Custom Pc Build", path: "/search?category=custom-pc-build" },
  { name: "Laptops", path: "/search?category=laptops" },
  { name: "Processor", path: "/search?category=processor" },
  { name: "Motherboard", path: "/search?category=motherboard" },
  { name: "HDD", path: "/search?category=hdd" },
  { name: "Memory (Ram)", path: "/search?category=memory-ram" },
  { name: "Graphics Card", path: "/search?category=graphics-card" },
  { name: "SSD", path: "/search?category=ssd" },
  { name: "CPU Cooler", path: "/search?category=cpu-cooler" },
  { name: "Power Supply", path: "/search?category=power-supply" },
  { name: "Cabinet", path: "/search?category=cabinet" },
  { name: "View All", path: "/search" },
];

// Repair Services Menu
const repairServicesMenu = [
  { name: "Laptop Repair", path: "/search?search=laptop", icon: "💻" },
  { name: "Computer Repair", path: "/search?search=computer", icon: "🖥️" },
  { name: "MacBook & iMac Repair", path: "/search?search=macbook", icon: "🍎" },
  { name: "Computer Shop", path: "/search", icon: "🛠️" },
  { name: "Printer Repair", path: "/search?search=printer", icon: "🖨️" },
  { name: "Screen Replacement", path: "/search?search=screen", icon: "🖥" },
  { name: "Data Recovery", path: "/search?search=data", icon: "💾" },
];

const itServicesMenu = [
  { name: "Web Design", path: "/search?search=web-design", icon: "🌐" },
  { name: "Mobile App Dev", path: "/search?search=mobile-app", icon: "📱" },
];

const buySellMenu = [
  { name: "Buy Refurbished Laptops", path: "/search?category=laptops", isBlue: false },
  { name: "View All Laptops & Computers", path: "/search?category=laptops", isBlue: true },
  { name: "Sell Old Laptop", path: "/search?search=sell-laptop", isBlue: false, isDividerBefore: true },
  { name: "Sell Your Laptop", path: "/search?search=sell-laptop", isBlue: true },
];

const companyMenu = [
  { name: "About Us", path: "/search?search=about", isBlue: false },
  { name: "Customer Reviews", path: "/search?search=reviews", isBlue: false },
  { name: "Supported Brands", path: "/search?search=brands", isBlue: false },
  { name: "Blog", path: "/search?search=blog", isBlue: false },
  { name: "Contact Us", path: "/search?search=contact", isBlue: true, isDividerBefore: true },
];

const Header = ({ user }: PropsType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux Cart Count
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [browseGearOpen, setBrowseGearOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for click outside handling
  const browseGearRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setBrowseGearOpen(false);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        browseGearRef.current &&
        !browseGearRef.current.contains(e.target as Node)
      ) {
        setBrowseGearOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setUserMenuOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <header className="computech-header-container">
      {/* 1. Top Red Accent Line */}
      <div className="top-accent-line" />

      {/* 2. Top Ticker Marquee Announcement Bar */}
      <div className="announcement-bar">
        <div className="marquee-track">
          {[1, 2, 3, 4].map((item) => (
            <div
              className="marquee-content"
              key={item}
              aria-hidden={item > 1 ? "true" : undefined}
            >
              <span>WELCOME TO SOLUTION SYSTEMS</span>
              <span>|</span>
              <span>
                CASH ON DELIVERY (COD){" "}
                <span className="highlight-alert">❌ NOT AVAILABLE</span>
              </span>
              <span>|</span>
              <span>FLEXIBLE EMI FINANCE OPTIONS AVAILABLE</span>
              <span>|</span>
              <span>SHIPPING ALL OVER INDIA</span>
              <span>|</span>
              <span>B2B BILLING AVAILABLE</span>
              <span>|</span>
              <span>100% NEW GENUINE &amp; ORIGINAL PRODUCTS</span>
              <span>|</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Header Bar (Logo, Search, User, Cart) */}
      <div className="main-header-row">
        <div className="header-inner">
          {/* Mobile Menu Hamburger Trigger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <FaBars />
          </button>

          {/* Solution Systems Brand Logo */}
          <Link to="/" className="brand-logo-link" aria-label="Solution Systems Homepage">
            <img
              src={solutionLogo.src}
              alt="Solution Systems"
              className="header-brand-logo"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="search-bar-wrapper">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <FaSearch className="search-icon-left" />
              <input
                type="text"
                className="search-input"
                placeholder="Search for cases, GPUs, processors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
          </div>

          {/* Header Actions: User & Cart */}
          <div className="header-actions">
            {/* User Login or Account Dropdown */}
            {user?._id ? (
              <div className="user-dropdown-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                >
                  <span className="user-icon-badge">
                    <FaUser />
                  </span>
                  <span className="user-display-name">{user.name || "Account"}</span>
                  <FaChevronDown style={{ fontSize: "0.65rem" }} />
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown-menu">
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="menu-item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FaShieldAlt />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      className="menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FaBoxOpen />
                      <span>My Orders</span>
                    </Link>
                    <button
                      type="button"
                      className="menu-item sign-out"
                      onClick={logoutHandler}
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                <FaSignInAlt />
                <span>Log In</span>
              </Link>
            )}

            {/* Shopping Cart Pill Button */}
            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className="btn-cart-pill"
              aria-label="View Shopping Cart"
            >
              <FaShoppingBag className="cart-icon" />
              <span className="cart-label">Cart</span>
              <span className="cart-badge-count">{totalCartCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="mobile-search-row">
          <form onSubmit={handleSearchSubmit} className="search-form-mobile">
            <FaSearch className="search-icon-left" />
            <input
              type="text"
              className="search-input-mobile"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-submit-mobile">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 4. Bottom Category Navigation Bar */}
      <div className="bottom-nav-bar">
        <div className="nav-inner">
          {/* BROWSE GEAR Dropdown (matching media_1789644805231.png) */}
          <div className="browse-gear-container" ref={browseGearRef}>
            <button
              type="button"
              className="btn-browse-gear"
              onClick={() => setBrowseGearOpen((prev) => !prev)}
            >
              <div className="browse-left">
                <FaBars className="hamburger-icon" />
                <span>Browse Gear</span>
              </div>
              <FaChevronDown
                className={`chevron-icon ${browseGearOpen ? "open" : ""}`}
              />
            </button>

            {/* Dropdown Items List */}
            {browseGearOpen && (
              <div className="browse-dropdown-menu">
                {browseCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="dropdown-item"
                    onClick={() => setBrowseGearOpen(false)}
                  >
                    <span className="cat-name">{cat.name}</span>
                    <FaChevronRight className="cat-arrow" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Horizontal Navigation Links matching media_1789671189103.png */}
          <nav className="nav-links-menu">
            {/* 1. Home */}
            <div className="nav-link-item">
              <Link to="/" className="nav-link-anchor">
                Home
              </Link>
            </div>

            {/* 2. Repair Services with Dropdown */}
            <div className="nav-link-item has-dropdown">
              <Link to="/search?search=repair" className="nav-link-anchor">
                <span>Repair Services</span>
                <FaChevronDown className="nav-dropdown-chevron" />
              </Link>
              <div className="nav-dropdown-popover services-style-popover">
                <div className="services-list">
                  {repairServicesMenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="service-dropdown-item"
                    >
                      <span className="service-item-icon">{item.icon}</span>
                      <span className="service-item-name">{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="services-dropdown-divider" />
                <Link to="/search?search=repair" className="view-all-services-btn">
                  View All Services
                </Link>
              </div>
            </div>

            {/* 3. IT Services with Dropdown (matching media_1789671792519.png) */}
            <div className="nav-link-item has-dropdown">
              <Link to="/search?search=it-services" className="nav-link-anchor">
                <span>IT Services</span>
                <FaChevronDown className="nav-dropdown-chevron" />
              </Link>
              <div className="nav-dropdown-popover simple-dropdown-popover it-dropdown-popover">
                {itServicesMenu.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="it-dropdown-item"
                  >
                    <span className="it-item-icon">{item.icon}</span>
                    <span className="it-item-title">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Service Areas with Scrollable Mega Menu (matching media_1789671736710.png & media_1789671763632.png) */}
            <div className="nav-link-item has-dropdown service-areas-item">
              <Link to="/search?search=locations" className="nav-link-anchor">
                <span>Service Areas</span>
                <FaChevronDown className="nav-dropdown-chevron" />
              </Link>
              <div className="service-areas-mega-popover">
                {/* Top Blue Header Banner */}
                <div className="areas-header-bar">
                  <div className="header-left">
                    <span className="shield-icon">🛡️</span>
                    <span>We Repair Across Mumbai MMR</span>
                  </div>
                  <span className="areas-pill-badge">365+ areas covered</span>
                </div>

                {/* 4 Columns Scrollable Body */}
                <div className="areas-scrollable-body">
                  <div className="areas-grid">
                    {serviceAreasData.map((col) => (
                      <div key={col.region} className="area-column">
                        <div className="area-column-header">
                          <div className="col-title-row">
                            <span className="col-icon">{col.icon}</span>
                            <span className="col-name">{col.region}</span>
                          </div>
                          <div className="col-count-text">{col.count}</div>
                          <div
                            className="col-accent-line"
                            style={{ backgroundColor: col.accentColor }}
                          />
                        </div>
                        <div className="area-links-list">
                          {col.spots.map((spot) => (
                            <Link
                              key={spot}
                              to={`/search?search=${encodeURIComponent(spot)}`}
                              className="area-link"
                            >
                              <span className="bullet-dot" style={{ color: col.accentColor }}>•</span>
                              <span className="area-spot-name">{spot}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sticky Bottom Footer */}
                <div className="areas-footer-bar">
                  <div className="footer-left">
                    <span className="truck-icon">🚚</span>
                    <span>Free pickup &amp; delivery across all 365+ locations</span>
                  </div>
                  <Link to="/search?search=locations" className="btn-view-all-areas">
                    View All 365 Areas &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* 5. Buy & Sell with Dropdown (matching media_1789671783789.png) */}
            <div className="nav-link-item has-dropdown">
              <Link to="/search?category=laptops" className="nav-link-anchor">
                <span>Buy &amp; Sell</span>
                <FaChevronDown className="nav-dropdown-chevron" />
              </Link>
              <div className="nav-dropdown-popover simple-dropdown-popover">
                {buySellMenu.map((item) => (
                  <div key={item.name}>
                    {item.isDividerBefore && <div className="dropdown-divider-line" />}
                    <Link
                      to={item.path}
                      className={`simple-dropdown-item ${item.isBlue ? "item-blue" : ""}`}
                    >
                      <span className="item-title">{item.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Company with Dropdown (matching media_1789671775293.png) */}
            <div className="nav-link-item has-dropdown">
              <Link to="/search?search=about" className="nav-link-anchor">
                <span>Company</span>
                <FaChevronDown className="nav-dropdown-chevron" />
              </Link>
              <div className="nav-dropdown-popover simple-dropdown-popover">
                {companyMenu.map((item) => (
                  <div key={item.name}>
                    {item.isDividerBefore && <div className="dropdown-divider-line" />}
                    <Link
                      to={item.path}
                      className={`simple-dropdown-item ${item.isBlue ? "item-blue" : ""}`}
                    >
                      <span className="item-title">{item.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action: WhatsApp Now Button */}
          <div className="nav-action-right">
            <a
              href="https://wa.me/918655208382?text=Hi%20Solution%20Systems,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp-now-btn"
            >
              <FaWhatsapp className="whatsapp-icon" />
              <span>WhatsApp Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Mobile Drawer Overlay Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src={solutionLogo.src}
                  alt="Solution Systems"
                  className="header-brand-logo"
                  style={{ height: "46px" }}
                />
              </Link>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="drawer-section-title">Browse Categories</div>
            {browseCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{cat.name}</span>
                <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
              </Link>
            ))}

            <div className="drawer-section-title">Repair Services</div>
            {repairServicesMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.icon} {item.name}</span>
                <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
              </Link>
            ))}

            <div className="drawer-section-title">IT Services</div>
            {itServicesMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.icon} {item.name}</span>
                <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
              </Link>
            ))}

            <div className="drawer-section-title">Service Areas (Mumbai MMR)</div>
            <Link
              to="/search?search=locations"
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>📍 View All 365+ Service Locations</span>
              <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
            </Link>

            <div className="drawer-section-title">Buy &amp; Sell</div>
            {buySellMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={item.isBlue ? { color: "#2563eb", fontWeight: 700 } : undefined}>
                  {item.name}
                </span>
                <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
              </Link>
            ))}

            <div className="drawer-section-title">Company</div>
            {companyMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={item.isBlue ? { color: "#2563eb", fontWeight: 700 } : undefined}>
                  {item.name}
                </span>
                <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
              </Link>
            ))}

            <div style={{ padding: "0.75rem 1rem" }}>
              <a
                href="https://wa.me/918655208382?text=Hi%20Solution%20Systems,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-whatsapp-now-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <FaWhatsapp className="whatsapp-icon" />
                <span>WhatsApp Now (+91 86552 08382)</span>
              </a>
            </div>

            <div className="drawer-footer">
              {user?._id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Link
                    to="/orders"
                    className="drawer-login-btn"
                    style={{ background: "#0f172a" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBoxOpen />
                    <span>My Orders</span>
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="drawer-login-btn"
                      style={{ background: "#0f172a" }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaShieldAlt />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="drawer-login-btn"
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="drawer-login-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Log In / Sign Up</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

