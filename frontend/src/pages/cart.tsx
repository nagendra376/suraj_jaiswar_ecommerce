import axios from "axios";
import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { BsChevronRight, BsTag, BsCartX } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "../utils/router";
import CartItemCard from "../components/cart-item";
import toast from "react-hot-toast";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
  saveCoupon,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";

const Cart: React.FC = () => {
  const { cartItems, subtotal, total, shippingCharges, discount, coupon } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState<string>(coupon || "");
  const [couponStatus, setCouponStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [isApplying, setIsApplying] = useState(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      dispatch(removeCartItem(cartItem.productId));
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
    toast.success("Item removed from cart");
  };

  const handleApplyCoupon = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCoupon = couponCode.trim();
    if (!cleanCoupon) return;

    setIsApplying(true);
    try {
      const res = await axios.get(
        `${server}/api/v1/payment/discount?coupon=${cleanCoupon}`
      );
      dispatch(discountApplied(res.data.discount));
      dispatch(saveCoupon(cleanCoupon));
      setCouponStatus("valid");
      dispatch(calculatePrice());
      toast.success(`Coupon applied! ₹${res.data.discount} discount`);
    } catch {
      dispatch(discountApplied(0));
      setCouponStatus("invalid");
      dispatch(calculatePrice());
      toast.error("Invalid coupon code");
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const packagingFee = shippingCharges > 0 ? shippingCharges : 180;
  const estimatedFinalTotal = subtotal + packagingFee - discount;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        {/* Page Header */}
        <div className="cart-page-header">
          <h1 className="cart-page-title">Shopping Cart</h1>
          <p className="cart-page-subtitle">REVIEW YOUR SELECTED GEAR</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-container">
            <div className="empty-cart-icon">
              <BsCartX />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>Looks like you haven&apos;t added any gear to your cart yet.</p>
            <Link to="/search" className="btn-explore-gear">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Left Column: Cart Items List */}
            <div className="cart-items-section">
              {/* Column Headers Bar */}
              <div className="cart-table-header-row">
                <span className="th-details">PRODUCT DETAILS</span>
                <span className="th-price">PRICE</span>
                <span className="th-qty">QTY</span>
                <span className="th-total">TOTAL</span>
                <span className="th-action" />
              </div>

              {/* Items Cards */}
              <div className="cart-items-cards-list">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.productId}
                    cartItem={item}
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    removeHandler={removeHandler}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="cart-summary-section">
              <div className="order-summary-card">
                <h2 className="summary-title">ORDER SUMMARY</h2>

                <div className="summary-breakdown-list">
                  {/* Subtotal */}
                  <div className="summary-row">
                    <span className="row-label">
                      Subtotal ({totalItemsCount} {totalItemsCount === 1 ? "item" : "items"})
                    </span>
                    <span className="row-value bold">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Packaging & Insurance */}
                  <div className="summary-row">
                    <span className="row-label">Packaging &amp; Insurance</span>
                    <span className="row-value bold">
                      ₹{packagingFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Convenience Fee */}
                  <div className="summary-row">
                    <span className="row-label">Convenience Fee</span>
                    <span className="convenience-badge">CALCULATED NEXT</span>
                  </div>

                  {discount > 0 && (
                    <div className="summary-row discount-row">
                      <span className="row-label">Discount</span>
                      <span className="row-value red">
                        - ₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="coupon-form-wrap">
                  <div className="coupon-input-box">
                    <BsTag className="coupon-tag-icon" />
                    <input
                      type="text"
                      placeholder="COUPON CODE"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponStatus !== "idle") setCouponStatus("idle");
                      }}
                      className="coupon-input"
                    />
                    <button
                      type="submit"
                      disabled={isApplying || !couponCode.trim()}
                      className="btn-coupon-apply"
                    >
                      {isApplying ? "..." : "APPLY"}
                    </button>
                  </div>

                  {couponStatus === "valid" && (
                    <span className="coupon-msg-success">
                      Coupon applied successfully!
                    </span>
                  )}
                  {couponStatus === "invalid" && (
                    <span className="coupon-msg-error">
                      Invalid coupon code <VscError />
                    </span>
                  )}
                </form>

                <div className="summary-separator" />

                {/* Estimated Total */}
                <div className="summary-estimated-total-row">
                  <div className="total-label-col">
                    <span className="estimated-title">ESTIMATED TOTAL</span>
                    <span className="taxes-note">Taxes included</span>
                  </div>
                  <span className="estimated-price-red">
                    ₹{estimatedFinalTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Proceed To Checkout Button */}
                <button
                  type="button"
                  onClick={() => navigate("/shipping")}
                  className="btn-proceed-checkout"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <BsChevronRight className="checkout-arrow" />
                </button>

                {/* Security Trust Badge */}
                <div className="secure-checkout-badge">
                  <FaLock className="lock-icon" />
                  <span>SECURE 256-BIT CHECKOUT</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
