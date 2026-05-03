# Web Animations Documentation

## Overview

This document provides comprehensive documentation for the web animations system implemented in the Water Order Management application. All animations are designed to be performant, accessible, and maintainable.

## Animation System Architecture

### CSS-First Approach
The animation system follows a CSS-first methodology with React hooks for dynamic behavior:
- **CSS Animations**: Defined in `src/styles/animations.css` and `src/styles/skeleton.css`
- **React Hooks**: Located in `src/hooks/useAnimations.js` for dynamic animations
- **Components**: Reusable animation components in `src/components/`

### Core Principles
1. **Performance**: All animations use GPU-accelerated properties (transform, opacity)
2. **Accessibility**: Full support for `prefers-reduced-motion`
3. **Maintainability**: Centralized CSS variables and reusable classes
4. **Progressive Enhancement**: Animations enhance UX without blocking functionality

## Animation Categories

### 1. Page Transitions
**Component**: `PageTransition.jsx`
**Location**: Wraps all route content in `App.jsx`
**Animations**: Fade-in + Slide-in-right
**Duration**: 300ms
**Usage**:
```jsx
<PageTransition>
  <YourPageComponent />
</PageTransition>
```

### 2. Card Animations
**Classes**: `.card`, `.stagger-1`, `.stagger-2`, `.stagger-3`
**Animations**: Scale-in + Fade-in
**Duration**: 400ms
**Stagger Delays**: 100ms, 200ms, 300ms
**Usage**:
```jsx
<div className="card stagger-1">
  {/* Card content */}
</div>
```

### 3. Modal/Dialog Animations
**Classes**: `.modal-backdrop`, `.modal-content`
**Animations**: 
- Backdrop: Fade-in (200ms)
- Content: Scale + Fade (300ms)
**Usage**:
```jsx
<div className="modal-backdrop">
  <div className="modal-content">
    {/* Modal content */}
  </div>
</div>
```

### 4. Toast Notifications
**Component**: `Toast.jsx`, `ToastContainer.jsx`
**Hook**: `useToast()`
**Position**: Bottom center
**Animations**: Slide-up + Fade (300ms)
**Auto-dismiss**: 3000ms
**Usage**:
```jsx
const { showToast } = useToast();
showToast('Operation successful!', 'success');
showToast('An error occurred', 'error');
```

### 5. Loading States
**Components**: 
- `SkeletonLoader.jsx` - Shimmer loading placeholders
- `LoadingTransition.jsx` - Skeleton to content transitions
**Animations**: Shimmer (1.5s continuous), Fade transitions (300ms)
**Usage**:
```jsx
// Skeleton loader
<SkeletonLoader variant="card" />
<SkeletonCard showHeader lines={3} />
<SkeletonTable rows={5} columns={4} />

// Loading transition
<LoadingTransition isLoading={loading} skeletonType="card">
  <YourContent />
</LoadingTransition>
```

### 6. Interactive Feedback
**Classes**: `.btn`, `.hover-lift`, `.btn-press`, `.menu-item-card`
**Animations**: Scale, brightness, background transitions
**Duration**: 100-200ms
**Usage**: Applied automatically to buttons and interactive elements

### 7. Data Update Animations
**Animations**:
- **Row Pulse**: Green background pulse on data update (600ms)
- **Count-Up**: Numbers animate from 0 to target value (500ms)
- **Badge Transition**: Fade out/in on status change (400ms)
- **Filter Transition**: Rows fade out/in when filtering (300ms)

**Usage**:
```jsx
// Row pulse - add class programmatically
row.classList.add('row-updated');
setTimeout(() => row.classList.remove('row-updated'), 600);

// Count-up - use hook
const animatedValue = useCountUp(targetValue, 500);
<div>{Math.round(animatedValue)}</div>

// Badge transition - add class on change
badge.classList.add('badge-changing');
setTimeout(() => badge.classList.remove('badge-changing'), 400);
```

### 8. Micro-interactions
**Animations**:
- **Checkbox**: Scale pop on check/uncheck (200ms)
- **Dropdown**: Slide down + fade on focus (200ms)
- **Icon Bounce**: Subtle bounce on hover (500ms)
- **Cycle Badge Pulse**: Continuous pulse for active status (2s loop)
- **Scroll-triggered**: Fade-in when entering viewport

