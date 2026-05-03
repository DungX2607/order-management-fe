# Implementation Plan: Web Animations

## Overview

Tính năng Web Animations sẽ được triển khai theo phương pháp CSS-first với React hooks hỗ trợ. Implementation sẽ tập trung vào performance, accessibility, và maintainability. Tất cả animations sẽ sử dụng GPU-accelerated properties (transform, opacity) và respect prefers-reduced-motion.

## Tasks

- [x] 1. Thiết lập animation configuration và base styles
  - Tạo file `src/styles/animations.css` với CSS variables cho durations, easing functions, và distances
  - Định nghĩa @keyframes cho các animation patterns cơ bản: fadeIn, slideInRight, scaleIn, pulse, shimmer
  - Thêm @media query cho prefers-reduced-motion với reduced durations
  - Import animations.css vào src/main.jsx
  - _Requirements: 7.1, 7.5, 8.1, 8.2, 10.1, 10.2_

- [x] 2. Tạo reusable animation utility classes
  - Thêm utility classes vào `src/styles/animations.css`: .fade-in, .slide-in-right, .scale-in, .pulse, .shimmer
  - Thêm hover effect classes: .hover-lift, .btn-press
  - Thêm stagger delay classes: .stagger-1, .stagger-2, .stagger-3
  - Test các classes bằng cách apply vào existing components
  - _Requirements: 2.2, 3.1, 3.2, 8.3_

- [x] 3. Implement animation hooks
  - [x] 3.1 Tạo file `src/hooks/useAnimations.js` và implement useReducedMotion hook
    - Sử dụng window.matchMedia để detect prefers-reduced-motion
    - Return boolean value
    - Add event listener để update khi preference thay đổi
    - _Requirements: 7.5, 10.1, 10.2_
  
  - [x] 3.2 Implement useFadeIn hook với Intersection Observer
    - Accept ref, threshold, rootMargin, triggerOnce options
    - Add/remove CSS class khi element intersects viewport
    - Cleanup observer on unmount
    - _Requirements: 6.5_
  
  - [x] 3.3 Implement useStaggeredAnimation hook
    - Accept count và baseDelay parameters
    - Return array of delay values
    - _Requirements: 2.2_
  
  - [x] 3.4 Implement useCountUp hook
    - Accept end value và duration parameters
    - Use requestAnimationFrame để animate number
    - Return current animated value
    - _Requirements: 5.2, 7.4_

- [ ]* 3.5 Write unit tests cho animation hooks
  - Test useReducedMotion với mocked matchMedia
  - Test useStaggeredAnimation delay calculation
  - Test useCountUp animation progression
  - _Requirements: 7.5, 8.3_

- [x] 4. Implement PageTransition component
  - Tạo file `src/components/PageTransition.jsx`
  - Wrap children với div có animation classes
  - Apply fade-in và slide-in-right animations
  - Use useReducedMotion hook để adjust behavior
  - Update App.jsx để wrap tất cả routes với PageTransition
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ]* 4.1 Write integration tests cho PageTransition
  - Test animation classes được apply khi route changes
  - Test reduced motion behavior
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 5. Implement card component animations
  - Add animation styles cho .card class trong animations.css
  - Implement cardEnter keyframe với fade + scale
  - Add stagger classes cho multiple cards
  - Apply animations vào existing card components trong OrderPage và AdminDashboard
  - _Requirements: 2.1, 2.2, 2.5_

- [x] 6. Implement modal animations
  - Add modal animation styles vào animations.css
  - Implement modalEnter keyframe với scale + fade
  - Add backdrop fade animation
  - Style modal-actions với flexbox: OK button bên trái, Cancel bên phải
  - Apply animations vào existing modal/confirm dialogs
  - _Requirements: 2.3, 2.5_

- [x] 7. Implement toast notification system
  - [x] 7.1 Tạo Toast component trong `src/components/Toast.jsx`
    - Position fixed ở bottom center
    - Implement toastEnter và toastExit keyframes
    - Auto-dismiss sau 3000ms
    - Support success/error variants
    - _Requirements: 2.4, 5.4_
  
  - [x] 7.2 Tạo useToast hook trong `src/hooks/useToast.js`
    - Manage toast state và queue
    - Provide showToast function
    - Handle auto-dismiss timing
    - _Requirements: 2.4, 5.4_
  
  - [x] 7.3 Integrate toast system vào App.jsx
    - Add ToastContainer component
    - Replace existing alert() calls với toast notifications
    - _Requirements: 2.4, 5.4_

