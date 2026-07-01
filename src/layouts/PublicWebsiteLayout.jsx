import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/public/Navbar';
import PublicFooter from '../components/public/Footer';
import PageTransition from '../components/public/PageTransition';

function PublicWebsiteLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <PublicNavbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <PublicFooter />
    </div>
  );
}

export default PublicWebsiteLayout;