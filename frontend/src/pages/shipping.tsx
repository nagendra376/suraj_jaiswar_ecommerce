import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPerson, BsHouseDoor, BsTrash3, BsArrowRight } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "../utils/router";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
  saveCoupon,
  saveShippingInfo,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Shipping: React.FC = () => {
  const { cartItems, subtotal, shippingCharges, discount, coupon } =
    useSelector((state: RootState) => state.cartReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Account Info States
  const [accountEmail, setAccountEmail] = useState(user?.email || "nagendraswsa@gmail.com");
  const [accountMobile, setAccountMobile] = useState("8591210154");

  // Billing Address States
  const [fullName, setFullName] = useState(user?.name || "");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactPhone, setContactPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pinCode, setPinCode] = useState("");

  // B2B GST
  const [needGst, setNeedGst] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState(coupon || "");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setContactPhone(val);
  };

  const handleApplyCoupon = async (e: FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    try {
      const res = await axios.get(
        `${server}/api/v1/payment/discount?coupon=${couponCode.trim()}`
      );
      dispatch(discountApplied(res.data.discount));
      dispatch(saveCoupon(couponCode.trim()));
      dispatch(calculatePrice());
      toast.success(`Coupon applied! Saved ₹${res.data.discount}`);
    } catch {
      dispatch(discountApplied(0));
      dispatch(calculatePrice());
      toast.error("Invalid coupon code");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

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
    toast.success("Item removed");
  };

  const handleSaveToAddressBook = () => {
    if (!streetAddress || !city || !pinCode) {
      toast.error("Please fill address details first");
      return;
    }
    toast.success("Address saved to address book!");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!contactPhone || contactPhone.length < 10) {
      toast.error("Please enter a valid 10-digit contact phone number");
      return;
    }
    if (!streetAddress.trim()) {
      toast.error("Please enter street address");
      return;
    }
    if (!city.trim()) {
      toast.error("Please enter city");
      return;
    }
    if (!state.trim()) {
      toast.error("Please select state");
      return;
    }
    if (!pinCode.trim()) {
      toast.error("Please enter PIN code");
      return;
    }

    const fullAddr = apartment ? `${streetAddress}, ${apartment}` : streetAddress;

    dispatch(
      saveShippingInfo({
        address: fullAddr,
        city,
        state,
        country: "India",
        pinCode,
      })
    );

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create?id=${user?._id || "guest"}`,
        {
          items: cartItems,
          shippingInfo: {
            address: fullAddr,
            city,
            state,
            country: "India",
            pinCode,
          },
          coupon,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      // Fallback navigation to payment
      navigate("/pay");
    } finally {
      setIsSubmitting(false);
    }
  };

  const packagingFee = shippingCharges > 0 ? shippingCharges : 180;
  const estimatedFinalTotal = subtotal + packagingFee - discount;

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-page-container">
        {/* Title */}
        <h1 className="checkout-main-title">Secure Checkout</h1>

        {/* 3-Step Breadcrumb */}
        <div className="checkout-stepper-bar">
          <div className="stepper-step active">
            <span className="step-circle">1</span>
            <span className="step-label">BILLING</span>
          </div>
          <div className="stepper-line" />
          <div className="stepper-step">
            <span className="step-circle">2</span>
            <span className="step-label">SHIPPING</span>
          </div>
          <div className="stepper-line" />
          <div className="stepper-step">
            <span className="step-circle">3</span>
            <span className="step-label">PAYMENT</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="checkout-layout-grid">
          {/* Left Column: Form Cards */}
          <div className="checkout-forms-column">
            <form onSubmit={handleSubmit} id="checkout-form">
              {/* Card 1: Account Info */}
              <div className="checkout-card">
                <div className="card-header">
                  <div className="card-icon-wrap">
                    <BsPerson />
                  </div>
                  <h2 className="card-title">Account Info</h2>
                </div>

                <div className="card-fields-grid two-cols">
                  <div className="form-field-group">
                    <label className="field-label">ACCOUNT EMAIL</label>
                    <div className="input-with-badge">
                      <input
                        type="email"
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="form-input"
                      />
                      <span className="input-end-badge">...|</span>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ACCOUNT MOBILE</label>
                    <input
                      type="tel"
                      value={accountMobile}
                      onChange={(e) => setAccountMobile(e.target.value)}
                      placeholder="10 digit number"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Billing Address */}
              <div className="checkout-card">
                <div className="card-header">
                  <div className="card-icon-wrap">
                    <BsHouseDoor />
                  </div>
                  <h2 className="card-title">Billing Address</h2>
                </div>

                <div className="card-fields-grid">
                  {/* Full Name */}
                  <div className="form-field-group full-width">
                    <label className="field-label">
                      FULL NAME <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                  </div>

                  {/* Contact Email & Phone */}
                  <div className="form-row two-cols">
                    <div className="form-field-group">
                      <label className="field-label">
                        CONTACT EMAIL <span className="req-star">*</span>
                      </label>
                      <div className="input-with-badge">
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Contact email for updates"
                          className="form-input"
                        />
                        <span className="input-end-badge">...|</span>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <div className="label-with-counter">
                        <label className="field-label">
                          CONTACT PHONE <span className="req-star">*</span>
                        </label>
                        <span className="field-counter">{contactPhone.length}/10</span>
                      </div>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={handlePhoneChange}
                        placeholder="10 digit number"
                        className="form-input"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="form-field-group full-width">
                    <label className="field-label">
                      STREET ADDRESS <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="House no., street name, area"
                      className="form-input"
                    />
                  </div>

                  {/* Apartment / Suite (Optional) */}
                  <div className="form-field-group full-width">
                    <label className="field-label">
                      APARTMENT, SUITE, ETC. (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      className="form-input"
                    />
                  </div>

                  {/* City & State */}
                  <div className="form-row two-cols">
                    <div className="form-field-group">
                      <label className="field-label">
                        CITY <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="field-label">
                        STATE <span className="req-star">*</span>
                      </label>
                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select State...</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* PIN Code */}
                  <div className="form-field-group full-width">
                    <label className="field-label">
                      PIN CODE <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="6 digit PIN code"
                      className="form-input"
                      maxLength={6}
                    />
                  </div>

                  {/* Save to Address Book Button */}
                  <div className="address-book-action-row">
                    <button
                      type="button"
                      className="btn-save-address-book"
                      onClick={handleSaveToAddressBook}
                    >
                      SAVE TO ADDRESS BOOK
                    </button>
                  </div>
                </div>
              </div>

              {/* B2B GST Invoice Toggle */}
              <div className="b2b-gst-toggle-row">
                <label className="switch-toggle-label">
                  <input
                    type="checkbox"
                    checked={needGst}
                    onChange={(e) => setNeedGst(e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
                <span className="toggle-text">I need a B2B GST Invoice</span>
              </div>

              {/* Optional expanded GST inputs */}
              {needGst && (
                <div className="gst-expanded-card">
                  <div className="form-row two-cols">
                    <div className="form-field-group">
                      <label className="field-label">COMPANY NAME</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Registered business name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="field-label">GSTIN (15 DIGITS)</label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        className="form-input"
                        maxLength={15}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Continue to Shipping Button */}
              <div className="checkout-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-continue-shipping"
                >
                  <span>{isSubmitting ? "Processing..." : "Continue to Shipping"}</span>
                  <BsArrowRight className="btn-arrow" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="checkout-summary-column">
            <div className="order-summary-card">
              <h2 className="summary-title">ORDER SUMMARY</h2>

              {/* Item Cards inside Order Summary */}
              <div className="summary-items-list">
                {cartItems.map((item) => {
                  const originalPrice = Math.round(item.price * 1.35);
                  const itemTotal = item.price * item.quantity;

                  return (
                    <div key={item.productId} className="summary-item-card">
                      <div className="summary-item-top">
                        <div className="summary-item-thumb">
                          <img
                            src={transformImage(item.photo, 200)}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=60";
                            }}
                          />
                        </div>

                        <div className="summary-item-info">
                          <div className="summary-item-name-row">
                            <h4 className="summary-item-name" title={item.name}>
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              className="summary-item-trash"
                              onClick={() => handleRemove(item.productId)}
                              aria-label="Remove item"
                            >
                              <BsTrash3 />
                            </button>
                          </div>
                          <span className="summary-item-unit-rate">
                            ₹{originalPrice.toLocaleString("en-IN")} | Each
                          </span>

                          <div className="summary-item-bottom">
                            <div className="summary-mini-stepper">
                              <button
                                type="button"
                                onClick={() => handleDecrement(item)}
                              >
                                -
                              </button>
                              <span className="mini-qty">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleIncrement(item)}
                                disabled={item.quantity >= item.stock}
                              >
                                +
                              </button>
                            </div>
                            <span className="summary-item-total-price">
                              ₹{itemTotal.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
                <input
                  type="text"
                  placeholder="ENTER COUPON CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="summary-coupon-input"
                />
                <button
                  type="submit"
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="btn-summary-coupon-apply"
                >
                  {isApplyingCoupon ? "..." : "APPLY"}
                </button>
              </form>

              {/* Summary Breakdown Rows */}
              <div className="summary-breakdown-list">
                <div className="summary-row">
                  <span className="row-label">Subtotal</span>
                  <span className="row-value bold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="summary-row">
                  <span className="row-label">Packaging &amp; Insurance Charge</span>
                  <span className="row-value bold">
                    ₹{packagingFee.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="summary-row">
                  <span className="row-label">Convenience Fee</span>
                  <span className="convenience-badge">PENDING SELECTION</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row">
                    <span className="row-label">Discount</span>
                    <span className="row-value red">
                      - ₹{discount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Final Total Row */}
              <div className="summary-final-total-row">
                <span className="total-label">TOTAL</span>
                <span className="total-amount-red">
                  ₹{estimatedFinalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
