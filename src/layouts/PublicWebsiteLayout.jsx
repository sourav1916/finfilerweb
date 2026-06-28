import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicNavbar from '../components/public/Navbar';
import PublicFooter from '../components/public/Footer';
import PageTransition from '../components/public/PageTransition';
import { isLegalPolicyPath } from '../constants/legalPolicies';
import '../styles/public-website.css';

function PublicWebsiteLayout() {
  const location = useLocation();
  const transitionKey = isLegalPolicyPath(location.pathname) ? 'legal-pages' : location.pathname;

  return (
    <div className="app flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 pt-20 md:pt-24 lg:pt-28">
        <AnimatePresence mode="wait">
          <PageTransition transitionKey={transitionKey}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <PublicFooter />
    </div>
  );
}

export default PublicWebsiteLayout;