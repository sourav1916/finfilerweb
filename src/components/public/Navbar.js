import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { clientRoute } from '../../constants/routes';
import { hasStoredAuth } from '../../utils/public/format';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user?.token) || hasStoredAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const authActions = isAuthenticated ? (
    <Link to={clientRoute('/home')} className="btn btn-primary btn-sm">
      Dashboard
    </Link>
  ) : (
    <>
      <Link to={clientRoute('/login')} className="btn btn-outline btn-sm">
        Client Login
      </Link>
      <Link to={clientRoute('/register')} className="btn btn-primary btn-sm">
        Register
      </Link>
    </>
  );

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">FF</span>
          FinFiler
        </Link>

        <nav className="navbar-desktop">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="nav-link">
              {link.label}
            </NavLink>
          ))}
          <div className="navbar-actions">{authActions}</div>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`menu-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`menu-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`menu-bar ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className="mobile-nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                className="mobile-nav-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {isAuthenticated ? (
                  <Link
                    to={clientRoute('/home')}
                    className="btn btn-primary btn-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to={clientRoute('/login')}
                      className="btn btn-outline btn-block"
                      onClick={() => setMenuOpen(false)}
                    >
                      Client Login
                    </Link>
                    <Link
                      to={clientRoute('/register')}
                      className="btn btn-primary btn-block"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
