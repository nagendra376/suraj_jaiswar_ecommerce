import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
} from "react-icons/fa";
import { User } from "../types/types";
import { RootState } from "../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import solutionLogo from "../assets/solution-systems-logo.png";

interface PropsType {
  user: User | null;
}

// Categories from Browse Gear dropdown
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

const Header = ({ user }: PropsType) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <div className="marquee-inner">
          <div className="marquee-content">
            <span className="red-dot" />
            <span>WELCOME TO SOLUTION SYSTEMS</span>
            <span>|</span>
            <span>CASH ON DELIVERY (COD) <span className="highlight-alert">❌ NOT AVAILABLE</span></span>
            <span>|</span>
            <span>FLEXIBLE EMI FINANCE OPTIONS AVAILABLE</span>
            <span>|</span>
            <span>SHIPPING ALL OVER INDIA</span>
            <span>|</span>
            <span>B2B BILLING AVAILABLE</span>
            <span>|</span>
            <span>100% NEW GENUINE &amp; ORIGINAL PRODUCTS</span>
            <span className="red-dot" />
          </div>
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
              src={solutionLogo}
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
            <Link to="/cart" className="btn-cart-pill" aria-label="View Shopping Cart">
              <FaShoppingBag className="cart-icon" />
              <span className="cart-label">Cart</span>
              <span className="cart-badge-count">{totalCartCount}</span>
            </Link>
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

          {/* Horizontal Navigation Links */}
          <nav className="nav-links-menu">
            {/* Experience Zone with Popover */}
            <div className="nav-link-item">
              <Link to="/search?category=gaming" className="nav-link-anchor">
                Experience Zone
              </Link>
              <div className="mega-menu-popover">
                <Link to="/search?category=graphics-card" className="mega-item">
                  AMD Graphics
                </Link>
                <Link to="/search?category=graphics-card" className="mega-item">
                  Nvidia Graphics
                </Link>
                <Link to="/search?category=custom-pc-build" className="mega-item">
                  Gaming Desktops
                </Link>
              </div>
            </div>

            {/* Gamer's Tech */}
            <div className="nav-link-item">
              <Link to="/search?category=gaming" className="nav-link-anchor">
                Gamer&apos;s Tech
              </Link>
            </div>

            {/* Peripherals with Popover */}
            <div className="nav-link-item">
              <Link to="/search?category=peripherals" className="nav-link-anchor">
                Peripherals
              </Link>
              <div className="mega-menu-popover">
                <Link to="/search?category=mouse" className="mega-item">
                  Gaming Mouse
                </Link>
                <Link to="/search?category=keyboard" className="mega-item">
                  Mechanical Keyboards
                </Link>
                <Link to="/search?category=mouse-pad" className="mega-item">
                  RGB Mouse Pads
                </Link>
                <Link to="/search?category=headphones" className="mega-item">
                  Gaming Headsets
                </Link>
                <Link to="/search?category=game-controllers" className="mega-item">
                  Game Controllers
                </Link>
              </div>
            </div>

            {/* Laptop Zone */}
            <div className="nav-link-item">
              <Link to="/search?category=laptops" className="nav-link-anchor">
                Laptop Zone
              </Link>
            </div>

            {/* INNO3D Zone */}
            <div className="nav-link-item">
              <Link to="/search?category=graphics-card" className="nav-link-anchor">
                INNO3D Zone
              </Link>
            </div>
          </nav>
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
                  src={solutionLogo}
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

            <div className="drawer-section-title">Featured Zones</div>
            <Link
              to="/search?category=gaming"
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Experience Zone</span>
              <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
            </Link>
            <Link
              to="/search?category=peripherals"
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Peripherals</span>
              <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
            </Link>
            <Link
              to="/search?category=laptops"
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Laptop Zone</span>
              <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
            </Link>
            <Link
              to="/search?category=graphics-card"
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>INNO3D Zone</span>
              <FaChevronRight style={{ fontSize: "0.75rem", color: "#cbd5e1" }} />
            </Link>

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

