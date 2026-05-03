# Animation Hooks

This directory contains custom React hooks for managing animations in the application.

## useReducedMotion

A hook that detects if the user has enabled the "prefers-reduced-motion" accessibility setting.

### Usage

```javascript
import { useReducedMotion } from './hooks/useAnimations';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      style={{
        transition: prefersReducedMotion 
          ? 'transform 0.05s ease-out'  // Reduced motion
          : 'transform 0.5s ease-out'    // Normal motion
      }}
    >
      Content
    </div>
  );
}
```

### Features

- ✅ Detects `prefers-reduced-motion` media query
- ✅ Automatically updates when user changes their preference
- ✅ SSR-safe (checks for window availability)
- ✅ Cleans up event listeners on unmount
- ✅ Supports both modern and legacy browser APIs

### Return Value

- **Type:** `boolean`
- **Returns:** `true` if user prefers reduced motion, `false` otherwise

### Browser Support

The hook uses `window.matchMedia('(prefers-reduced-motion: reduce)')` which is supported in:

- Chrome 74+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, the hook gracefully falls back to `false` (normal motion).

### Accessibility Compliance

This hook helps comply with:
- **WCAG 2.1 Level AA** - Success Criterion 2.3.3 (Animation from Interactions)
- **Requirements 7.5, 10.1, 10.2** from the Web Animations specification

### Implementation Details

The hook:
1. Initializes state with the current media query match
2. Sets up an event listener to detect changes
3. Updates state when the user changes their preference
4. Cleans up the event listener on unmount
5. Handles both modern (`addEventListener`) and legacy (`addListener`) APIs

### Testing

To test the hook:

1. **Manual Testing:**
   - Open `src/hooks/useAnimations.test.html` in a browser
   - Change your OS accessibility settings
   - Verify the status updates automatically

2. **Component Testing:**
   - Import `ReducedMotionDemo` component
   - Add it to your app temporarily
   - Test with different accessibility settings

3. **OS Settings:**
   - **Windows:** Settings → Accessibility → Visual effects → Animation effects (turn off)
   - **macOS:** System Preferences → Accessibility → Display → Reduce motion (check)
   - **Linux:** Settings → Accessibility → Reduce animation

### Example: Conditional Animation

```javascript
function AnimatedCard({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const animationClass = prefersReducedMotion 
    ? 'card-instant'  // No animation or very quick
    : 'card-animated'; // Full animation

  return (
    <div className={animationClass}>
      {children}
    </div>
  );
}
```

### Example: CSS Variables

```javascript
function App() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--animation-duration',
      prefersReducedMotion ? '50ms' : '300ms'
    );
  }, [prefersReducedMotion]);

  return <div>App content</div>;
}
```

## useFadeIn

A hook that triggers fade-in animation when an element enters the viewport using the Intersection Observer API.

### Usage

```javascript
import { useRef } from 'react';
import { useFadeIn } from './hooks/useAnimations';

function MyComponent() {
  const ref = useRef(null);
  useFadeIn(ref, { threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} className="fade-in-element">
      Content will fade in when scrolled into view
    </div>
  );
}
```

### Parameters

- **ref** (required): React ref object pointing to the element to observe
- **options** (optional): Configuration object
  - `threshold` (number, default: 0.1): Percentage of element visibility to trigger (0-1)
  - `rootMargin` (string, default: '0px'): Margin around the root element
  - `triggerOnce` (boolean, default: true): Whether to trigger animation only once

### Features

- ✅ Uses Intersection Observer API for efficient scroll detection
- ✅ Graceful degradation if Intersection Observer is not supported
- ✅ Configurable trigger threshold and margins
- ✅ Option to trigger once or repeatedly
- ✅ Automatic cleanup on unmount

### Requirements

Validates **Requirement 6.5**: Scroll-triggered animations for cards entering viewport.

## useStaggeredAnimation

A hook that generates staggered animation delays for multiple elements, enabling sequential animations.

### Usage

```javascript
import { useStaggeredAnimation } from './hooks/useAnimations';

function CardList({ items }) {
  const delays = useStaggeredAnimation(items.length, 100);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="card"
          style={{ animationDelay: `${delays[index]}ms` }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### Parameters

- **count** (number, required): Number of elements to generate delays for
- **baseDelay** (number, required): Base delay in milliseconds between each element

### Return Value

- **Type:** `number[]`
- **Returns:** Array of delay values in milliseconds, starting from 0

### Examples

```javascript
// Basic usage
const delays = useStaggeredAnimation(3, 100);
// Returns: [0, 100, 200]

// With 5 elements and 50ms delay
const delays = useStaggeredAnimation(5, 50);
// Returns: [0, 50, 100, 150, 200]

