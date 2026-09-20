import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  BsLaptop,
  BsPcDisplay,
  BsDisplay,
  BsPrinter,
  BsTools,
  BsShieldCheck,
} from "react-icons/bs";
import {
  FaGamepad,
  FaApple,
  FaCheck,
  FaArrowRight,
  FaWhatsapp,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

interface RepairServiceItem {
  id: string;
  title: string;
  price: string;
  desc: string;
  icon: React.ReactNode;
  theme: string;
  btnText: string;
  features: string[];
}

const repairServices: RepairServiceItem[] = [
  {
    id: "laptop-repair",
    title: "Laptop Repair",
    price: "Starting ₹499",
    desc: "Expert laptop repair for Dell, HP, Lenovo, Apple MacBook, Asus, Acer & all brands. Same day service.",
    icon: <BsLaptop />,
    theme: "theme-blue",
    btnText: "Book Laptop Repair →",
    features: [
      "Screen Replacement",
      "Battery Replacement",
      "Keyboard Repair",
      "Motherboard Repair",
      "Hinge Fix",
      "RAM / SSD Upgrade",
      "Virus Removal",
      "Overheating Fix",
    ],
  },
  {
    id: "gaming-pc-repair",
    title: "Gaming PC Repair",
    price: "Starting ₹799",
    desc: "Gaming desktops & gaming laptops — ASUS ROG, Alienware, MSI, Lenovo Legion, HP Omen. GPU, cooling & upgrades.",
    icon: <FaGamepad />,
    theme: "theme-green",
    btnText: "Book Gaming PC Repair →",
    features: [
      "GPU Upgrade",
      "Thermal Paste",
      "Overheating Fix",
      "RAM / SSD Upgrade",
      "Fan Replacement",
      "Power Supply Fix",
      "BIOS Update",
      "Performance Tune",
    ],
  },
  {
    id: "computer-repair",
    title: "Computer Repair",
    price: "Starting ₹399",
    desc: "Desktop PC repair, upgrades and maintenance. All brands — Dell, HP, Lenovo, custom builds.",
    icon: <BsPcDisplay />,
    theme: "theme-violet",
    btnText: "Book Computer Repair →",
    features: [
      "Not Turning On",
      "RAM Upgrade",
      "HDD / SSD Replace",
      "Virus Removal",
      "Power Supply Fix",
      "CPU Cooler Fix",
      "OS Reinstall",
      "Data Recovery",
    ],
  },
  {
    id: "all-in-one-repair",
    title: "All-in-One PC Repair",
    price: "Starting ₹599",
    desc: "HP, Dell, Lenovo, Apple iMac & all all-in-one desktops. Display, board, storage & upgrades.",
    icon: <BsDisplay />,
    theme: "theme-orange",
    btnText: "Book All-in-One Repair →",
    features: [
      "Display Replacement",
      "RAM Upgrade",
      "SSD / HDD Fix",
      "No Display Fix",
      "Board Repair",
      "Power Supply Fix",
      "OS Reinstall",
      "Overheating Fix",
    ],
  },
  {
    id: "macbook-imac-repair",
    title: "MacBook & iMac Repair",
    price: "Starting ₹799",
    desc: "Specialist Apple Mac repairs — MacBook Air/Pro, iMac, Mac Mini. OEM-quality Mac parts. MacBook not starting, black screen, liquid damage — diagnosed same day.",
    icon: <FaApple />,
    theme: "theme-dark",
    btnText: "Book Apple Repair →",
    features: [
      "MacBook Screen",
      "MacBook Keyboard",
      "MacBook Battery",
      "iMac Repair",
      "Logic Board Fix",
      "SSD Upgrade",
      "macOS Issues",
      "Data Recovery",
    ],
  },
  {
    id: "printer-repair",
    title: "Printer Repair",
    price: "Starting ₹299",
    desc: "HP, Canon, Epson, Brother — laser & inkjet printer repair, servicing, installation & cartridge replacement.",
    icon: <BsPrinter />,
    theme: "theme-emerald",
    btnText: "Book Printer Repair →",
    features: [
      "Printer Not Printing",
      "Paper Jam Fix",
      "Cartridge Replace",
      "Head Cleaning",
      "Wireless Setup",
      "Ink Smudging Fix",
      "Network Setup",
      "Toner Replace",
    ],
  },
  {
    id: "screen-repair",
    title: "Screen Repair",
    price: "Starting ₹2,499",
    desc: "Cracked, dim, or dead display? Laptop, MacBook, iMac & all-in-one screen replacement with genuine-grade panels.",
    icon: <BsLaptop />,
    theme: "theme-sky",
    btnText: "Book Screen Repair →",
    features: [
      "Cracked Screen",
      "Dead Pixels",
      "Backlight Fix",
      "No Display Fix",
      "Battery Replacement",
      "Body Repair",
      "Touch Screen Fix",
      "Hinge Repair",
    ],
  },
];

// 3 sets of services for seamless continuous infinite wrap
const duplicatedServices = [
  ...repairServices,
  ...repairServices,
  ...repairServices,
];

const ExpertRepairSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<RepairServiceItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    issue: "",
  });

  // Auto-scroll loop using requestAnimationFrame
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime: number | null = null;
    const scrollSpeed = 50; // pixels per second

    const animate = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused && !isDraggingRef.current && container) {
        container.scrollLeft += scrollSpeed * delta;

        const singleSetWidth = container.scrollWidth / 3;
        if (singleSetWidth > 0 && container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleScrollPrev = () => {
    const container = scrollRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft <= singleSetWidth * 0.2) {
      container.scrollLeft += singleSetWidth;
    }
    container.scrollBy({ left: -388, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    const container = scrollRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }
    container.scrollBy({ left: 388, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleOpenBooking = (service: RepairServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    toast.success(
      `Booking received for ${selectedService?.title}! Our technician will call you within 1 hour to confirm pickup.`
    );
    setSelectedService(null);
    setFormData({ name: "", phone: "", area: "", issue: "" });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Solution Systems! I would like to book a ${
      selectedService?.title || "Repair"
    } service for my device. Please share pickup & pricing details.`
  );

  return (
    <section className="expert-repair-section" id="expert-repair-services">
      <div className="expert-repair-container">
        {/* Section Header Matching Reference */}
        <div className="section-header">
          <span className="badge-pill">
            <BsTools /> REPAIR SERVICES
          </span>
          <h2 className="main-title">
            Expert Repair for{" "}
            <span className="highlight-blue">Every Laptop & Computer</span>
          </h2>
          <p className="sub-title">
            Certified technicians · Genuine parts · 90-day warranty · All major brands
          </p>
        </div>

        {/* Horizontal Auto-Scroll Carousel with Hover Pause */}
        <div
          className="repair-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseUpOrLeave();
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            className="carousel-nav-btn prev"
            onClick={handleScrollPrev}
            aria-label="Previous services"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="carousel-nav-btn next"
            onClick={handleScrollNext}
            aria-label="Next services"
          >
            <FaChevronRight />
          </button>

          {/* Scrolling Track */}
          <div
            className="repair-cards-scroll-track"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                className={`repair-card ${service.theme}`}
              >
                {/* Card Top */}
                <div className="card-top">
                  <div className="card-icon-box">{service.icon}</div>
                  <div className="card-titles">
                    <h3 className="card-heading">{service.title}</h3>
                    <span className="card-starting-price">{service.price}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="card-description">{service.desc}</p>

                {/* 8 Feature Checkmarks */}
                <div className="card-features-grid">
                  {service.features.map((feat, idx) => (
                    <span key={idx} className="feature-item">
                      <FaCheck className="check-symbol" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

                {/* Card Action Button */}
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => handleOpenBooking(service)}
                >
                  <span>{service.btnText}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Bottom Action */}
        <div className="view-all-services-wrap">
          <button
            type="button"
            className="btn-view-all-services"
            onClick={() => handleOpenBooking(repairServices[0])}
          >
            <span>View All Repair Services</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Quick Booking Modal */}
      {selectedService && (
        <div className="repair-modal-overlay" onClick={handleCloseModal}>
          <div
            className="repair-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <FaXmark />
            </button>

            <h3 className="modal-title">Book Repair Service</h3>
            <p className="modal-subtitle">
              Selected:{" "}
              <span className="badge-selected-service">
                {selectedService.title} ({selectedService.price})
              </span>
            </p>

            <form onSubmit={handleSubmitBooking} className="modal-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Mumbai Location / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Andheri West, Bandra, Powai, Borivali..."
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Problem Description</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe what issue you are facing..."
                  value={formData.issue}
                  onChange={(e) =>
                    setFormData({ ...formData, issue: e.target.value })
                  }
                />
              </div>

              {/* Inspection Note Guarantee */}
              <div className="inspection-guarantee-note">
                <BsShieldCheck />
                <div>
                  <strong>₹350 Inspection Fee</strong> (100% credited toward
                  repair cost). Free doorstep pickup and 90-day comprehensive warranty.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-action-buttons">
                <button type="submit" className="btn-submit-booking">
                  Confirm Booking
                </button>
                <a
                  href={`https://wa.me/918655208382?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-booking"
                >
                  <FaWhatsapp />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpertRepairSection;