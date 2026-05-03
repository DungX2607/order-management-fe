import { useReducedMotion } from '../hooks/useAnimations';
import '../styles/animations.css';

/**
 * PageTransition Component
 * 
 * Wraps page content with smooth transition animations when navigating between routes.
 * Applies fade-in and slide-in-right animations with respect to user's motion preferences.
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to wrap with transition
 * @returns {JSX.Element} Wrapped page content with transition animations
 * 
 * @example
 * <PageTransition>
 *   <OrderPage />
 * </PageTransition>
 */
function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      className={`page-transition ${prefersReducedMotion ? '' : 'fade-in slide-in-right'}`}
      style={{
        // Ensure animations don't interfere with page loading or rendering
        willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

export default PageTransition;
