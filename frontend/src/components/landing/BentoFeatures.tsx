import { motion } from "framer-motion";
import { FaMagnifyingGlass, FaLock, FaTruckFast } from "react-icons/fa6";

const BentoFeatures = () => {
  const features = [
    {
      icon: <FaMagnifyingGlass />,
      color: "#059669",
      title: "Smart Filter & Discovery",
      description:
        "Sort products dynamically by price, category, and availability. Find exactly what fits your lifestyle with sub-second response times.",
      tag: "Sub-second Querying",
    },
    {
      icon: <FaLock />,
      color: "#2563eb",
      title: "Encrypted Stripe Checkout",
      description:
        "Enterprise-grade security on every transaction. Enjoy quick 1-click card authorizations, coupon code discounts, and full buyer protection.",
      tag: "PCI-DSS Level 1",
    },
    {
      icon: <FaTruckFast />,
      color: "#d97706",
      title: "Real-Time Tracking & Dispatch",
      description:
        "Transparent logistics from warehouse dispatch to doorstep delivery. Receive instant status notifications at every milestone.",
      tag: "Live Tracking",
    },
  ];

  return (
    <section className="bento-features-section">
      <div className="bento-header">
        <h3>Crafted for the modern consumer</h3>
        <p>Everything you need for a frictionless, premium shopping experience.</p>
      </div>

      <div className="bento-grid">
        {features.map((f, i) => (
          <motion.div
            className="bento-card"
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div>
              <div className="bento-icon-box" style={{ color: f.color }}>
                {f.icon}
              </div>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
            </div>
            <span className="bento-tag">{f.tag}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoFeatures;
