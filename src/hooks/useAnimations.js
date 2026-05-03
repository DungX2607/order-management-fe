import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Respects the prefers-reduced-motion media query
 * 
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) {
 *   // Use reduced or no animations
 * }
 */
export function useReducedMotion() {
  // Initialize state with current media query match
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check if window.matchMedia is available (SSR safety)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    // Check if window.matchMedia is available
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Handler to update state when preference changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener for changes
    // Use addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to generate staggered animation delays for multiple elements
 * Creates an array of incrementing delay values for sequential animations
 * 
 * @param {number} count - Number of elements to generate delays for
 * @param {number} baseDelay - Base delay in milliseconds between each element
 * @returns {number[]} Array of delay values in milliseconds
 * 
 * @example
 * const delays = useStaggeredAnimation(3, 100);
 * // Returns: [0, 100, 200]
 * 
 * // Usage with multiple cards:
 * {items.map((item, index) => (
 *   <Card 
 *     key={item.id} 
 *     style={{ animationDelay: `${delays[index]}ms` }}
 *   >
 *     {item.content}
 *   </Card>
 * ))}
 */
export function useStaggeredAnimation(count, baseDelay) {
  // Generate array of delay values
  // First element has 0 delay, each subsequent element adds baseDelay
  const delays = Array.from({ length: count }, (_, index) => index * baseDelay);
  
  return delays;
}

/**
 * Hook to trigger fade-in animation when element enters viewport
 * Uses Intersection Observer API to detect when element is visible
 * 
 * @param {React.RefObject<HTMLElement>} ref - React ref to the element to observe
 * @param {Object} options - Configuration options
 * @param {number} [options.threshold=0.1] - Percentage of element visibility to trigger (0-1)
 * @param {string} [options.rootMargin='0px'] - Margin around the root element
 * @param {boolean} [options.triggerOnce=true] - Whether to trigger animation only once
 * 
 * @example
 * const ref = useRef(null);
 * useFadeIn(ref, { threshold: 0.2, triggerOnce: true });
 * return <div ref={ref} className="fade-in-element">Content</div>;
 */
export function useFadeIn(ref, options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    // Get the current element
    const element = ref.current;
    
    // Early return if element doesn't exist or IntersectionObserver is not supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Graceful degradation: add class immediately if no IntersectionObserver
      if (element) {
        element.classList.add('fade-in');
      }
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in viewport, add animation class
            entry.target.classList.add('fade-in');
            
            // If triggerOnce is true, stop observing after first trigger
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // If triggerOnce is false, remove class when element leaves viewport
            entry.target.classList.remove('fade-in');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function to disconnect observer on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce]);
}

/**
 * Hook to animate a number from 0 to target value
 * Uses requestAnimationFrame for smooth 60fps animation
 * 
 * @param {number} end - Target value to count up to
 * @param {number} [duration=500] - Animation duration in milliseconds
 * @returns {number} Current animated value
 * 
 * @example
 * const animatedValue = useCountUp(100, 500);
 * return <div>{Math.round(animatedValue)}</div>;
 * 
 * // Usage in stat card:
 * const totalOrders = 42;
 * const animatedTotal = useCountUp(totalOrders, 500);
 * return <div className="stat-number">{Math.round(animatedTotal)}</div>;
 */
export function useCountUp(end, duration = 500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reset to 0 when end value changes
    setCount(0);

    // If end is 0, no animation needed
    if (end === 0) {
      return;
    }

    // Animation start time
    let startTime = null;
    let animationFrameId = null;

    // Animation function using requestAnimationFrame
    const animate = (currentTime) => {
      // Set start time on first frame
      if (startTime === null) {
        startTime = currentTime;
      }

      // Calculate elapsed time
      const elapsed = currentTime - startTime;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out cubic for natural deceleration
      // Formula: 1 - (1 - x)^3
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Calculate current value
      const currentValue = end * easedProgress;
      setCount(currentValue);

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to cancel animation on unmount or end value change
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return count;
}
