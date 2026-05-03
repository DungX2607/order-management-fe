# Design Document - Web Animations

## Overview

### Purpose

Tính năng Web Animations nhằm nâng cao trải nghiệm người dùng (UX) của hệ thống đặt nước bằng cách bổ sung các animation và hiệu ứng chuyển động mượt mà, chuyên nghiệp. Hệ thống animation sẽ cung cấp feedback trực quan cho các tương tác của người dùng, làm cho ứng dụng cảm thấy sinh động và responsive hơn.

### Scope

**In Scope:**
- Page transition animations khi điều hướng giữa các route
- Component entry/exit animations (cards, modals, toasts)
- Interactive feedback animations (buttons, form elements, table rows)
- Loading state animations (skeleton screens, spinners)
- Data update animations (stat counters, status badges)
- Micro-interactions (checkboxes, dropdowns, hover effects)
- Performance optimization cho animations
- Accessibility support (prefers-reduced-motion)
- Cross-browser compatibility

**Out of Scope:**
- Complex 3D animations hoặc WebGL effects
- Video/audio animations
- Game-like animations
- Custom animation timeline editors
- Animation testing frameworks (sẽ sử dụng manual testing và visual regression)

### Design Goals

1. **Smoothness**: Tất cả animations phải chạy ở 60fps trên các thiết bị hiện đại
2. **Subtlety**: Animations phải tinh tế, không làm phân tán người dùng
3. **Consistency**: Sử dụng timing và easing functions nhất quán trong toàn bộ ứng dụng
4. **Performance**: Sử dụng GPU-accelerated properties (transform, opacity)
5. **Accessibility**: Respect prefers-reduced-motion và không gây seizures
6. **Maintainability**: Centralized configuration và reusable patterns

### Technology Stack

- **React 18.2.0**: Component-based architecture với hooks
- **CSS3 Animations & Transitions**: Native browser animations
- **CSS Variables**: Centralized animation configuration
- **Intersection Observer API**: Scroll-triggered animations
- **requestAnimationFrame**: JavaScript-based animations
- **React Router DOM**: Page transitions với route changes

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  (React Components: OrderPage, AdminDashboard, Login, etc.) │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Animation System Layer                      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   CSS        │  │   React      │  │  Animation   │      │
│  │ Animations   │  │   Hooks      │  │   Utils      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │        Animation Configuration                    │       │
│  │  (CSS Variables, Constants, Timing Functions)    │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Browser APIs                              │
│  (CSS Engine, Intersection Observer, RAF, Media Queries)    │
└─────────────────────────────────────────────────────────────┘
```

### Animation Layers

1. **CSS-Based Animations**: Declarative animations sử dụng CSS classes và transitions
   - Page transitions
   - Component entry/exit
   - Hover effects
   - Loading states

2. **React Hook-Based Animations**: Imperative animations sử dụng React hooks
   - Scroll-triggered animations
   - Count-up animations
   - Complex state-dependent animations

3. **Configuration Layer**: Centralized animation settings
   - Duration constants
   - Easing functions
   - Breakpoints
   - Accessibility preferences

### Design Patterns

1. **CSS Class Toggle Pattern**: Thêm/xóa CSS classes để trigger animations
2. **Staggered Animation Pattern**: Delay animations cho multiple elements
3. **Intersection Observer Pattern**: Trigger animations khi elements vào viewport
4. **Reduced Motion Pattern**: Detect và respect user preferences

## Components and Interfaces

### 1. Animation Configuration Module

**File**: `src/styles/animations.css`

Centralized CSS variables và animation definitions:

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

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  :root {
    --anim-duration-fast: 50ms;
    --anim-duration-normal: 50ms;
    --anim-duration-medium: 50ms;
    --anim-duration-slow: 50ms;
    --anim-duration-slower: 50ms;
  }
}
```

### 2. Page Transition Component

**File**: `src/components/PageTransition.jsx`

Wrapper component cho page-level animations:

```jsx
interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition({ children }: PageTransitionProps): JSX.Element
```

**Behavior**:
- Fade in + slide in từ phải sang trái khi mount
- Sử dụng CSS classes: `page-enter`, `page-enter-active`
- Duration: 300ms với ease-out

### 3. Animation Hooks

**File**: `src/hooks/useAnimations.js`

#### `useFadeIn(ref, options)`

Trigger fade-in animation khi element vào viewport.

```javascript
interface UseFadeInOptions {
  threshold?: number;      // 0-1, default 0.1
  rootMargin?: string;     // default '0px'
  triggerOnce?: boolean;   // default true
}

function useFadeIn(
  ref: React.RefObject<HTMLElement>,
  options?: UseFadeInOptions
): void
```

#### `useStaggeredAnimation(count, baseDelay)`

Generate staggered animation delays cho multiple elements.

```javascript
function useStaggeredAnimation(
  count: number,
  baseDelay: number
): number[]
```

Returns: Array of delay values in milliseconds

#### `useCountUp(end, duration)`

Animate number từ 0 đến target value.

```javascript
function useCountUp(
  end: number,
  duration?: number
): number
```

