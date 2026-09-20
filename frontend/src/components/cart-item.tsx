import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { Link } from "../utils/router";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemComponent: React.FC<CartItemProps> = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}) => {
  const { photo, productId, name, price, quantity, stock } = cartItem;
  const originalPrice = Math.round(price * 1.35);
  const itemTotal = price * quantity;
  const inStock = stock > 0;

  return (
    <div className="cart-page-item-card">
      {/* 1. Product Details Column */}
      <div className="item-details-col">
        <div className="item-thumb-wrap">
          <img
            src={transformImage(photo, 300)}
            alt={name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=60";
            }}
          />
        </div>
        <div className="item-title-wrap">
          <Link to={`/product/${productId}`} className="item-link" title={name}>
            {name}
          </Link>
          <div className="item-stock-status">
            <span className={`stock-dot ${inStock ? "in" : "out"}`} />
            <span className="stock-text">
              {inStock ? "IN STOCK" : "OUT OF STOCK"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Unit Price Column */}
      <div className="item-price-col">
        <span className="unit-price">₹{price.toLocaleString("en-IN")}</span>
        {originalPrice > price && (
          <span className="orig-price">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {/* 3. Quantity Stepper Column */}
      <div className="item-qty-col">
        <div className="page-qty-stepper">
          <button
            type="button"
            onClick={() => decrementHandler(cartItem)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="qty-count">{quantity}</span>
          <button
            type="button"
            onClick={() => incrementHandler(cartItem)}
            disabled={quantity >= stock}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* 4. Total Price Column */}
      <div className="item-total-col">
        <span className="item-total-price">
          ₹{itemTotal.toLocaleString("en-IN")}
        </span>
      </div>

      {/* 5. Delete Button */}
      <div className="item-action-col">
        <button
          type="button"
          className="item-delete-btn"
          onClick={() => removeHandler(productId)}
          title="Remove item"
          aria-label="Remove item"
        >
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
