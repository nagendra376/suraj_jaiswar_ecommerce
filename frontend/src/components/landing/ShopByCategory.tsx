import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "../../utils/router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  BsCpu,
  BsMotherboard,
  BsGpuCard,
  BsMemory,
  BsHdd,
  BsPcDisplay,
  BsPlug,
  BsFan,
  BsDisplay,
  BsChevronLeft,
  BsChevronRight,
  BsCartPlus,
} from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { addToCart } from "../../redux/reducer/cartReducer";
import { useSearchProductsQuery } from "../../redux/api/productAPI";
import { Product, CartItem } from "../../types/types";
import { transformImage } from "../../utils/features";
import { CATEGORIES_NAV } from "../../data/categoryProducts";

// Helper to render category icons
const renderCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "cpu":
      return <BsCpu />;
    case "motherboard":
      return <BsMotherboard />;
    case "gpu":
      return <BsGpuCard />;
    case "ram":
      return <BsMemory />;
    case "ssd":
    case "hdd":
      return <BsHdd />;
    case "cabinet":
      return <BsPcDisplay />;
    case "power":
      return <BsPlug />;
    case "cooler":
      return <BsFan />;
    case "monitor":
      return <BsDisplay />;
    default:
      return <BsCpu />;
  }
};

// Computech-style Product Card Component (NO EMI option as requested)
interface ProductCardProps {
  product: Product;
}

const ComputechProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const photoUrl = product.photos?.[0]?.url || "/products/bundle_4.png";
  const originalPrice =
    product.originalPrice || Math.round(product.price * 1.5);
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const inStock = product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) {
      toast.error("Out of Stock");
      return;
    }
    const cartItem: CartItem = {
      productId: product._id,
      photo: photoUrl,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock,
    };
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="computech-product-card" onClick={handleCardClick}>
      {/* Red SALE Badge */}
      <span className="card-sale-badge">SALE</span>

      {/* Product Image */}
      <div className="card-image-wrap">
        <img
          src={transformImage(photoUrl, 400)}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=60";
          }}
        />
      </div>

      {/* Product Title (2-line clamp) */}
      <h3 className="card-title" title={product.name}>
        {product.name}
      </h3>

      {/* PRICE label */}
      <span className="card-price-label">PRICE</span>

      {/* Pricing & Stock Row */}
      <div className="card-pricing-row">
        <div className="price-values">
          <span className="sale-price">₹{product.price.toLocaleString("en-IN")}</span>
          {originalPrice > product.price && (
            <span className="original-price">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="stock-indicator">
          {inStock ? (
            isLowStock ? (
              <span className="stock-low">• LOW STOCK</span>
            ) : (
              <span className="stock-in">• IN STOCK</span>
            )
          ) : (
            <span className="stock-out">• OUT OF STOCK</span>
          )}
        </div>
      </div>

      {/* Quick Add To Cart button */}
      <button
        type="button"
        className="card-quick-cart-btn"
        onClick={handleAddToCart}
        title="Add to cart"
      >
        <BsCartPlus />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

// Reusable Carousel Row Component
interface CarouselRowProps {
  title: string;
  subtitle?: string;
  iconBadge?: React.ReactNode;
  viewAllSlug?: string;
  products: Product[];
  isLoading?: boolean;
}

const CarouselRow: React.FC<CarouselRowProps> = ({
  title,
  subtitle,
  iconBadge,
  viewAllSlug,
  products,
  isLoading,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = 320;
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollEvent = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  return (
    <section className="computech-category-section">
      <div className="computech-section-header">
        <div className="header-left">
          {iconBadge && <div className="header-icon-badge">{iconBadge}</div>}
          <div className="header-titles">
            <h2 className="header-main-title">{title}</h2>
            {subtitle && <p className="header-sub-title">{subtitle}</p>}
          </div>
          {/* Circular navigation chevrons */}
          <div className="header-nav-chevrons">
            <button
              type="button"
              className="chevron-btn"
              onClick={() => handleScroll("left")}
              aria-label="Previous products"
            >
              <BsChevronLeft />
            </button>
            <button
              type="button"
              className="chevron-btn"
              onClick={() => handleScroll("right")}
              aria-label="Next products"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>

        {/* VIEW ALL > link on right */}
        {viewAllSlug && (
          <div className="header-right">
            <Link
              to={`/search?category=${encodeURIComponent(viewAllSlug)}`}
              className="view-all-link"
            >
              VIEW ALL &gt;
            </Link>
          </div>
        )}
      </div>

      {/* Product carousel row */}
      <div
        className="computech-carousel-row"
        ref={rowRef}
        onScroll={handleScrollEvent}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="computech-product-card"
              style={{
                minWidth: 260,
                height: 380,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "16px",
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  animation: "pulse 1.5s infinite",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: "16px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "50%",
                  height: "14px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "36px",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  marginTop: "auto",
                }}
              />
            </div>
          ))
        ) : products.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              width: "100%",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            No products found in this category.
          </div>
        ) : (
          products.map((item) => (
            <ComputechProductCard key={item._id} product={item} />
          ))
        )}
      </div>

      {/* Bottom Scroll Track with mini chevrons matching reference */}
      <div className="computech-scroll-track-wrap">
        <button
          type="button"
          className="mini-track-btn"
          onClick={() => handleScroll("left")}
        >
          &#9664;
        </button>
        <div className="mini-track-bar">
          <div
            className="mini-track-thumb"
            style={{
              left: `${Math.min(Math.max(scrollProgress, 0), 85)}%`,
            }}
          />
        </div>
        <button
          type="button"
          className="mini-track-btn"
          onClick={() => handleScroll("right")}
        >
          &#9654;
        </button>
      </div>
    </section>
  );
};

