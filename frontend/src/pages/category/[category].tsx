import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Link } from "../../utils/router";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../../redux/api/productAPI";
import CategoryProductCard from "../../components/category-product-card";
import { Skeleton } from "../../components/loader";
import {
  FaFilter,
  FaChevronDown,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUndo,
} from "react-icons/fa";

// Category metadata & alias dictionary
const CATEGORY_MAP: Record<
  string,
  { title: string; backendCategory: string; subtitle: string }
> = {
  processor: {
    title: "Processor",
    backendCategory: "processor",
    subtitle: "High-Performance AMD Ryzen & Intel Core CPUs for Gaming & Workstations",
  },
  cpu: {
    title: "Processor",
    backendCategory: "processor",
    subtitle: "High-Performance AMD Ryzen & Intel Core CPUs for Gaming & Workstations",
  },
  motherboard: {
    title: "Motherboard",
    backendCategory: "motherboard",
    subtitle: "AMD AM5/AM4 & Intel LGA1700/1851 Feature-Packed Gaming Motherboards",
  },
  ram: {
    title: "Memory (RAM)",
    backendCategory: "ram",
    subtitle: "Ultra-Fast DDR4 & DDR5 Dual-Channel High-Speed Desktop Memory",
  },
  "memory-ram": {
    title: "Memory (RAM)",
    backendCategory: "ram",
    subtitle: "Ultra-Fast DDR4 & DDR5 Dual-Channel High-Speed Desktop Memory",
  },
  "graphics-card": {
    title: "Graphics Card",
    backendCategory: "graphics-card",
    subtitle: "NVIDIA GeForce RTX & AMD Radeon High-FPS Visual Powerhouses",
  },
  gpu: {
    title: "Graphics Card",
    backendCategory: "graphics-card",
    subtitle: "NVIDIA GeForce RTX & AMD Radeon High-FPS Visual Powerhouses",
  },
  ssd: {
    title: "Solid State Drive (SSD)",
    backendCategory: "ssd",
    subtitle: "PCIe Gen4 & Gen5 NVMe Lightning-Fast Internal Solid State Drives",
  },
  storage: {
    title: "Storage & Hard Drives",
    backendCategory: "storage",
    subtitle: "High-Capacity Internal & External HDDs & SSD Mass Storage",
  },
  hdd: {
    title: "Storage & Hard Drives",
    backendCategory: "storage",
    subtitle: "High-Capacity Internal & External HDDs & SSD Mass Storage",
  },
  cooler: {
    title: "Cooling System",
    backendCategory: "cooler",
    subtitle: "AIO Liquid CPU Coolers & High-Performance Silent Air Towers",
  },
  "cpu-cooler": {
    title: "Cooling System",
    backendCategory: "cooler",
    subtitle: "AIO Liquid CPU Coolers & High-Performance Silent Air Towers",
  },
  "power-supply": {
    title: "Power Supply Unit (PSU)",
    backendCategory: "power-supply",
    subtitle: "80 Plus Bronze, Gold & Platinum ATX 3.0 Fully Modular Reliable Power",
  },
  psu: {
    title: "Power Supply Unit (PSU)",
    backendCategory: "power-supply",
    subtitle: "80 Plus Bronze, Gold & Platinum ATX 3.0 Fully Modular Reliable Power",
  },
  cabinet: {
    title: "Cabinet (PC Case)",
    backendCategory: "cabinet",
    subtitle: "ARGB Tempered Glass High-Airflow Premium Desktop Cabinets",
  },
  case: {
    title: "Cabinet (PC Case)",
    backendCategory: "cabinet",
    subtitle: "ARGB Tempered Glass High-Airflow Premium Desktop Cabinets",
  },
  monitor: {
    title: "Gaming & Professional Monitor",
    backendCategory: "monitor",
    subtitle: "High Refresh Rate IPS, OLED & Curved Ultra-Wide Displays",
  },
  laptop: {
    title: "Laptops & Notebooks",
    backendCategory: "laptop",
    subtitle: "High-Performance Gaming, Creator & Business Portable Machines",
  },
  laptops: {
    title: "Laptops & Notebooks",
    backendCategory: "laptop",
    subtitle: "High-Performance Gaming, Creator & Business Portable Machines",
  },
  "custom-pc-build": {
    title: "Custom PC Builds",
    backendCategory: "custom-pc-build",
    subtitle: "Turnkey Prebuilt & Custom Configured Gaming & Workstation Desktops",
  },
};