**Usage**:
```jsx
// Icon bounce - add class to emoji/icon
<span className="emoji-bounce">🥤</span>

// Scroll-triggered - use hook
const cardRef = useRef(null);
useFadeIn(cardRef, { threshold: 0.1, triggerOnce: true });
<div ref={cardRef} className="card scroll-fade-in">...</div>
```

## Animation Hooks

### useReducedMotion()
Detects if user prefers reduced motion.
```jsx
const prefersReducedMotion = useReducedMotion();
// Returns: boolean
```

### useFadeIn(ref, options)
Triggers fade-in animation when element enters viewport.
```jsx
const elementRef = useRef(null);
useFadeIn(elementRef, {
  threshold: 0.1,        // 10% visibility triggers animation
  rootMargin: '0px',     // Margin around viewport
  triggerOnce: true      // Only animate once
});
```

### useStaggeredAnimation(count, baseDelay)
Generates stagger delay values for multiple elements.
```jsx
const delays = useStaggeredAnimation(5, 100);
// Returns: [0, 100, 200, 300, 400]
```

### useCountUp(end, duration)
Animates number from 0 to target value.
```jsx
const animatedValue = useCountUp(42, 500);
// Returns: current animated value (0 → 42 over 500ms)
```

### useToast()
Manages toast notifications.
```jsx
const { showToast } = useToast();
showToast(message, type); // type: 'success' | 'error'
```

## CSS Variables

All animation timings and easing functions are centralized in CSS variables:

```css
:root {
  /* Durations */
  --anim-duration-fast: 100ms;
  --anim-duration-normal: 200ms;
  --anim-duration-medium: 300ms;
  --anim-duration-slow: 400ms;
  --anim-duration-slower: 600ms;
  
  /* Easing Functions */
  --anim-ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --anim-ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  --anim-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Distances */
  --anim-slide-distance: 20px;
  --anim-scale-small: 0.95;
  --anim-scale-large: 1.05;
}
```

## Utility Classes

### Animation Classes
- `.fade-in` - Fade in animation
- `.slide-in-right` - Slide in from right
- `.scale-in` - Scale in animation
- `.pulse` - Continuous pulse effect
- `.shimmer` - Shimmer loading effect

### Interaction Classes
- `.hover-lift` - Lift on hover
- `.btn-press` - Press effect on click
- `.emoji-bounce` - Bounce on hover for emojis/icons

### Stagger Classes
- `.stagger-1` - 100ms delay
- `.stagger-2` - 200ms delay
- `.stagger-3` - 300ms delay

## Accessibility

### Reduced Motion Support
All animations respect `prefers-reduced-motion`:
- Animation durations reduced to 50ms
- Non-essential animations disabled
- `will-change` properties removed to save resources

