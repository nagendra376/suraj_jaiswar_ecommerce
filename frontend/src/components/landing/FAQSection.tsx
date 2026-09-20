import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck, FaQuestion } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Where does Solution Systems provide repair services?",
    answer:
      "Solution Systems serves all major areas across Mumbai and MMR — including Mumbai City, Borivali, Kandivali, Andheri, Bandra, Thane, Vasai, Virar, Nallasopara, Mira Road, Bhayandar, and 30+ surrounding locations. Free doorstep pickup & drop is available throughout the service area.",
  },
  {
    question: "How do I book a laptop or computer repair with Solution Systems?",
    answer:
      "You can easily book online using our booking form on this website, message us directly on WhatsApp at +91 86552 08382, or call us. We will confirm your pickup slot within 1 hour and dispatch a trained technician or pickup executive to your address.",
  },
  {
    question: "How much does a laptop or computer repair cost at Solution Systems?",
    answer:
      "We charge a transparent ₹250 inspection fee which is 100% refunded and credited toward your total repair cost if you proceed with the repair. Before starting any work, our certified technicians provide a clear, upfront estimate with no hidden charges.",
  },
  {
    question: "Does Solution Systems offer a warranty on repairs?",
    answer:
      "Yes, all hardware repairs and part replacements come with a comprehensive 90-Day Warranty. In addition, brand-new replacement parts (SSD, RAM, original screens, batteries) carry their full manufacturer warranty.",
  },
  {
    question: "How long does a typical repair take at Solution Systems?",
    answer:
      "Most standard repairs — including screen replacements, battery swaps, RAM/SSD upgrades, OS reinstallation, and keyboard fixes — are completed same-day within 2 to 4 hours. Complex chip-level motherboard or data recovery repairs typically take 24 to 48 hours.",
  },
  {
    question: "Is it safe to send my laptop or computer to Solution Systems for repair?",
    answer:
      "100% safe. Every device received is tagged with a unique digital tracking ID and physical acknowledgement receipt. Repairs are handled in our ISO 9001:2015 certified ESD-safe facility under strict non-disclosure, ensuring your personal files and sensitive data remain completely private.",
  },
  {
    question: "Does Solution Systems provide free pickup and drop for repairs?",
    answer:
      "Yes! We offer safe doorstep pickup and return delivery across all covered zones in Mumbai, Thane, and Palghar districts at zero additional transit cost.",
  },
  {
    question: "What laptop and computer repair services does Solution Systems offer?",
    answer:
      "We offer complete end-to-end IT services: screen replacement, motherboard chip-level repair, battery & charging port replacement, SSD & RAM upgrades, data recovery, liquid damage treatment, and thermal servicing for all brands including Dell, HP, Lenovo, Apple MacBook, Asus, Acer, and MSI.",
  },
];

const FAQSection: React.FC = () => {
  // First item open by default matching reference screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Top FAQ Pill */}
        <div className="faq-pill-badge">
          <span className="faq-bubble-icon">💬</span>
          <span>FAQ</span>
        </div>

        {/* Section Heading */}
        <h2 className="faq-main-title">Frequently Asked Questions</h2>
        <p className="faq-sub-title">
          Everything you need to know about laptop, computer &amp; MacBook repair at Solution Systems
        </p>

        {/* Small Decorative Accent */}
        <div className="faq-divider-accent">
          <span className="accent-dot" />
        </div>

        {/* Meta Bar */}
        <div className="faq-meta-bar">
          <span className="faq-count-text">8 questions answered</span>
          <div className="faq-verified-tag">
            <BsPatchCheckFill className="check-icon" />
            <span>Fast &amp; Verified Answers</span>
          </div>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`faq-accordion-card ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <div className="faq-q-icon-box">
                      <FaQuestion className="q-icon" />
                    </div>
                    <span className="faq-question-text">{item.question}</span>
                  </div>

                  <div className="faq-toggle-btn">
                    {isOpen ? (
                      <span className="toggle-symbol minus">&minus;</span>
                    ) : (
                      <FaChevronDown className="toggle-symbol chevron" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-content">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
