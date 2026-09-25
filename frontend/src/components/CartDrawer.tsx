import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BsBag,
  BsX,
  BsTrash3,
  BsChevronRight,
  BsCartX,
} from "react-icons/bs";
import { RootState } from "../redux/store";
import {
  addToCart,
  removeCartItem,
  closeCart,
} from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

const CartDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isCartOpen, cartItems, subtotal, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  // Close drawer on route change or Escape key
  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(closeCart());
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeCart());
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, router.events]);

  // Lock body scroll and pause Lenis when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [isCartOpen]);

  // Don't render drawer overlay if user is already on the full /cart page
  if (router.pathname === "/cart") {
    return null;
  }

  const handleIncrement = (item: CartItem) => {
    if (item.quantity >= item.stock) return;
    dispatch(addToCart({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity <= 1) {
      dispatch(removeCartItem(item.productId));
      return;
    }
    dispatch(addToCart({ ...item, quantity: item.quantity - 1 }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    router.push("/shipping");
  };

  const handleViewFullCart = () => {
    dispatch(closeCart());
    router.push("/cart");
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`cart-drawer-wrapper ${isCartOpen ? "open" : ""}`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <div
        className="cart-drawer-backdrop"
        onClick={() => dispatch(closeCart())}
      />

      {/* Slide-over panel */}
      <aside
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        data-lenis-prevent
      >
        {/* 1. Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-header-left">
            <div className="cart-drawer-icon-badge">
              <BsBag className="bag-icon" />
            </div>
            <h2 className="cart-drawer-title">Your Cart</h2>
          </div>
          <button
            type="button"
            className="cart-drawer-close-btn"
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >
            <BsX />
          </button>
        </div>

        {/* 2. Cart Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer-empty">
              <div className="empty-icon-wrap">
                <BsCartX />
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven&apos;t added anything to your cart yet.</p>
              <button
                type="button"
                className="btn-drawer-explore"
                onClick={() => dispatch(closeCart())}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-drawer-items-list">
              {cartItems.map((item) => {
                const originalPrice = Math.round(item.price * 1.35);
                const isOutOfStock = item.stock <= 0;

                return (
                  <div key={item.productId} className="cart-drawer-item-card">
                    {/* Thumbnail */}
                    <div className="item-thumb-box">
                      <img
                        src={transformImage(item.photo, 200)}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=60";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="item-info-col">
                      <div className="item-info-top">
                        <h4 className="item-title" title={item.name}>
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          className="item-trash-btn"
                          onClick={() => handleRemove(item.productId)}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <BsTrash3 />
                        </button>
                      </div>

                      {/* Stock badge */}
                      <div className="item-stock-indicator">
                        <span
                          className={`stock-dot ${isOutOfStock ? "out" : "in"}`}
                        />
                        <span className="stock-text">
                          {isOutOfStock ? "OUT OF STOCK" : "IN STOCK"}
                        </span>
                      </div>

                      {/* Pricing & Stepper Row */}
                      <div className="item-bottom-row">
                        <div className="item-pricing">
                          <span className="item-current-price">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          {originalPrice > item.price && (
                            <span className="item-orig-price">
                              ₹{originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        <div className="item-qty-stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => handleDecrement(item)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="stepper-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => handleIncrement(item)}
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Footer Summary (Only shown when items exist) */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Subtotal Row */}
            <div className="drawer-summary-row">
              <span className="summary-label">
                SUBTOTAL ({totalItemsCount} {totalItemsCount === 1 ? "ITEM" : "ITEMS"})
              </span>
              <span className="summary-value bold-dark">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Packaging & Insurance Charge Row */}
            <div className="drawer-summary-row">
              <span className="summary-label">
                PACKAGING &amp; INSURANCE CHARGE
              </span>
              <span className="checkout-charge-badge">AT CHECKOUT</span>
            </div>

            {/* Dashed Separator */}
            <div className="drawer-dashed-divider" />

            {/* Estimated Total Row */}
            <div className="drawer-summary-row total-row">
              <span className="summary-label total-label">ESTIMATED TOTAL</span>
              <span className="summary-value total-value-red">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              className="btn-drawer-checkout"
              onClick={handleCheckout}
            >
              <span>CHECKOUT</span>
              <BsChevronRight className="checkout-chevron" />
            </button>

            {/* View Full Cart Button */}
            <button
              type="button"
              className="btn-drawer-view-cart"
              onClick={handleViewFullCart}
            >
              VIEW FULL CART
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