### Implementation
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --anim-duration-fast: 50ms;
    --anim-duration-normal: 50ms;
    --anim-duration-medium: 50ms;
    --anim-duration-slow: 50ms;
    --anim-duration-slower: 50ms;
  }
  
  * {
    will-change: auto !important;
  }
}
```

### Testing Reduced Motion
**Windows**: Settings → Accessibility → Visual effects → Animation effects (Off)
**macOS**: System Preferences → Accessibility → Display → Reduce motion
**Linux**: Settings → Accessibility → Reduce animation

## Performance

### GPU Acceleration
All animations use GPU-accelerated properties:
- ✅ `opacity`
- ✅ `transform` (translate, scale, rotate)
- ✅ `background-position`
- ✅ `box-shadow`

### will-change Property
Strategic use of `will-change` for frequently animated elements:
- Cards, modals, toasts
- Loading states (skeleton, spinners)
- Scroll-triggered animations
- Page transitions

### Performance Targets
- **FPS**: 60fps on desktop browsers
- **Frame Time**: <16.67ms per frame
- **GPU Memory**: <50MB for animations

## Browser Compatibility

### Supported Browsers
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Chrome Mobile (Android)
- ✅ Safari iOS

### Fallbacks
- Vite autoprefixer handles vendor prefixes automatically
- Graceful degradation for unsupported features
- Essential functionality works without animations

## Testing

### Manual Testing
1. **Visual Testing**: Open `test-animation-performance.html`
2. **Performance Testing**: Use Chrome DevTools Performance tab
3. **Accessibility Testing**: Enable reduced motion and verify
4. **Browser Testing**: Test on Chrome, Firefox, Safari, Edge

### Test Files
- `test-animations.html` - Basic animation tests
- `test-animation-performance.html` - Performance test suite
- `test-card-animations.html` - Card animation tests
- `test-interactive-feedback.html` - Interactive feedback tests
- `test-modal-animations.html` - Modal animation tests
- `test-data-update-animations.html` - Data update animation tests
- `test-micro-interactions.html` - Micro-interaction tests

## Common Patterns

### Pattern 1: Animated Card Grid
```jsx
function CardGrid({ items }) {
  return (
    <div className="card-grid">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className={`card ${index < 3 ? `stagger-${index + 1}` : ''}`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 2: Loading State with Skeleton
```jsx
function DataDisplay({ data, loading }) {
  if (loading) {
    return <SkeletonCard showHeader lines={3} />;
  }
  
  return <div className="card fade-in">{data}</div>;
}
```

### Pattern 3: Scroll-Triggered Cards
```jsx
function ScrollableList({ items }) {
  const cardRefs = useRef([]);
  
  items.forEach((_, index) => {
    useFadeIn(cardRefs.current[index], { 
      threshold: 0.1, 
      triggerOnce: true 
    });
  });
  
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={el => cardRefs.current[index] = el}
          className="card scroll-fade-in"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 4: Toast Notifications
```jsx
function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('Operation completed successfully!', 'success');
  };
  
  const handleError = () => {
    showToast('An error occurred', 'error');
  };
  
  return (
    <>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </>
  );
}
```

## Troubleshooting

### Animation Not Playing
1. Check if element has correct class name
2. Verify CSS is imported
3. Check browser console for errors
4. Ensure element is visible (not `display: none`)

### Animation Stuttering
1. Check if using GPU-accelerated properties only
2. Verify `will-change` is set for frequently animated elements
3. Use Chrome DevTools Performance tab to identify bottlenecks
4. Reduce number of simultaneous animations

### Reduced Motion Not Working
1. Verify OS setting is enabled
2. Check browser supports `prefers-reduced-motion`
3. Clear browser cache
4. Test in incognito mode

## Best Practices

### Do's ✅
- Use GPU-accelerated properties (transform, opacity)
- Add `will-change` for frequently animated elements
- Respect `prefers-reduced-motion`
- Keep animations subtle and purposeful
- Test on multiple browsers
- Use centralized CSS variables
- Provide fallbacks for unsupported features

### Don'ts ❌
- Don't animate layout properties (width, height, margin, padding)
- Don't overuse `will-change` (memory intensive)
- Don't create animations longer than 600ms
- Don't animate without purpose
- Don't ignore accessibility
- Don't block functionality with animations

## Maintenance

### Adding New Animations
1. Define keyframes in `src/styles/animations.css`
2. Use GPU-accelerated properties only
3. Add CSS variable for duration/easing
4. Add `will-change` if animation is frequent
5. Test with reduced motion enabled
6. Document in this file

### Modifying Existing Animations
1. Check if animation is used in multiple places
2. Test changes on all browsers
3. Verify performance impact
4. Update documentation
5. Update test files if needed

## Resources

### Internal Documentation
- `src/components/TASK_*_SUMMARY.md` - Implementation summaries for each task
- `src/components/TASK_13_PERFORMANCE_TEST.md` - Performance testing guide
- `src/hooks/README.md` - Animation hooks documentation

### External Resources
- [CSS Animations on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [will-change Property](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

## Version History

### v1.0.0 (Current)
- Initial implementation of web animations system
- 34 tasks completed
- Full accessibility support
- Performance optimized for 60fps
- Cross-browser compatible

---

**Last Updated**: 2024
**Maintained By**: Development Team
**Questions**: Contact the development team for support
