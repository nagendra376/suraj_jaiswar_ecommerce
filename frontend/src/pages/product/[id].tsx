import { useRef, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaRegStar,
  FaStar,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaWhatsapp,
  FaShoppingCart,
  FaBolt,
  FaEdit,
  FaPlus,
  FaMinus,
  FaUndo,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaCalendarAlt,
  FaEye,
  FaRegClock,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "../../utils/router";
import { Skeleton } from "../../components/loader";
import RatingsComponent from "../../components/ratings";
import CategoryProductCard from "../../components/category-product-card";
import {
  useAllReviewsOfProductsQuery,
  useDeleteReviewMutation,
  useNewReviewMutation,
  useProductDetailsQuery,
  useSearchProductsQuery,
} from "../../redux/api/productAPI";
import { addToCart } from "../../redux/reducer/cartReducer";
import { RootState } from "../../redux/store";
import { CartItem, Product, Review } from "../../types/types";
import { responseToast, transformImage } from "../../utils/features";

// Smart Specification Extractor (Produces specification table matching user image 2)
const extractSpecs = (product?: Product) => {
  if (!product) return [];

  const name = product.name || "";
  const desc = product.description || "";
  const cat = (product.category || "").toLowerCase();

  // Detect Brand
  let brand = "Solution Systems Certified";
  if (/amd|ryzen/i.test(name)) brand = "AMD";
  else if (/intel|core/i.test(name)) brand = "Intel";
  else if (/nvidia|geforce|rtx|gtx/i.test(name)) brand = "NVIDIA";
  else if (/asus|rog|tuf/i.test(name)) brand = "ASUS";
  else if (/msi/i.test(name)) brand = "MSI";
  else if (/gigabyte|aorus/i.test(name)) brand = "Gigabyte";
  else if (/corsair/i.test(name)) brand = "Corsair";
  else if (/crucial/i.test(name)) brand = "Crucial";
  else if (/samsung/i.test(name)) brand = "Samsung";
  else if (/kingston/i.test(name)) brand = "Kingston";
  else if (/deepcool/i.test(name)) brand = "DeepCool";
  else if (/ant esports/i.test(name)) brand = "Ant Esports";
  else if (/lian li/i.test(name)) brand = "Lian Li";

  // Detect Socket
  let socket = "-";
  if (/am5/i.test(name) || /am5/i.test(desc)) socket = "AM5";
  else if (/am4/i.test(name) || /am4/i.test(desc)) socket = "AM4";
  else if (/lga\s*1851/i.test(name) || /lga\s*1851/i.test(desc)) socket = "LGA1851";
  else if (/lga\s*1700/i.test(name) || /lga\s*1700/i.test(desc)) socket = "LGA1700";
  else if (/lga\s*1200/i.test(name) || /lga\s*1200/i.test(desc)) socket = "LGA1200";

  // Detect Cores
  const coresMatch = name.match(/(\d+)\s*(?:cores|core)/i) || desc.match(/(\d+)\s*(?:cores|core)/i);
  const cores = coresMatch ? coresMatch[1] : cat === "processor" ? "16" : "-";

  // Detect Threads
  const threadsMatch = name.match(/(\d+)\s*(?:threads|thread)/i) || desc.match(/(\d+)\s*(?:threads|thread)/i);
  const threads = threadsMatch ? threadsMatch[1] : cat === "processor" ? "32" : "-";

  // Detect Series
  let series = "-";
  if (/ryzen\s*9/i.test(name)) series = "Ryzen 9";
  else if (/ryzen\s*7/i.test(name)) series = "Ryzen 7";
  else if (/ryzen\s*5/i.test(name)) series = "Ryzen 5";
  else if (/core\s*ultra\s*9|i9/i.test(name)) series = "Intel Core i9 / Ultra 9";
  else if (/core\s*ultra\s*7|i7/i.test(name)) series = "Intel Core i7 / Ultra 7";
  else if (/core\s*ultra\s*5|i5/i.test(name)) series = "Intel Core i5 / Ultra 5";
  else if (/rtx\s*4090/i.test(name)) series = "GeForce RTX 4090";
  else if (/rtx\s*4080/i.test(name)) series = "GeForce RTX 4080";
  else if (/rtx\s*4070/i.test(name)) series = "GeForce RTX 4070";
  else if (/rtx\s*4060/i.test(name)) series = "GeForce RTX 4060";
  else if (/rx\s*7600/i.test(name)) series = "Radeon RX 7600 Series";

  // Model Match
  let model = name.split("(")[0].trim();
  const modelMatch = name.match(/(Ryzen\s*\d\s*\w+|RTX\s*\d{4}\s*\w*|RX\s*\d{4}\s*\w*|i\d-\d+\w*|Ultra\s*\d\s*\w+)/i);
  if (modelMatch) model = modelMatch[0];

  const specsList: { label: string; value: string }[] = [
    { label: "BRANDS", value: brand },
  ];

  if (socket !== "-") {
    specsList.push({ label: "SOCKET", value: socket });
  }

  if (threads !== "-") {
    specsList.push({ label: "THREADS", value: threads });
  }

  specsList.push({ label: "WARRANTY", value: "3 Years" });

  if (cores !== "-") {
    specsList.push({ label: "CPU-CORES", value: cores });
  }

  if (model && model !== "-") {
    specsList.push({ label: "PROCESSOR-MODEL", value: model });
  }

  if (series !== "-") {
    specsList.push({ label: "PROCESSOR-SERIES", value: series });
  }

  // Common additional specifications
  specsList.push(
    { label: "CONDITION", value: "100% Brand New Sealed Unit" },
    { label: "PACKAGING", value: "Original Retail / Authorized Distributor Pack" },
    { label: "GST INVOICE", value: "Official Tax Invoice Provided (Input Credit Eligible)" }
  );

  return specsList;
};

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userReducer);

  // Product Query
  const { isLoading, isError, data } = useProductDetailsQuery(
    params.id as string,
    { skip: !params.id }
  );

  // Reviews Query
  const reviewsResponse = useAllReviewsOfProductsQuery(params.id as string, {
    skip: !params.id,
  });

  // Related Products Query (same category)
  const productCategory = data?.product?.category || "";
  const { data: relatedData } = useSearchProductsQuery(
    {
      category: productCategory,
      page: 1,
      sort: "",
      price: 1000000,
      search: "",
    },
    { skip: !productCategory }
  );

  // Related products filtered to exclude current product
  const relatedProducts = useMemo(() => {
    return (
      relatedData?.products
        ?.filter((p) => p._id !== params.id)
        ?.slice(0, 4) || []
    );
  }, [relatedData?.products, params.id]);

  // Gallery Active Image
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Active Tab: "overview" | "specs" | "reviews" | "qa"
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews" | "qa">("overview");

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Review State
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const reviewDialogRef = useRef<HTMLDialogElement>(null);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  // Q&A State
  const [questionInput, setQuestionInput] = useState("");
  const [questionsList, setQuestionsList] = useState<
    { id: string; question: string; author: string; date: string; answer?: string }[]
  >([]);

  // Mutations
  const [createReview] = useNewReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const product = data?.product;
  const inStock = (product?.stock ?? 0) > 0;
  const originalPrice =
    product?.originalPrice && product.originalPrice > product.price
      ? product.originalPrice
      : Math.round((product?.price || 0) * 1.35);
  const savingsAmount = originalPrice - (product?.price || 0);
  const discountPercent =
    originalPrice > 0 ? Math.round((savingsAmount / originalPrice) * 100) : 0;

  // Safe photo array ensuring thumbnails are always available (matching user screenshot)
  const displayPhotos = useMemo(() => {
    if (product?.photos && product.photos.length > 0) {
      return product.photos;
    }
    return [
      {
        url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=700&auto=format&fit=crop&q=60",
        public_id: "default-product-photo",
      },
    ];
  }, [product?.photos]);

  // Gallery Photo Navigation Arrows
  const handlePrevPhoto = () => {
    if (!displayPhotos.length) return;
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? displayPhotos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    if (!displayPhotos.length) return;
    setSelectedPhotoIndex((prev) =>
      prev === displayPhotos.length - 1 ? 0 : prev + 1
    );
  };

  // Dynamic estimated delivery date range (+3 to +7 days from today)
  const deliveryEstimate = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() + 3);
    const end = new Date(now);
    end.setDate(now.getDate() + 7);

    const formatDay = (d: Date) => {
      const day = d.getDate();
      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
          ? "rd"
          : "th";
      const month = d.toLocaleDateString("en-IN", { month: "short" });
      return `${day}${suffix} ${month}`;
    };

    return `${formatDay(start)} to ${formatDay(end)}`;
  }, []);

  // Dynamic SKU code
  const sku = useMemo(() => {
    if (!product) return "SS-HW-001";
    const catCode = (product.category || "HW").slice(0, 3).toUpperCase();
    const idCode = (product._id || "").slice(-6).toUpperCase();
    return `${catCode}-${idCode}`;
  }, [product]);

  // Detected Brand
  const detectedBrand = useMemo(() => {
    if (!product) return "SOLUTION SYSTEMS";
    const name = product.name.toLowerCase();
    if (name.includes("amd") || name.includes("ryzen")) return "AMD";
    if (name.includes("intel")) return "INTEL";
    if (name.includes("nvidia") || name.includes("rtx") || name.includes("gtx")) return "NVIDIA";
    if (name.includes("samsung")) return "SAMSUNG";
    if (name.includes("asus")) return "ASUS";
    if (name.includes("msi")) return "MSI";
    if (name.includes("gigabyte")) return "GIGABYTE";
    if (name.includes("crucial")) return "CRUCIAL";
    if (name.includes("corsair")) return "CORSAIR";
    if (name.includes("geil")) return "GEIL";
    if (name.includes("g.skill")) return "G.SKILL";
    return "SOLUTION SYSTEMS";
  }, [product]);

  // Share Handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: product?.name,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      }
    }
  };

  // Quantity Handlers
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => {
    if (product?.stock && quantity >= product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  // Add to Cart Handler
  const addToCartHandler = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!product || product.stock < 1) {
      toast.error("Product is currently Out of Stock");
      return;
    }

    const photoUrl = product.photos?.[0]?.url || "";
    const cartItem: CartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      quantity,
      photo: photoUrl,
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  // Buy Now Handler
  const buyNowHandler = () => {
    if (!product || product.stock < 1) {
      toast.error("Product is currently Out of Stock");
      return;
    }
    addToCartHandler();
    navigate("/shipping");
  };

  // Review Dialog Handlers
  const openReviewDialog = () => {
    if (!user) {
      toast.error("Please log in to write a review");
      navigate("/login");
      return;
    }
    reviewDialogRef.current?.showModal();
  };

  const closeReviewDialog = () => {
    reviewDialogRef.current?.close();
    setReviewComment("");
    setReviewRating(5);
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error("Please enter your review comments");
      return;
    }

    setReviewSubmitLoading(true);
    closeReviewDialog();

    const res = await createReview({
      comment: reviewComment.trim(),
      rating: reviewRating,
      userId: user?._id,
      productId: (params.id as string)!,
    });

    setReviewSubmitLoading(false);
    responseToast(res, null, "");
  };

  const handleDeleteReview = async (reviewId: string) => {
    const res = await deleteReview({ reviewId, userId: user?._id });
    responseToast(res, null, "");
  };

  // Q&A Submit Handler
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) {
      toast.error("Please enter your question before submitting");
      return;
    }

    const newQ = {
      id: Date.now().toString(),
      question: questionInput.trim(),
      author: user?.name || "Customer",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      answer: undefined,
    };

    setQuestionsList((prev) => [newQ, ...prev]);
    setQuestionInput("");
    toast.success("Question submitted! Our hardware team will answer shortly.");
  };

  const specs = useMemo(() => extractSpecs(product), [product]);
  const totalReviews = reviewsResponse.data?.reviews?.length || product?.numOfReviews || 0;

  if (isError) return <Navigate to="/404" />;

  return (
    <div className="single-product-page-wrapper">
      <div className="single-product-container">
        {/* 1. Breadcrumbs Bar */}
        <nav
          className="product-breadcrumbs-nav"
          aria-label="Breadcrumb navigation"
        >
          <Link to="/">HOME</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/category">CATEGORIES</Link>
          {product?.category && (
            <>
              <span className="breadcrumb-separator">/</span>
              <Link to={`/category/${product.category.toLowerCase()}`}>
                {product.category.toUpperCase()}
              </Link>
            </>
          )}
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active" title={product?.name}>
            {product?.name ? product.name.slice(0, 45) + (product.name.length > 45 ? "..." : "") : "DETAILS"}
          </span>
        </nav>

        {isLoading ? (
          <ProductPageSkeleton />
        ) : product ? (
          <>
            {/* 2. Top Two-Column Hero Showcase (matching media_1790370724848.png) */}
            <div className="product-hero-showcase">
              {/* Left Card: Gallery Card (matching media_1790371079572.png) */}
              <div className="product-gallery-card">
                {/* Main Showcase Image Frame with embedded badges, chevrons, and centered image */}
                <div className="gallery-main-stage">
                  {/* Top-Left: Red SALE badge */}
                  <span className="pill-badge-sale">SALE</span>

                  {/* Top-Right: DISPATCH IN 0-24 HOURS frosted pill */}
                  <div className="pill-badge-dispatch">
                    <div className="dispatch-clock-circle">
                      <FaRegClock className="dispatch-clock-icon" />
                    </div>
                    <div className="dispatch-text-block">
                      <span className="dispatch-sub">DISPATCH IN</span>
                      <span className="dispatch-main">0-24 HOURS</span>
                    </div>
                  </div>

                  {/* Left Navigation Chevron Button */}
                  <button
                    type="button"
                    className="gallery-nav-arrow arrow-left"
                    onClick={handlePrevPhoto}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>

                  {/* Showcase Active Image */}
                  <img
                    src={
                      displayPhotos[selectedPhotoIndex]?.url
                        ? transformImage(displayPhotos[selectedPhotoIndex].url, 800)
                        : "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60"
                    }
                    alt={product.name}
                    className="gallery-active-image"
                  />

                  {/* Right Navigation Chevron Button */}
                  <button
                    type="button"
                    className="gallery-nav-arrow arrow-right"
                    onClick={handleNextPhoto}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Thumbnails Row below the main frame - ALWAYS shown matching user request & screenshot */}
                <div className="gallery-thumbnails-strip">
                  {displayPhotos.map((photo, idx) => (
                    <button
                      key={photo.public_id || idx}
                      type="button"
                      className={`gallery-thumb-btn ${
                        selectedPhotoIndex === idx ? "active-thumb" : ""
                      }`}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      aria-label={`Select product image ${idx + 1}`}
                    >
                      <img
                        src={transformImage(photo.url, 140)}
                        alt={`${product.name} thumb ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Card: Details & Purchase Card */}
              <div className="product-details-card">
                {/* Category Pill */}
                <div className="product-category-row">
                  <span className="product-category-pill">
                    {product.category.toUpperCase()}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="product-title-heading">{product.name}</h1>

                {/* SKU Code */}
                <div className="product-sku-row">
                  <span className="sku-label">SKU:</span>
                  <span className="sku-code">{sku}</span>
                </div>

                {/* Brand Chip & Share Button Row */}
                <div className="product-brand-share-row">
                  <span className="product-brand-chip">{detectedBrand}</span>
                  <button
                    type="button"
                    className="btn-share-product"
                    onClick={handleShare}
                    title="Share this product"
                  >
                    <FaShareAlt className="share-icon" />
                    <span>SHARE</span>
                  </button>
                </div>

                <div className="product-card-divider" />

                {/* Live Urgency Activity Box */}
                <div className="live-urgency-box">
                  <div className="urgency-item">
                    <FaCalendarAlt className="urgency-icon" />
                    <span>
                      Estimated Delivery: <strong>{deliveryEstimate}</strong>
                    </span>
                  </div>
                  <div className="urgency-item">
                    <FaEye className="urgency-icon" />
                    <span>
                      <strong>425 users</strong> viewing this item right now
                    </span>
                  </div>
                  <div className="urgency-item">
                    <FaBolt className="urgency-icon" />
                    <span>
                      <strong>5 tech enthusiasts</strong> have this in their cart right now
                    </span>
                  </div>
                </div>

                {/* Pricing & Stock Availability Row */}
                <div className="pricing-availability-row">
                  <div className="pricing-left-block">
                    {originalPrice > product.price && (
                      <div className="original-strikethrough-price">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </div>
                    )}
                    <div className="current-price-row">
                      <span className="current-selling-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="save-extra-badge">SAVE EXTRA</span>
                    </div>
                  </div>

                  <div className="availability-right-block">
                    <span className="avail-label">AVAILABILITY</span>
                    {inStock ? (
                      <span className="avail-status in-stock">
                        <span className="status-dot green" /> IN STOCK
                      </span>
                    ) : (
                      <span className="avail-status out-stock">
                        <span className="status-dot red" /> OUT OF STOCK
                      </span>
                    )}
                  </div>
                </div>

                {/* Purchase Controls Row: Quantity + ADD TO CART */}
                <div className="qty-add-to-cart-row">
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="btn-step"
                      onClick={decrement}
                      disabled={quantity <= 1 || !inStock}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="qty-num">{quantity}</span>
                    <button
                      type="button"
                      className="btn-step"
                      onClick={increment}
                      disabled={!inStock || (product.stock ? quantity >= product.stock : false)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-add-to-cart-prominent"
                    onClick={() => addToCartHandler()}
                    disabled={!inStock}
                  >
                    ADD TO CART
                  </button>
                </div>

                {/* Full-width BUY IT NOW Button */}
                <button
                  type="button"
                  className="btn-buy-it-now-prominent"
                  onClick={buyNowHandler}
                  disabled={!inStock}
                >
                  BUY IT NOW
                </button>
              </div>
            </div>

            {/* 3. Interactive Multi-Tab Section (matching User Images 2, 3, 4) */}
            <div id="product-tabs-section" className="product-tabs-container">
              {/* Tab Navigation Headers */}
              <div className="tabs-header-strip">
                <button
                  type="button"
                  className={`tab-nav-btn ${activeTab === "overview" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <span>OVERVIEW</span>
                </button>

                <button
                  type="button"
                  className={`tab-nav-btn ${activeTab === "specs" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("specs")}
                >
                  <span>SPECS</span>
                </button>

                <button
                  type="button"
                  className={`tab-nav-btn ${activeTab === "reviews" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  <span>REVIEWS</span>
                  <span className="tab-pill-count">{totalReviews}</span>
                </button>

                <button
                  type="button"
                  className={`tab-nav-btn ${activeTab === "qa" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("qa")}
                >
                  <span>Q&amp;A</span>
                  <span className="tab-pill-count">{questionsList.length}</span>
                </button>
              </div>

              {/* Tab 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="tab-content-panel tab-overview-panel">
                  <div className="overview-text-block">
                    <h3>Product Overview</h3>
                    <p className="overview-description-text">
                      {product.description ||
                        "Experience next-generation computing performance with ultra-low latency, optimized thermal engineering, and maximum power efficiency designed for elite esports gaming, 4K rendering, and demanding computational workloads."}
                    </p>

                    <h4>Key Highlights &amp; Features</h4>
                    <ul className="overview-features-list">
                      <li>
                        <FaCheckCircle className="check-icon" />
                        <span>
                          High-speed architecture tailored for peak multitasking and extreme responsiveness.
                        </span>
                      </li>
                      <li>
                        <FaCheckCircle className="check-icon" />
                        <span>
                          Built with rigorous quality standards ensuring stable operation under heavy workloads.
                        </span>
                      </li>
                      <li>
                        <FaCheckCircle className="check-icon" />
                        <span>
                          Official distributor stock backed by full manufacturer brand warranty coverage.
                        </span>
                      </li>
                      <li>
                        <FaCheckCircle className="check-icon" />
                        <span>
                          Fully compatible with leading motherboards, power supplies, and modern components.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: SPECS (matching User Image 2 media_1790370297301.png) */}
              {activeTab === "specs" && (
                <div className="tab-content-panel tab-specs-panel">
                  <div className="specs-card-container">
                    <table className="specs-table-view">
                      <tbody>
                        {specs.map((item, idx) => (
                          <tr key={idx} className="spec-table-row">
                            <td className="spec-label-col">{item.label}</td>
                            <td className="spec-value-col">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: REVIEWS (matching User Image 3 media_1790370304934.png) */}
              {activeTab === "reviews" && (
                <div className="tab-content-panel tab-reviews-panel">
                  <div className="reviews-card-container">
                    {/* Notice Banner (matching Image 3) */}
                    <div className="verified-purchasers-notice-banner">
                      <em>Only verified purchasers can leave a review.</em>
                    </div>

                    {/* Write Review Action Button */}
                    <div className="reviews-action-toolbar">
                      <span className="reviews-header-count">
                        Customer Feedback ({totalReviews})
                      </span>
                      <button
                        type="button"
                        className="btn-write-review"
                        onClick={openReviewDialog}
                      >
                        <FaEdit />
                        <span>Write a Review</span>
                      </button>
                    </div>

                    {/* Reviews List */}
                    {reviewsResponse.isLoading ? (
                      <div style={{ padding: "1.5rem" }}>
                        <Skeleton length={3} width="100%" />
                      </div>
                    ) : reviewsResponse.data?.reviews && reviewsResponse.data.reviews.length > 0 ? (
                      <div className="customer-reviews-list">
                        {reviewsResponse.data.reviews.map((rev: Review) => (
                          <div key={rev._id} className="single-review-item">
                            <div className="review-header-info">
                              <div className="reviewer-avatar">
                                {rev.user?.photo ? (
                                  <img src={rev.user.photo} alt={rev.user.name} />
                                ) : (
                                  <span>{rev.user?.name?.charAt(0) || "U"}</span>
                                )}
                              </div>
                              <div className="reviewer-meta">
                                <span className="reviewer-name">{rev.user?.name || "Verified Buyer"}</span>
                                <div className="reviewer-stars">
                                  <RatingsComponent value={rev.rating} />
                                </div>
                              </div>

                              {user?._id === rev.user?._id && (
                                <button
                                  type="button"
                                  className="btn-delete-own-review"
                                  onClick={() => handleDeleteReview(rev._id)}
                                  title="Delete your review"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                            <p className="review-comment-body">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-reviews-fallback-text">
                        No reviews yet for this product.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Q&A (matching User Image 4 media_1790370383764.png) */}
              {activeTab === "qa" && (
                <div className="tab-content-panel tab-qa-panel">
                  <div className="qa-card-container">
                    <h3 className="qa-card-title">Have a question about this product?</h3>
                    <form onSubmit={handleQuestionSubmit} className="qa-form">
                      <textarea
                        className="qa-textarea-input"
                        placeholder="Ask your question here..."
                        rows={3}
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                      />
                      <button type="submit" className="btn-submit-question">
                        SUBMIT QUESTION
                      </button>
                    </form>

                    {/* Question list or empty notice */}
                    {questionsList.length > 0 ? (
                      <div className="qa-submitted-list">
                        {questionsList.map((q) => (
                          <div key={q.id} className="single-qa-item">
                            <div className="qa-question-row">
                              <span className="qa-q-badge">Q</span>
                              <div className="qa-q-text">
                                <p>{q.question}</p>
                                <small>Asked by {q.author} on {q.date}</small>
                              </div>
                            </div>
                            {q.answer ? (
                              <div className="qa-answer-row">
                                <span className="qa-a-badge">A</span>
                                <p>{q.answer}</p>
                              </div>
                            ) : (
                              <div className="qa-pending-row">
                                <em>Our hardware specialists are preparing an answer for this question.</em>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-questions-fallback-text">
                        No questions have been answered yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Review Modal Dialog */}
            <dialog ref={reviewDialogRef} className="review-modal-dialog">
              <div className="review-modal-box">
                <div className="modal-header">
                  <h3>Write a Review</h3>
                  <button
                    type="button"
                    className="btn-modal-close"
                    onClick={closeReviewDialog}
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleReviewSubmit} className="modal-body">
                  <div className="rating-select-group">
                    <label>Your Rating:</label>
                    <div className="star-rating-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="btn-star-select"
                          onClick={() => setReviewRating(star)}
                        >
                          {star <= reviewRating ? (
                            <FaStar className="star-filled" />
                          ) : (
                            <FaRegStar className="star-empty" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="comment-input-group">
                    <label>Review Description:</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this product, performance, thermals..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-modal-cancel"
                      onClick={closeReviewDialog}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-modal-submit"
                      disabled={reviewSubmitLoading}
                    >
                      {reviewSubmitLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              </div>
            </dialog>

            {/* 5. Related Products Showcase */}
            {relatedProducts.length > 0 && (
              <section className="product-related-section">
                <div className="related-section-header">
                  <div>
                    <h2>Related Hardware &amp; Upgrades</h2>
                    <p>Customers viewing this item also considered</p>
                  </div>
                  {product.category && (
                    <Link
                      to={`/category/${product.category.toLowerCase()}`}
                      className="link-view-all-related"
                    >
                      <span>View All in {product.category}</span>
                      <BsArrowRight />
                    </Link>
                  )}
                </div>

                <div className="products-4col-grid">
                  {relatedProducts.map((relProduct) => (
                    <CategoryProductCard key={relProduct._id} product={relProduct} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="product-not-found-panel">
            <FaBoxOpen className="empty-icon" />
            <h2>Product Not Found</h2>
            <p>The product you are looking for does not exist or has been retired.</p>
            <Link to="/category" className="btn-return-categories">
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader while fetching product details
const ProductPageSkeleton = () => (
  <div className="product-hero-showcase skeleton-mode">
    <div className="product-gallery-column">
      <Skeleton width="100%" height="440px" length={1} />
    </div>
    <div className="product-meta-column">
      <Skeleton width="30%" length={1} />
      <Skeleton width="85%" length={2} />
      <Skeleton width="45%" length={1} />
      <Skeleton width="60%" length={2} />
      <Skeleton width="100%" length={3} />
    </div>
  </div>
);

export default ProductDetails;
