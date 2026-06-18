import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../utils/public/animations';

const quickLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/refund-and-cancellation-policy', label: 'Refund Policy' },
  { to: '/data-deletion-policy', label: 'Data Deletion Policy' },
  { to: '/disclaimer', label: 'Disclaimer' },
  { to: '/grievance-redressal-policy', label: 'Grievance Policy' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-inner"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="footer-brand" variants={staggerItem}>
            <p className="footer-logo">
              <span className="logo-icon logo-icon--sm">FF</span>
              FinFiler
            </p>
            <p className="footer-text">
              Simple, reliable financial filing services for businesses and individuals across India.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <p className="footer-heading">Quick Links</p>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <p className="footer-heading">Contact</p>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <a href="mailto:support@finfiler.com">support@finfiler.com</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <a href="tel:+917002695990">+91 7002695990</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <span>
                Wahab Nagar, Sunarupatty,
                <br />
                Kharupetia, Darrang, Assam – 784115
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="footer-copy"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          © {new Date().getFullYear()} FinFiler Private Limited. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
