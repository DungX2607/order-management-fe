# Task 3.2: useFadeIn Hook Implementation

## Summary

Implemented the `useFadeIn` hook in `src/hooks/useAnimations.js` that uses the Intersection Observer API to trigger fade-in animations when elements scroll into the viewport.

## Implementation Details

### Hook Signature

```javascript
useFadeIn(ref, options)
```

### Parameters

- **ref** (React.RefObject<HTMLElement>): React ref to the element to observe
- **options** (Object): Configuration options
  - **threshold** (number, default: 0.1): Percentage of element visibility to trigger (0-1)
  - **rootMargin** (string, default: '0px'): Margin around the root element
  - **triggerOnce** (boolean, default: true): Whether to trigger animation only once

### Features

1. **Intersection Observer Integration**: Uses native browser API for efficient viewport detection
2. **Configurable Options**: Supports threshold, rootMargin, and triggerOnce options
3. **CSS Class Toggle**: Adds/removes 'fade-in' class when element intersects viewport
4. **Cleanup on Unmount**: Properly disconnects observer when component unmounts
5. **Graceful Degradation**: Falls back to immediate class addition if IntersectionObserver is not supported
6. **Trigger Once Mode**: Default behavior triggers animation only once (performance optimization)
7. **Repeatable Mode**: Can trigger animation every time element enters/exits viewport

### Usage Example

```javascript
import { useRef } from 'react';
import { useFadeIn } from '../hooks/useAnimations';

function MyComponent() {
  const cardRef = useRef(null);
  
  // Basic usage with defaults
  useFadeIn(cardRef);
  
  return (
    <div ref={cardRef} className="card">
      This will fade in when scrolled into view
    </div>
  );
}
```

### Advanced Usage

```javascript
// Trigger only when 50% visible
useFadeIn(cardRef, { threshold: 0.5 });

// Trigger earlier with root margin
useFadeIn(cardRef, { rootMargin: '100px' });

// Trigger every time element enters/exits viewport
useFadeIn(cardRef, { triggerOnce: false });

// Combine options
useFadeIn(cardRef, {
  threshold: 0.3,
  rootMargin: '50px',
  triggerOnce: true
});
```

## Technical Implementation

### Intersection Observer Setup

The hook creates an IntersectionObserver with the provided options:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else if (!triggerOnce) {
        entry.target.classList.remove('fade-in');
      }
    });
  },
  { threshold, rootMargin }
);
```

### Cleanup

The hook properly cleans up the observer on unmount:

```javascript
return () => {
  if (observer) {
    observer.disconnect();
  }
};
```

### Browser Compatibility

- **Modern Browsers**: Full support for IntersectionObserver
- **Fallback**: Immediately adds 'fade-in' class if IntersectionObserver is not available
- **No Polyfill Required**: Graceful degradation ensures functionality without polyfills

## CSS Integration

The hook works with the existing `.fade-in` class defined in `src/styles/animations.css`:

```css
.fade-in {
  animation: fadeIn var(--anim-duration-medium) var(--anim-ease-out);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## Testing

### Manual Testing

A test HTML file has been created at `src/hooks/useFadeIn.test.html` that demonstrates:

1. **Box 1**: Trigger once (default behavior)
2. **Box 2**: Trigger multiple times (triggerOnce: false)
3. **Box 3**: High threshold (50% visible)
4. **Box 4**: Custom root margin (-100px)

To test:
1. Open `src/hooks/useFadeIn.test.html` in a browser
2. Scroll down to see boxes fade in
3. Test reduced motion simulation
4. Verify IntersectionObserver support status

### Integration Testing

The hook can be tested in React components by:
1. Creating a component with multiple cards
2. Applying the hook to each card ref
3. Scrolling to verify fade-in behavior
4. Testing with different option combinations

## Requirements Validation

✅ **Requirement 6.5**: "WHEN người dùng scroll trang, THE Component_Animation SHALL fade in các Card_Component khi chúng vào viewport"

The hook successfully implements this requirement by:
- Using Intersection Observer to detect viewport entry
- Adding the 'fade-in' CSS class when elements intersect
- Supporting configurable threshold and root margin
- Providing cleanup on unmount
- Gracefully degrading when IntersectionObserver is not available

## Performance Considerations

1. **Efficient Observation**: Uses native IntersectionObserver API (GPU-accelerated)
2. **Trigger Once Optimization**: Default behavior stops observing after first trigger
3. **Proper Cleanup**: Disconnects observer on unmount to prevent memory leaks
4. **No Re-renders**: Hook doesn't cause component re-renders, only adds/removes CSS classes
5. **Minimal Dependencies**: useEffect dependencies are properly specified

## Next Steps

This hook can now be used in:
- Task 12.5: Add scroll-triggered animations to cards and lists
- OrderPage: Fade in menu item cards
- AdminDashboard: Fade in stat cards and tables
- Any component that needs scroll-triggered animations

## Files Modified

- ✅ `src/hooks/useAnimations.js` - Added useFadeIn hook implementation
- ✅ `src/hooks/useFadeIn.test.html` - Created manual test file
- ✅ `src/hooks/TASK_3.2_SUMMARY.md` - Created documentation

## Completion Status

Task 3.2 is **COMPLETE** ✅

All acceptance criteria met:
- ✅ Accept ref, threshold, rootMargin, triggerOnce options
- ✅ Add/remove CSS class when element intersects viewport
- ✅ Cleanup observer on unmount
- ✅ Validates Requirement 6.5
