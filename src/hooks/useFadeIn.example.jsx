import { useRef } from 'react';
import { useFadeIn } from './useAnimations';
import '../styles/animations.css';

/**
 * Example component demonstrating useFadeIn hook usage
 * This shows different ways to use the hook with various options
 */
function FadeInExample() {
  // Create refs for each element
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // Example 1: Basic usage with default options
  // Triggers once when 10% of element is visible
  useFadeIn(card1Ref);

  // Example 2: Trigger multiple times (animation repeats on scroll)
  useFadeIn(card2Ref, { triggerOnce: false });

  // Example 3: Higher threshold (50% visible before triggering)
  useFadeIn(card3Ref, { threshold: 0.5 });

  // Example 4: Custom root margin (triggers earlier)
  useFadeIn(card4Ref, { rootMargin: '100px' });

  return (
    <div style={{ padding: '20px' }}>
      <h1>useFadeIn Hook Examples</h1>
      
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>👇 Scroll down to see fade-in effects 👇</p>
      </div>

      {/* Example 1: Default behavior */}
      <div 
        ref={card1Ref}
        style={{
          padding: '40px',
          margin: '20px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '8px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Card 1: Default (trigger once, 10% threshold)
      </div>

      <div style={{ height: '50vh' }} />

      {/* Example 2: Trigger multiple times */}
      <div 
        ref={card2Ref}
        style={{
          padding: '40px',
          margin: '20px 0',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: '8px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Card 2: Repeatable (triggerOnce: false)
      </div>

      <div style={{ height: '50vh' }} />

      {/* Example 3: High threshold */}
      <div 
        ref={card3Ref}
        style={{
          padding: '40px',
          margin: '20px 0',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          borderRadius: '8px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Card 3: High Threshold (50% visible)
      </div>

      <div style={{ height: '50vh' }} />

      {/* Example 4: Custom root margin */}
      <div 
        ref={card4Ref}
        style={{
          padding: '40px',
          margin: '20px 0',
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          color: 'white',
          borderRadius: '8px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Card 4: Root Margin (triggers 100px early)
      </div>

      <div style={{ height: '100vh' }} />
    </div>
  );
}

export default FadeInExample;

/**
 * Usage in real components:
 * 
 * // In OrderPage.jsx - Fade in menu items
 * const menuItemRefs = useRef([]);
 * menuItems.forEach((_, index) => {
 *   useFadeIn(menuItemRefs.current[index]);
 * });
 * 
 * // In AdminDashboard.jsx - Fade in stat cards
 * const statCardRef = useRef(null);
 * useFadeIn(statCardRef, { threshold: 0.2 });
 * 
 * // In any list component - Fade in list items
 * const listItemRef = useRef(null);
 * useFadeIn(listItemRef, { 
 *   threshold: 0.1, 
 *   rootMargin: '50px',
 *   triggerOnce: true 
 * });
 */