- [x] 8. Checkpoint - Verify core animations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement interactive feedback animations
  - [x] 9.1 Add button interaction styles
    - Implement hover scale và brightness effects
    - Implement active press effect
    - Apply vào tất cả Button components
    - _Requirements: 3.1, 3.2_
  
  - [x] 9.2 Add table row hover effects
    - Implement background color transition on hover
    - Apply vào OrderPage và UserManagement tables
    - _Requirements: 3.3_
  
  - [x] 9.3 Add form element focus effects
    - Implement border glow effect cho inputs, selects, textareas
    - Apply vào Login form và các forms khác
    - _Requirements: 3.5_
  
  - [x] 9.4 Add menu item card interaction
    - Implement ripple effect on click (optional, có thể skip nếu phức tạp)
    - Hoặc sử dụng simple scale effect
    - Apply vào OrderPage menu items
    - _Requirements: 3.4_

- [x] 10. Implement loading state animations
  - [x] 10.1 Create skeleton loading component
    - Tạo `src/components/SkeletonLoader.jsx`
    - Implement shimmer animation với gradient
    - Support different shapes: card, text, circle
    - _Requirements: 4.1, 4.2_
  
  - [x] 10.2 Enhance existing spinner
    - Improve spinner animation smoothness
    - Add to button loading states
    - _Requirements: 4.3, 4.4_
  
  - [x] 10.3 Add loading-to-content transitions
    - Fade out skeleton và fade in content
    - Apply vào data loading scenarios
    - _Requirements: 4.5_

- [x] 11. Implement data update animations
  - [x] 11.1 Add table row update highlight
    - Implement rowPulse keyframe với background color pulse
    - Trigger khi row data updates
    - Apply vào OrderPage table
    - _Requirements: 5.1_
  
  - [x] 11.2 Add stat card count-up animation
    - Use useCountUp hook cho stat numbers
    - Apply vào AdminDashboard stat cards
    - _Requirements: 5.2_
  
  - [x] 11.3 Add status badge transition
    - Implement fade out/in animation cho badge changes
    - Apply vào Cycle_Status_Badge
    - _Requirements: 5.3_
  
  - [x] 11.4 Add filter transition animation
    - Fade out non-matching rows và fade in matching rows
    - Apply vào table filtering logic
    - _Requirements: 5.5_

- [x] 12. Implement micro-interactions
  - [x] 12.1 Add checkbox animation
    - Implement scale và color transition on check/uncheck
    - Apply vào form checkboxes
    - _Requirements: 6.1_
  
  - [x] 12.2 Add dropdown animation
    - Implement slide down với fade in cho dropdown menus
    - Apply vào select elements
    - _Requirements: 6.2_
  
  - [x] 12.3 Add icon hover effects
    - Implement subtle bounce animation on hover
    - Apply vào icons và emojis
    - _Requirements: 6.3_
  
  - [x] 12.4 Add active cycle badge pulse
    - Implement subtle pulse animation cho "Đang mở" status
    - Loop every 2 seconds
    - _Requirements: 6.4_
  
  - [x] 12.5 Add scroll-triggered animations
    - Use useFadeIn hook cho cards khi scroll vào viewport
    - Apply vào long lists và card grids
    - _Requirements: 6.5_

- [x] 13. Performance optimization
  - Add will-change property cho animated elements
  - Verify tất cả animations sử dụng transform/opacity
  - Test performance với Chrome DevTools Performance tab
  - Ensure 60fps trên desktop browsers
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 14. Cross-browser testing và fixes
  - Test animations trên Chrome, Firefox, Safari, Edge
  - Add vendor prefixes nếu cần (Vite autoprefixer should handle)
  - Implement graceful degradation cho unsupported features
  - Test trên mobile browsers (Chrome Mobile, Safari iOS)
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 15. Accessibility compliance
  - Verify prefers-reduced-motion được respect
  - Test với reduced motion enabled: animations giảm xuống 50ms
  - Verify essential animations (loading) vẫn hoạt động
  - Check không có flashing animations (< 3 flashes/second)
  - Test keyboard navigation không bị affected
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 16. Documentation và cleanup
  - Document animation patterns trong README hoặc docs
  - Add JSDoc comments cho hooks và components
  - Clean up unused animation classes
  - Verify tất cả animation constants được centralized
  - _Requirements: 8.4, 8.5_

- [x] 17. Final checkpoint - Complete testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify tất cả requirements được implement
  - Test end-to-end user flows với animations
  - Confirm performance targets đạt được

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Focus on CSS-based animations first, JavaScript animations sau
- Test performance continuously, không đợi đến cuối
- Reduced motion support là critical requirement, implement early
- Toast system có thể reuse cho nhiều scenarios (success, error, info)
- Ripple effect (task 9.4) có thể skip nếu quá phức tạp, dùng simple scale thay thế
- Skeleton loader có thể reuse cho nhiều loading states
- Stagger animations chỉ apply khi có nhiều elements cùng lúc
- Modal button order: OK (primary) bên trái, Cancel bên phải theo design
- Toast position: bottom center, slide in từ dưới lên