Returns: Current animated value

#### `useReducedMotion()`

Detect user's motion preference.

```javascript
function useReducedMotion(): boolean
```

Returns: `true` if user prefers reduced motion

### 4. Animation Utility Classes

**File**: `src/styles/animations.css`

Reusable CSS classes cho common animations:

```css
/* Fade In */
.fade-in {
  animation: fadeIn var(--anim-duration-medium) var(--anim-ease-out);
}

/* Slide In */
.slide-in-right {
  animation: slideInRight var(--anim-duration-medium) var(--anim-ease-out);
}

/* Scale In */
.scale-in {
  animation: scaleIn var(--anim-duration-slow) var(--anim-ease-out);
}

/* Pulse */
.pulse {
  animation: pulse 2s var(--anim-ease-in-out) infinite;
}

/* Shimmer (Loading) */
.shimmer {
  animation: shimmer 1.5s linear infinite;
}

/* Hover Effects */
.hover-lift {
  transition: transform var(--anim-duration-normal) var(--anim-ease-out);
}
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Button Press */
.btn-press:active {
  transform: scale(0.95);
  transition: transform var(--anim-duration-fast);
}
```

### 5. Component-Specific Animations

#### Card Component Animation

```css
.card {
  opacity: 0;
  transform: scale(0.95);
  animation: cardEnter var(--anim-duration-slow) var(--anim-ease-out) forwards;
}

.card.stagger-1 { animation-delay: 100ms; }
.card.stagger-2 { animation-delay: 200ms; }
.card.stagger-3 { animation-delay: 300ms; }
```

#### Modal Animation

```css
.modal-backdrop {
  animation: fadeIn var(--anim-duration-normal);
}

.modal-content {
  animation: modalEnter var(--anim-duration-medium) var(--anim-ease-out);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start; /* Primary action (OK) on left, Cancel on right */
  margin-top: 1rem;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### Toast Notification Animation

```css
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: toastEnter var(--anim-duration-medium) var(--anim-ease-out);
}

.toast.exit {
  animation: toastExit var(--anim-duration-medium) var(--anim-ease-out);
}

