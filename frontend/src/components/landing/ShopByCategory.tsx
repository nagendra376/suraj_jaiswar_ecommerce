import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  CATEGORIES_NAV,
  FALLBACK_FEATURED,
  FALLBACK_PROCESSORS,
  FALLBACK_MOTHERBOARDS,
  FALLBACK_RAM,
  FALLBACK_GPUS,
} from "../../data/categoryProducts";

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
}

const CarouselRow: React.FC<CarouselRowProps> = ({
  title,
  subtitle,
  iconBadge,
  viewAllSlug,
  products,
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
        {products.map((item) => (
          <ComputechProductCard key={item._id} product={item} />
        ))}
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
  // Query each category dynamically from backend API
  const { data: featuredData } = useSearchProductsQuery({
    search: "",
    category: "featured",
    page: 1,
    price: 500000,
    sort: "",
  });

  const { data: processorData } = useSearchProductsQuery({
    search: "",
    category: "processor",
    page: 1,
    price: 500000,
    sort: "",
  });

  const { data: motherboardData } = useSearchProductsQuery({
    search: "",
    category: "motherboard",
    page: 1,
    price: 500000,
    sort: "",
  });

  const { data: ramData } = useSearchProductsQuery({
    search: "",
    category: "ram",
    page: 1,
    price: 500000,
    sort: "",
  });

  const { data: gpuData } = useSearchProductsQuery({
    search: "",
    category: "graphics-card",
    page: 1,
    price: 500000,
    sort: "",
  });

  // Use dynamic products from database if present, else use fallback
  const featuredProducts =
    featuredData?.products && featuredData.products.length > 0
      ? featuredData.products
      : FALLBACK_FEATURED;

  const processorProducts =
    processorData?.products && processorData.products.length > 0
      ? processorData.products
      : FALLBACK_PROCESSORS;

  const motherboardProducts =
    motherboardData?.products && motherboardData.products.length > 0
      ? motherboardData.products
      : FALLBACK_MOTHERBOARDS;

  const ramProducts =
    ramData?.products && ramData.products.length > 0
      ? ramData.products
      : FALLBACK_RAM;

  const gpuProducts =
    gpuData?.products && gpuData.products.length > 0
      ? gpuData.products
      : FALLBACK_GPUS;

  return (
    <div className="computech-shop-container">
      {/* 1. SHOP BY CATEGORY BAR */}
      <div className="shop-by-category-bar">
        <h2 className="shop-by-category-title">SHOP BY CATEGORY</h2>
        <div className="categories-grid">
          {CATEGORIES_NAV.map((cat) => (
            <Link
              key={cat.slug}
              to={`/search?category=${encodeURIComponent(cat.slug)}`}
              className="category-item-card"
            >
              <div className="category-icon-box">
                {renderCategoryIcon(cat.iconName)}
              </div>
              <span className="category-label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. FEATURED HIGHLIGHTS */}
      <CarouselRow
        title="FEATURED HIGHLIGHTS"
        subtitle="TOP HANDPICKED PRODUCTS"
        iconBadge={<FaStar className="gold-star-icon" />}
        products={featuredProducts}
      />

      {/* 3. PROCESSOR */}
      <CarouselRow
        title="PROCESSOR"
        viewAllSlug="processor"
        products={processorProducts}
      />

      {/* 4. MOTHERBOARD */}
      <CarouselRow
        title="MOTHERBOARD"
        viewAllSlug="motherboard"
        products={motherboardProducts}
      />

      {/* 5. MEMORY (RAM) */}
      <CarouselRow
        title="MEMORY (RAM)"
        viewAllSlug="ram"
        products={ramProducts}
      />

      {/* 6. GRAPHICS CARD */}
      <CarouselRow
        title="GRAPHICS CARD"
        viewAllSlug="graphics-card"
        products={gpuProducts}
      />
    </div>
  );
};

export default ShopByCategory;
