import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Reset state for new route
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    
    // Force browser reflow to apply the reset
    void el.offsetWidth;
    
    // Apply animation
    el.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, [location.pathname]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(12px)',
        willChange: 'opacity, transform'
      }}
      className="w-full"
    >
      {children}
    </div>
  );
}

export default PageTransition;
