import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaShieldHalved, FaCircleInfo, FaArrowRight, FaCheck } from "react-icons/fa6";
import { BsLightningChargeFill } from "react-icons/bs";

const LAPTOP_TYPES = [
  "Laptop",
  "Desktop/Computer",
  "All-in-One PC",
  "MacBook",
  "iMac",
  "Gaming PC",
  "Printer",
  "Other",
];

const RepairBookingForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedType, setSelectedType] = useState("Laptop");
  const [problemDesc, setProblemDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit WhatsApp/phone number");
      return;
    }

    setIsSubmitting(true);

    const message = `*New Repair Booking Request:*\n• *Name:* ${fullName}\n• *Phone:* ${phone}\n• *Device Type:* ${selectedType}\n• *Issue:* ${problemDesc || "Needs diagnosis"}\n• *Inspection Fee:* Agreed to ₹250 (credited upon repair)`;
    const whatsappUrl = `https://wa.me/918655208382?text=${encodeURIComponent(message)}`;

    toast.success("Booking request prepared! Redirecting to WhatsApp...");
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setFullName("");
      setPhone("");
      setProblemDesc("");
    }, 800);
  };

  return (
    <section className="repair-booking-section" id="book-repair">
      <div className="repair-booking-container">
        {/* Pill Badge */}
        <div className="booking-pill-badge">
          <span className="live-dot" />
          <span>SAME DAY REPAIR AVAILABLE</span>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="booking-main-title">Book Your Repair — Free Pickup &amp; Drop</h2>
        <p className="booking-sub-title">
          Tell us about your laptop or computer. We&apos;ll call within 1 hour to confirm pickup and give you a cost estimate.
        </p>

        {/* Interactive Booking Form Card */}
        <form className="booking-form-card" onSubmit={handleSubmit}>
          {/* Row 1: Name & Phone */}
          <div className="form-row-two-col">
            <div className="form-field-group">
              <label htmlFor="booking-name" className="form-label">
                Your Name <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  id="booking-name"
                  type="text"
                  className="form-text-input"
                  placeholder="e.g., Raj Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <span className="field-status-dot" />
              </div>
            </div>

            <div className="form-field-group">
              <label htmlFor="booking-phone" className="form-label">
                Phone / WhatsApp <span className="req-star">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                className="form-text-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2: Laptop Type Chips */}
          <div className="form-field-group chips-group">
            <label className="form-label">
              Laptop Type <span className="req-star">*</span>
            </label>
            <div className="laptop-type-chips">
              {LAPTOP_TYPES.map((type) => {
                const isSelected = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    className={`type-chip-btn ${isSelected ? "active" : ""}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Problem Description */}
          <div className="form-field-group">
            <div className="label-with-counter">
              <label htmlFor="booking-desc" className="form-label">
                What&apos;s wrong with your laptop or computer? <span className="req-star">*</span>
              </label>
            </div>
            <div className="textarea-wrapper">
              <textarea
                id="booking-desc"
                rows={4}
                maxLength={500}
                className="form-textarea"
                placeholder="e.g., Laptop screen is cracked, won't turn on, battery drains fast, blue screen error..."
                value={problemDesc}
                onChange={(e) => setProblemDesc(e.target.value)}
              />
              <span className="char-counter">{problemDesc.length}/500</span>
            </div>
          </div>

          {/* Row 4: Inspection Fee Notice Box */}
          <div className="inspection-fee-box">
            <div className="inspection-header">
              <FaCircleInfo className="info-icon" />
              <h4>Inspection Fee ₹250</h4>
            </div>
            <ul className="inspection-bullets">
              <li>
                If you proceed with the repair, ₹250 is <strong>refunded</strong> - applied as a credit toward your total repair cost.
              </li>
              <li>
                If your laptop is not repairable or you decide not to continue, the ₹250 inspection fee still applies.
              </li>
            </ul>
          </div>

          {/* Terms Disclaimer */}
          <p className="terms-disclaimer">
            By submitting, you agree to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
          </p>

          {/* Row 5: Form Footer */}
          <div className="form-footer-row">
            <div className="privacy-badge">
              <FaShieldHalved className="shield-icon" />
              <span>Your info is 100% private — never shared</span>
            </div>
            <button type="submit" className="submit-quote-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? "Processing..." : "Get Free Quote & Pickup"}</span>
              <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RepairBookingForm;