@keyframes toastEnter {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toastExit {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}
```

#### Table Row Highlight

```css
.table-row {
  transition: background-color var(--anim-duration-normal);
}

.table-row:hover {
  background-color: #f9f9f9;
}

.table-row.updated {
  animation: rowPulse var(--anim-duration-slower) var(--anim-ease-out);
}

@keyframes rowPulse {
  0%, 100% { background-color: transparent; }
  50% { background-color: #e8f5e9; }
}
```

#### Skeleton Loading

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Data Models

### Animation Configuration Object

```javascript
const animationConfig = {
  durations: {
    fast: 100,
    normal: 200,
    medium: 300,
    slow: 400,
    slower: 600,
  },
  
  easings: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  distances: {
    slideDistance: 20,
    scaleSmall: 0.95,
    scaleLarge: 1.05,
  },
  
  performance: {
    useWillChange: true,
    useGPUAcceleration: true,
    targetFPS: 60,
  },
  
  accessibility: {
    respectReducedMotion: true,
    reducedMotionDuration: 50,
    essentialAnimations: ['loading', 'focus'],
  },
};
```

### Animation State

Không cần complex state management vì hầu hết animations là CSS-based. Chỉ cần track:

```javascript
// In components that need animation state
const [isAnimating, setIsAnimating] = useState(false);
const [hasEntered, setHasEntered] = useState(false);
const prefersReducedMotion = useReducedMotion();
```

### Intersection Observer Entry

```javascript
interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  time: number;
}
```

## Error Handling

### Animation Failures

1. **Browser không hỗ trợ CSS features**:
   - Graceful degradation: Hiển thị content ngay lập tức không có animation
   - Feature detection với `@supports` CSS rule

2. **Performance issues**:
   - Monitor frame rate với Performance API
   - Fallback về simpler animations nếu FPS < 30
   - Disable non-essential animations trên low-end devices

3. **Intersection Observer không available**:
   - Fallback: Hiển thị tất cả elements ngay lập tức
   - Polyfill không cần thiết vì chỉ là progressive enhancement

### Error Handling Strategy

```javascript
// Example: Safe animation trigger
function triggerAnimation(element, animationClass) {
  try {
    if (!element || prefersReducedMotion) {
      return;
    }
    
    // Check if animation is supported
    if (!CSS.supports('animation', 'fadeIn 1s')) {
      console.warn('Animations not supported');
      return;
    }
    
    element.classList.add(animationClass);
  } catch (error) {
    console.error('Animation error:', error);
    // Fail silently - không block UI
  }
}
```

### Accessibility Error Prevention

```javascript
// Prevent seizure-inducing animations
const SAFE_ANIMATION_LIMITS = {
  maxFlashesPerSecond: 3,
  minContrastRatio: 3,
  maxParallelAnimations: 5,
};

// Validate animation safety
function isAnimationSafe(animation) {
  // Check flash rate
  // Check contrast changes
  // Check concurrent animations
  return true;
}
```

## Testing Strategy

### Testing Approach

Vì đây là UI animation feature, **Property-Based Testing KHÔNG phù hợp**. Thay vào đó, sử dụng:

1. **Manual Visual Testing**: Primary testing method
2. **Example-Based Unit Tests**: Test animation logic và utilities
3. **Visual Regression Testing**: Snapshot testing cho animation states
4. **Performance Testing**: FPS monitoring và performance metrics
5. **Accessibility Testing**: prefers-reduced-motion compliance

### Test Categories

#### 1. Unit Tests (Example-Based)

Test các utility functions và hooks:

```javascript
// Test useCountUp hook
describe('useCountUp', () => {
  it('should animate from 0 to target value', () => {
    const { result } = renderHook(() => useCountUp(100, 500));
    expect(result.current).toBe(0);
    
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBeCloseTo(50, 0);
    
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe(100);
  });
});

// Test useReducedMotion hook
describe('useReducedMotion', () => {
  it('should return true when prefers-reduced-motion is set', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});

// Test staggered animation delays
describe('useStaggeredAnimation', () => {
  it('should generate correct delay array', () => {
    const { result } = renderHook(() => useStaggeredAnimation(3, 100));
    expect(result.current).toEqual([0, 100, 200]);
  });
});
```

#### 2. Visual Regression Tests

Snapshot testing cho animation states:

```javascript
describe('Card Animation', () => {
  it('should match snapshot in initial state', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('should match snapshot after animation', async () => {
    const { container } = render(<Card>Content</Card>);
    await waitFor(() => {
      expect(container.firstChild).toHaveClass('card-entered');
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

#### 3. Integration Tests

Test animation behavior trong context của components:

```javascript
describe('Page Transition', () => {
  it('should apply transition classes on route change', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        </Routes>
      </MemoryRouter>
    );
    
    const link = screen.getByText('About');
    fireEvent.click(link);
    
    await waitFor(() => {
      expect(container.querySelector('.page-enter')).toBeInTheDocument();
    });
  });
});
```

#### 4. Performance Tests

Monitor animation performance:

```javascript
describe('Animation Performance', () => {
  it('should maintain 60fps during card animations', async () => {
    const fps = [];
    let lastTime = performance.now();
    
    const measureFPS = () => {
      const currentTime = performance.now();
      fps.push(1000 / (currentTime - lastTime));
      lastTime = currentTime;
    };
    
    // Render multiple cards
    render(
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i}>Card {i}</Card>
        ))}
      </div>
    );
    
    // Measure FPS during animation
    const interval = setInterval(measureFPS, 16);
    await new Promise(resolve => setTimeout(resolve, 500));
    clearInterval(interval);
    
    const avgFPS = fps.reduce((a, b) => a + b, 0) / fps.length;
    expect(avgFPS).toBeGreaterThan(55); // Allow some variance
  });
});
```

#### 5. Accessibility Tests

Test reduced motion compliance:

```javascript
describe('Accessibility', () => {
  it('should reduce animation duration when prefers-reduced-motion is set', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
    }));
    
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    const styles = window.getComputedStyle(card);
    
    expect(styles.animationDuration).toBe('0.05s'); // 50ms
  });
  
  it('should not use flashing animations', () => {
    const { container } = render(<App />);
    const animations = container.querySelectorAll('[class*="flash"]');
    expect(animations.length).toBe(0);
  });
});
```

### Manual Testing Checklist

**Page Transitions**:
- [ ] Navigate giữa các routes, verify smooth fade + slide
- [ ] Test trên Chrome, Firefox, Safari, Edge
- [ ] Test trên mobile browsers

**Component Animations**:
- [ ] Cards fade in và scale correctly
- [ ] Staggered animations có timing đúng
- [ ] Modals animate in/out smoothly
- [ ] Toasts slide in và auto-dismiss

**Interactive Feedback**:
- [ ] Buttons scale on hover và click
- [ ] Table rows highlight on hover
- [ ] Form elements show focus glow
- [ ] Checkboxes animate on toggle

**Loading States**:
- [ ] Skeleton screens shimmer correctly
- [ ] Spinners rotate smoothly
- [ ] Loading states transition to content

**Performance**:
- [ ] No jank hoặc stuttering
- [ ] Smooth 60fps trên desktop
- [ ] Acceptable performance trên mobile
- [ ] No layout shifts during animations

**Accessibility**:
- [ ] Enable prefers-reduced-motion, verify animations reduce
- [ ] Keyboard navigation không bị affected
- [ ] Screen reader không bị confused
- [ ] No seizure-inducing effects

### Test Environment Setup

```javascript
// jest.setup.js
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
```

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **jest-dom**: DOM matchers
- **Manual Testing**: Visual verification
- **Chrome DevTools**: Performance profiling
- **Lighthouse**: Performance audits

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage cho hooks và utilities
- **Integration Tests**: Cover major animation flows
- **Visual Tests**: Snapshot key animation states
- **Manual Tests**: 100% coverage cho visual appearance
- **Performance Tests**: Monitor FPS và paint times
- **Accessibility Tests**: 100% compliance với WCAG 2.1 Level AA

