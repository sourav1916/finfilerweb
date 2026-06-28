import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { clientRoute } from '../../constants/routes';
import { hasStoredAuth } from '../../utils/public/format';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
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
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const authActions = isAuthenticated ? (
    <Link to={clientRoute('/home')} className="ff-btn-primary">
      Dashboard
      <svg className="ff-btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  ) : (
    <div className="ff-auth-group">
      <Link to={clientRoute('/login')} className="ff-btn-ghost">
        Sign in
      </Link>
      <Link to={clientRoute('/register')} className="ff-btn-primary">
        Get started
        <svg className="ff-btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );

  return (
    <>
      <style>{`
        /* ── Tokens (refined indigo/violet) ──────────── */
        :root {
          --ff-bg: #ffffff;
          --ff-bg-scrolled: rgba(255,255,255,0.85);
          --ff-border: rgba(30,27,75,0.08);
          --ff-text: #1e1b3a;
          --ff-muted: #6b6b85;

          --ff-violet-50: #f5f3ff;
          --ff-violet-100: #ede9fe;
          --ff-indigo: #6d28d9;
          --ff-indigo-light: #8b5cf6;
          --ff-indigo-dark: #5b21b6;
          --ff-indigo-soft: rgba(109,40,217,0.07);
          --ff-indigo-soft-hover: rgba(109,40,217,0.13);

          --ff-radius: 12px;
          --ff-nav-height: 68px;
        }

        /* ── Header ─────────────────────────────────── */
        .ff-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: var(--ff-nav-height);
          background: var(--ff-bg);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ff-header.scrolled {
          background: var(--ff-bg-scrolled);
          border-color: var(--ff-border);
          box-shadow: 0 4px 32px rgba(76,29,149,0.08);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }

        /* ── Inner layout ───────────────────────────── */
        .ff-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        /* ── Logo ───────────────────────────────────── */
        .ff-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ff-logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          overflow: hidden;
          background: linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(109,40,217,0.35);
        }
        .ff-logo-mark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ff-logo-wordmark {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ff-text);
          line-height: 1;
        }
        .ff-logo-wordmark span {
          font-weight: 400;
          background: linear-gradient(135deg, #6d28d9, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ── Desktop nav ────────────────────────────── */
        .ff-nav-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .ff-nav-desktop { display: none; }
        }

        .ff-nav-link {
          position: relative;
          padding: 7px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ff-muted);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.18s ease, background 0.18s ease;
          letter-spacing: 0.01em;
        }
        .ff-nav-link:hover {
          color: var(--ff-text);
          background: rgba(30,27,75,0.045);
        }
        .ff-nav-link.active {
          color: var(--ff-indigo);
          background: var(--ff-violet-100);
          font-weight: 600;
        }

        /* ── Auth actions ───────────────────────────── */
        .ff-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .ff-actions { display: none; }
        }
        .ff-auth-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Buttons (refined) ──────────────────────── */
        .ff-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 600;
          color: var(--ff-text);
          text-decoration: none;
          border-radius: var(--ff-radius);
          border: 1px solid var(--ff-border);
          background: #fff;
          transition: color 0.18s, background 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .ff-btn-ghost:hover {
          background: var(--ff-violet-50);
          border-color: rgba(109,40,217,0.25);
          box-shadow: 0 2px 8px rgba(109,40,217,0.08);
        }

        .ff-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          border-radius: var(--ff-radius);
          background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);
          box-shadow: 0 2px 12px rgba(109,40,217,0.30), inset 0 1px 0 rgba(255,255,255,0.18);
          transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
          border: none;
          cursor: pointer;
        }
        .ff-btn-primary:hover {
          background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%);
          box-shadow: 0 6px 20px rgba(109,40,217,0.40), inset 0 1px 0 rgba(255,255,255,0.18);
          transform: translateY(-1.5px);
        }
        .ff-btn-primary:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(109,40,217,0.30);
        }
        .ff-btn-arrow {
          transition: transform 0.18s;
        }
        .ff-btn-primary:hover .ff-btn-arrow {
          transform: translateX(2px);
        }

        /* ── Hamburger ──────────────────────────────── */
        .ff-burger {
          display: none;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid var(--ff-border);
          background: #fff;
          cursor: pointer;
          padding: 0;
          flex-direction: column;
          gap: 5px;
          transition: background 0.18s, border-color 0.18s;
        }
        .ff-burger:hover {
          background: var(--ff-violet-50);
          border-color: rgba(109,40,217,0.25);
        }
        @media (max-width: 768px) {
          .ff-burger { display: flex; }
        }

        .ff-bar {
          display: block;
          width: 18px;
          height: 1.5px;
          background: var(--ff-text);
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.25s ease, opacity 0.2s ease, width 0.2s ease;
        }
        .ff-bar.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .ff-bar.open:nth-child(2) { opacity: 0; width: 0; }
        .ff-bar.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile drawer ──────────────────────────── */
        .ff-mobile-drawer {
          position: fixed;
          top: var(--ff-nav-height);
          left: 0; right: 0; bottom: 0;
          z-index: 99;
          background: #fff;
          overflow-y: auto;
          padding: 12px 20px 32px;
          border-top: 1px solid var(--ff-border);
        }

        .ff-mobile-nav-link {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          font-size: 15px;
          font-weight: 500;
          color: var(--ff-muted);
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.15s, background 0.15s;
          margin-bottom: 2px;
        }
        .ff-mobile-nav-link:hover {
          color: var(--ff-text);
          background: var(--ff-violet-50);
        }
        .ff-mobile-nav-link.active {
          color: var(--ff-indigo);
          background: var(--ff-violet-100);
          font-weight: 600;
        }

        .ff-mobile-divider {
          height: 1px;
          background: var(--ff-border);
          margin: 14px 0;
        }

        .ff-mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ff-btn-block {
          width: 100%;
          justify-content: center;
          padding: 12px 16px;
          font-size: 15px;
        }
        .ff-btn-ghost-block {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 600;
          color: var(--ff-text);
          text-decoration: none;
          border-radius: var(--ff-radius);
          border: 1px solid var(--ff-border);
          background: #fff;
          transition: color 0.18s, background 0.18s;
        }
        .ff-btn-ghost-block:hover {
          background: var(--ff-violet-50);
          border-color: rgba(109,40,217,0.25);
        }
      `}</style>

      <motion.header
        className={`ff-header${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ff-inner">
          {/* Logo */}
          <Link to="/" className="ff-logo" onClick={() => setMenuOpen(false)}>
            <div className="ff-logo-mark">
              <img src="/logo512.png" alt="FinFiler" />
            </div>
            <span className="ff-logo-wordmark">
              Fin<span>Filer</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="ff-nav-desktop" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `ff-nav-link${isActive ? ' active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="ff-actions">
            {authActions}
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="ff-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`ff-bar${menuOpen ? ' open' : ''}`} />
            <span className={`ff-bar${menuOpen ? ' open' : ''}`} />
            <span className={`ff-bar${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ff-mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `ff-mobile-nav-link${isActive ? ' active' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="ff-mobile-divider" />

              <motion.div
                className="ff-mobile-actions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isAuthenticated ? (
                  <Link
                    to={clientRoute('/home')}
                    className="ff-btn-primary ff-btn-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    Go to Dashboard
                    <svg className="ff-btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link
                      to={clientRoute('/login')}
                      className="ff-btn-ghost-block"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to={clientRoute('/register')}
                      className="ff-btn-primary ff-btn-block"
                      onClick={() => setMenuOpen(false)}
                    >
                      Get started
                      <svg className="ff-btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;