// Single element
const delays = useStaggeredAnimation(1, 100);
// Returns: [0]
```

### Features

- ✅ Simple, deterministic delay calculation
- ✅ Works with any number of elements
- ✅ No side effects or state management
- ✅ SSR-safe (pure JavaScript calculation)
- ✅ Integrates seamlessly with CSS animations

### Use Cases

1. **Card grids** - Stagger appearance of multiple cards
2. **List items** - Sequential animation for table rows
3. **Menu items** - Smooth appearance of menu options
4. **Modal content** - Sequential reveal of form fields

### Requirements

Validates **Requirement 2.2**: Stagger animation with 100ms delay between each card.

### Testing

Open `src/hooks/useStaggeredAnimation.test.html` to see:
- 6 unit tests covering various scenarios
- Interactive visual demo with animated cards
- Examples with different element counts and delays

### Example Components

See `src/hooks/useStaggeredAnimation.example.jsx` for three complete examples:
1. **StaggeredCardsExample** - Basic card grid with staggered animation
2. **DynamicStaggeredList** - Interactive list with adjustable item count
3. **MenuItemsExample** - Practical menu items implementation

## useCountUp

A hook that animates a number from 0 to a target value using requestAnimationFrame for smooth 60fps animation.

### Usage

```javascript
import { useCountUp } from './hooks/useAnimations';

function StatCard({ value, label }) {
  const animatedValue = useCountUp(value, 500);

  return (
    <div className="stat-card">
      <div className="stat-number">{Math.round(animatedValue)}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
```

### Parameters

- **end** (number, required): Target value to count up to
- **duration** (number, optional, default: 500): Animation duration in milliseconds

### Return Value

- **Type:** `number`
- **Returns:** Current animated value (from 0 to end)

### Features

- ✅ Uses requestAnimationFrame for smooth 60fps animation
- ✅ Ease-out cubic easing for natural deceleration
- ✅ Automatically resets when target value changes
- ✅ Proper cleanup with cancelAnimationFrame
- ✅ Handles zero values gracefully
- ✅ Configurable animation duration

### Examples

```javascript
// Basic usage with default duration (500ms)
const count = useCountUp(100);

// Custom duration
const count = useCountUp(100, 1000); // 1 second animation

// Decimal values
const percentage = useCountUp(87.5, 500);
return <div>{percentage.toFixed(1)}%</div>;

// Currency formatting
const amount = useCountUp(1234.56, 500);
return <div>${amount.toFixed(2)}</div>;

// Large numbers with formatting
const count = useCountUp(1234567, 800);
return <div>{Math.round(count).toLocaleString('en-US')}</div>;
```

### Use Cases

1. **Stat cards** - Animate statistics in dashboards (Total Orders, Revenue, etc.)
2. **Counters** - Animate any numeric display
3. **Progress indicators** - Show animated progress values
4. **Scoreboards** - Animate score updates

### Requirements

Validates:
- **Requirement 5.2**: Count-up animation from old value to new value in 500ms
- **Requirement 7.4**: Use requestAnimationFrame for JavaScript-based animations

### Implementation Details

The hook:
1. Resets to 0 when the end value changes
2. Uses requestAnimationFrame for smooth animation
3. Calculates progress with ease-out cubic easing: `1 - (1 - x)^3`
4. Updates state with current animated value
5. Cleans up animation frame on unmount or value change

### Testing

To test the hook:

1. **Interactive Test:**
   - Open `src/hooks/useCountUp.test.html` in a browser
   - Adjust target values and duration
   - Click "Trigger Animation" to restart
   - Monitor FPS and animation metrics

2. **Example Components:**
   - See `src/hooks/useCountUp.example.jsx` for 8 complete examples
   - Includes basic usage, stat cards, custom durations, formatting, etc.

### Example: AdminDashboard Integration

```javascript
function AdminDashboard() {
  const stats = {
    total: orders.length,
    picked: orders.filter(o => o.pickedUp).length,
    unpicked: orders.filter(o => !o.pickedUp).length,
  };

  const animatedTotal = useCountUp(stats.total, 500);
  const animatedPicked = useCountUp(stats.picked, 500);
  const animatedUnpicked = useCountUp(stats.unpicked, 500);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{Math.round(animatedTotal)}</div>
        <div className="stat-label">Tổng đơn</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{Math.round(animatedPicked)}</div>
        <div className="stat-label">Đã lấy</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{Math.round(animatedUnpicked)}</div>
        <div className="stat-label">Chưa lấy</div>
      </div>
    </div>
  );
}
```

### Example: With Reduced Motion Support

```javascript
function AccessibleStatCard({ value, label }) {
  const prefersReducedMotion = useReducedMotion();
  
  // Use very short duration if user prefers reduced motion
  const duration = prefersReducedMotion ? 50 : 500;
  const animatedValue = useCountUp(value, duration);

  return (
    <div className="stat-card">
      <div className="stat-number">{Math.round(animatedValue)}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
```

### Performance

- Achieves smooth 60fps animation on modern devices
- Uses GPU-accelerated rendering (no layout changes)
- Minimal state updates (only count value)
- Efficient cleanup prevents memory leaks

## Contributing

When adding new animation hooks:

1. Add JSDoc comments with examples
2. Handle SSR scenarios (check for window)
3. Clean up event listeners and observers
4. Respect `prefers-reduced-motion` setting
5. Update this README with usage examples