// Main Component
const ShopByCategory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("processor");
  const catTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkCatScroll = () => {
    const el = catTrackRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanScrollLeft(hasOverflow && el.scrollLeft > 10);
    setCanScrollRight(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10
    );
  };

  useEffect(() => {
    // Initial check after render & image/font settlement
    checkCatScroll();
    const timer = setTimeout(checkCatScroll, 300);
    window.addEventListener("resize", checkCatScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkCatScroll);
    };
  }, []);

  const handleCatScroll = (direction: "left" | "right") => {
    const el = catTrackRef.current;
    if (!el) return;
    const scrollAmount = 280;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Query active category dynamically from backend API - Page 1
  const { data: page1Data, isLoading: isPage1Loading } = useSearchProductsQuery({
    search: "",
    category: activeCategory,
    page: 1,
    price: 500000,
    sort: "",
  });

  // Query page 2 to get all 10+ seeded products (backend paginates 8 per page)
  const { data: page2Data } = useSearchProductsQuery(
    {
      search: "",
      category: activeCategory,
      page: 2,
      price: 500000,
      sort: "",
    },
    {
      skip: !page1Data || (page1Data.totalPage ?? 1) < 2,
    }
  );

  const activeCategoryInfo =
    CATEGORIES_NAV.find((c) => c.slug === activeCategory) || CATEGORIES_NAV[0];

  const activeProducts = [
    ...(page1Data?.products || []),
    ...(page2Data?.products || []),
  ];

  return (
    <div className="computech-shop-container">
      {/* 1. SHOP BY CATEGORY BAR */}
      <div className="shop-by-category-bar">
        <h2 className="shop-by-category-title">SHOP BY CATEGORY</h2>
        <div className="categories-scroll-wrapper">
          <button
            type="button"
            className={`cat-scroll-arrow left ${canScrollLeft ? "visible" : ""}`}
            onClick={() => handleCatScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous categories"
          >
            <BsChevronLeft />
          </button>

          <div
            className="categories-horizontal-track"
            ref={catTrackRef}
            onScroll={checkCatScroll}
          >
            {CATEGORIES_NAV.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  className={`category-item-card ${isActive ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.slug)}
                  aria-pressed={isActive}
                >
                  <div className="category-icon-box">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="category-real-img"
                        loading="lazy"
                      />
                    ) : (
                      renderCategoryIcon(cat.iconName)
                    )}
                  </div>
                  <span className="category-label">{cat.name}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`cat-scroll-arrow right ${canScrollRight ? "visible" : ""}`}
            onClick={() => handleCatScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next categories"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* 2. ONLY THE ACTIVE CATEGORY CAROUSEL */}
      <CarouselRow
        key={activeCategory}
        title={activeCategoryInfo.name.toUpperCase()}
        subtitle="TOP HANDPICKED PRODUCTS"
        iconBadge={
          <div className="active-cat-badge">
            {activeCategoryInfo.image ? (
              <img
                src={activeCategoryInfo.image}
                alt={activeCategoryInfo.name}
                className="active-cat-badge-img"
              />
            ) : (
              renderCategoryIcon(activeCategoryInfo.iconName)
            )}
          </div>
        }
        viewAllSlug={activeCategoryInfo.slug}
        products={activeProducts}
        isLoading={isPage1Loading}
      />
    </div>
  );
};

export default ShopByCategory;
