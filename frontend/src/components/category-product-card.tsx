import React from "react";
import { FaPlus, FaExpandAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "../utils/router";
import { CartItem, Product } from "../types/types";
import { transformImage } from "../utils/features";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

interface CategoryProductCardProps {
  product: Product;
}

const CategoryProductCard: React.FC<CategoryProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeholder =
    "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=60";
  const photoUrl = product.photos?.[0]?.url || placeholder;

  const originalPrice =
    product.originalPrice || Math.round(product.price * 1.45);
  const inStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  // Handler for adding to cart
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

  // Handler for clicking the card (navigates to product details)
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="custom-category-product-card" onClick={handleCardClick}>
      {/* 1. Green SALE Badge (matching user image 2) */}
      <span className="card-badge-sale">SALE</span>

      {/* 2. Image Container with 2 Circular Quick-Action Icons on Hover (matching user image 3) */}
      <div className="card-image-box">
        <img
          src={transformImage(photoUrl, 400)}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = placeholder;
          }}
        />

        {/* The 2 Circular Action Icons (+ and Expand) */}
        <div
          className="card-quick-actions-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Add to Cart Button (+) */}
          <button
            type="button"
            className="btn-circle-action btn-circle-add"
            onClick={handleAddToCart}
            title="Quick add to cart"
            aria-label="Add to cart"
            disabled={!inStock}
          >
            <FaPlus className="circle-action-icon" />
          </button>

          {/* Quick View / Expand Button (⤢) */}
          <Link
            to={`/product/${product._id}`}
            className="btn-circle-action btn-circle-expand"
            title="View product details"
            aria-label="View product details"
          >
            <FaExpandAlt className="circle-action-icon" />
          </Link>
        </div>
      </div>

      {/* 3. Product Title (2-line clamp) */}
      <h3 className="card-product-title" title={product.name}>
        {product.name}
      </h3>

      {/* 4. PRICE Label (matching user image 2) */}
      <span className="card-price-caption">PRICE</span>

      {/* 5. Pricing & Stock Row */}
      <div className="card-pricing-stock-row">
        <div className="price-tag-group">
          <span className="current-selling-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {originalPrice > product.price && (
            <span className="strikethrough-mrp">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="stock-status-pill">
          {inStock ? (
            isLowStock ? (
              <span className="status-low-stock">
                <span className="status-dot-amber" /> LOW STOCK
              </span>
            ) : (
              <span className="status-in-stock">
                <span className="status-dot-green" /> IN STOCK
              </span>
            )
          ) : (
            <span className="status-out-stock">
              <span className="status-dot-red" /> OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* 6. Primary Bottom [ 🛒 Add to Cart ] Button (matching user image 2 in store green) */}
      <button
        type="button"
        className="btn-primary-add-cart"
        onClick={handleAddToCart}
        disabled={!inStock}
      >
        <FaShoppingCart className="cart-btn-icon" />
        <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
      </button>
    </div>
  );
};

export default CategoryProductCard;