const CategoryPage = () => {
  const router = useRouter();
  const rawParam = (router.query.category as string) || "";
  const slug = rawParam.toLowerCase();

  // Map slug to category metadata or fallback gracefully
  const categoryMeta = useMemo(() => {
    if (CATEGORY_MAP[slug]) {
      return CATEGORY_MAP[slug];
    }
    const cleanName = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: cleanName || "All Gear",
      backendCategory: slug,
      subtitle: `Explore premium ${cleanName || "hardware"} components and systems`,
    };
  }, [slug]);

  // Categories list for the sidebar filter
  const { data: categoriesResponse } = useCategoriesQuery("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [page, setPage] = useState<number>(1);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Reset page when category or search changes
  useEffect(() => {
    setPage(1);
  }, [slug, searchTerm, sort, maxPrice, inStockOnly]);

  // Query Products from RTK Query
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useSearchProductsQuery({
    category: categoryMeta.backendCategory,
    page,
    sort,
    price: maxPrice,
    search: searchTerm,
  });

  const totalPages = productData?.totalPage || 1;

  // Client-side stock filtering if checked
  const filteredProducts = useMemo(() => {
    const raw = productData?.products || [];
    if (!inStockOnly) return raw;
    return raw.filter((p) => p.stock > 0);
  }, [productData?.products, inStockOnly]);

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSort("");
    setMaxPrice(1000000);
    setInStockOnly(false);
    setPage(1);
  };

  return (
    <div className="category-page-wrapper">
      <div className="category-content-container">
        {/* 1. Breadcrumbs Row */}
        <nav
          className="category-breadcrumbs-bar"
          aria-label="Breadcrumb navigation"
        >
          <Link to="/">HOME</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/category">CATEGORIES</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">
            {categoryMeta.title.toUpperCase()}
          </span>
        </nav>

        {/* 2. Category Header Row with Search & Sort */}
        <div className="category-header-banner">
          <div className="header-titles-group">
            <h1 className="category-title-text">{categoryMeta.title}</h1>
            <p className="category-subtitle-text">
              REVIEW AND FILTER YOUR SELECTED GEAR.
            </p>
          </div>

          <div className="header-actions-group">
            {/* Search Input Box */}
            <div className="search-box-wrap">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-field-input"
                placeholder={`Search in ${categoryMeta.title}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Select Dropdown */}
            <div className="sort-select-dropdown">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="">Sort: Newest</option>
                <option value="asc">Price: Low to High</option>
                <option value="dsc">Price: High to Low</option>
              </select>
              <FaChevronDown className="dropdown-chevron-icon" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              className="btn-mobile-filters"
              onClick={() => setMobileFilterOpen((prev) => !prev)}
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* 3. Main Two-Column Layout */}
        <div className="category-body-layout">
          {/* Left Filter Sidebar (matching user image 1) */}
          <aside
            className={`category-filter-sidebar ${
              mobileFilterOpen ? "mobile-active" : ""
            }`}
          >
            <div className="filter-panel-title">
              <span>Filters</span>
              {(searchTerm || sort || maxPrice < 1000000 || inStockOnly) && (
                <button
                  type="button"
                  className="btn-clear-all"
                  onClick={handleResetFilters}
                >
                  <FaUndo style={{ fontSize: "0.65rem", marginRight: "3px" }} />
                  Reset
                </button>
              )}
            </div>

            {/* Filter 1: Sort by Price */}
            <div className="filter-group-block">
              <div className="filter-group-heading">Sort</div>
              <select
                className="filter-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default (Newest)</option>
                <option value="asc">Price (Low to High)</option>
                <option value="dsc">Price (High to Low)</option>
              </select>
            </div>

            {/* Filter 2: Max Price Range */}
            <div className="filter-group-block">
              <div className="price-slider-label">
                <span>Max Price:</span>
                <span className="price-highlight">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                className="price-range-input"
                min={500}
                max={1000000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-slider-limits">
                <span>₹500</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Filter 3: Category Switcher */}
            <div className="filter-group-block">
              <div className="filter-group-heading">Category</div>
              <select
                className="filter-select"
                value={slug}
                onChange={(e) => {
                  const targetCat = e.target.value;
                  if (targetCat) router.push(`/category/${targetCat}`);
                }}
              >
                <option value={slug}>{categoryMeta.title.toUpperCase()}</option>
                {categoriesResponse?.categories
                  ?.filter((c) => c.toLowerCase() !== slug)
                  ?.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>

            {/* Filter 4: In-Stock Only */}
            <div className="filter-group-block">
              <label className="stock-checkbox-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid Container */}
          <main className="category-products-container">
            {/* Meta summary */}
            <div className="products-meta-summary">
              Showing{" "}
              <strong>
                {filteredProducts.length} product
                {filteredProducts.length === 1 ? "" : "s"}
              </strong>{" "}
              in {categoryMeta.title}
            </div>

            {/* Product Cards Grid (4 Columns) */}
            {isLoading || isFetching ? (
              <div className="products-4col-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} length={6} width="100%" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="products-4col-grid">
                {filteredProducts.map((product) => (
                  <CategoryProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="category-empty-panel">
                <div className="empty-icon-wrap">🔍</div>
                <h3>No Products Found</h3>
                <p>
                  We couldn&apos;t find any products in{" "}
                  <strong>{categoryMeta.title}</strong> matching your current
                  filter selections.
                </p>
                <button
                  type="button"
                  className="btn-empty-reset"
                  onClick={handleResetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* 4. Pagination / Rest Products Controls */}
            {totalPages > 1 && (
              <nav
                className="category-pagination-bar"
                aria-label="Products pagination"
              >
                <button
                  type="button"
                  className="btn-page-step"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                >
                  <FaChevronLeft style={{ fontSize: "0.75rem" }} />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      className={`page-number-pill ${
                        page === pageNum ? "active" : ""
                      }`}
                      onClick={() => {
                        setPage(pageNum);
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="btn-page-step"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                >
                  <span>Next</span>
                  <FaChevronRight style={{ fontSize: "0.75rem" }} />
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
