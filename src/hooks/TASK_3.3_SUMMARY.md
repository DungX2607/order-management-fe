# Task 3.3: useStaggeredAnimation Hook Implementation

## Overview
Implemented the `useStaggeredAnimation` hook that generates staggered animation delays for multiple elements, enabling sequential animations with configurable timing.

## Implementation Details

### Hook Signature
```javascript
function useStaggeredAnimation(count, baseDelay): number[]
```

### Parameters
- **count** (number): Number of elements to generate delays for
- **baseDelay** (number): Base delay in milliseconds between each element

### Returns
- **Array<number>**: Array of delay values in milliseconds, starting from 0

### Algorithm
The hook uses a simple but effective algorithm:
1. Creates an array of length `count`
2. Each element at index `i` has delay value of `i * baseDelay`
3. First element always has 0 delay (appears immediately)
4. Each subsequent element adds `baseDelay` milliseconds

### Example Usage

#### Basic Usage
```javascript
const delays = useStaggeredAnimation(3, 100);
// Returns: [0, 100, 200]
```

#### With React Components
```javascript
function CardList({ items }) {
  const delays = useStaggeredAnimation(items.length, 100);
  
  return (
    <div>
      {items.map((item, index) => (
        <Card 
          key={item.id}
          style={{ animationDelay: `${delays[index]}ms` }}
        >
          {item.content}
        </Card>
      ))}
    </div>
  );
}
```

## Files Modified/Created

### Modified
- **src/hooks/useAnimations.js**: Added `useStaggeredAnimation` hook with JSDoc documentation

### Created
- **src/hooks/useStaggeredAnimation.test.html**: Comprehensive test suite with 6 unit tests and visual demo
- **src/hooks/useStaggeredAnimation.example.jsx**: Three React example components demonstrating different use cases
- **src/hooks/TASK_3.3_SUMMARY.md**: This documentation file

## Testing

### Unit Tests (6 tests, all passing)
1. ✓ Correct delays for 3 elements with 100ms base delay → [0, 100, 200]
2. ✓ Correct delays for 5 elements with 50ms base delay → [0, 50, 100, 150, 200]
3. ✓ Single element (count=1) → [0]
4. ✓ Zero base delay → [0, 0, 0]
5. ✓ Empty array for count=0 → []
6. ✓ 10 elements with 100ms base delay → [0, 100, 200, ..., 900]

### Visual Demo
The test HTML file includes an interactive demo with 4 cards that animate with staggered delays, allowing visual verification of the animation timing.

## Example Components

### 1. StaggeredCardsExample
Basic example showing 4 cards with 100ms stagger delay, demonstrating the core functionality.

### 2. DynamicStaggeredList
Interactive example with adjustable item count (1-20), showing how the hook handles dynamic lists.

### 3. MenuItemsExample
Practical example mimicking the OrderPage menu items, showing real-world usage with 6 menu items.

## Requirements Validation

**Validates: Requirement 2.2**
> "WHEN nhiều Card_Component được render cùng lúc, THE Component_Animation SHALL stagger animation với delay 100ms giữa mỗi card"

The hook successfully:
- ✓ Generates correct delay values for multiple elements
- ✓ Supports configurable base delay (100ms as specified)
- ✓ Returns array format suitable for applying to multiple components
- ✓ Works with any number of elements (0 to n)
- ✓ Integrates seamlessly with CSS animations via `animationDelay` style property

## Integration Points

### CSS Integration
The hook works with existing CSS animations by setting the `animationDelay` property:
```css
.card {
  animation: cardEnter 400ms ease-out forwards;
}
```

```javascript
<div 
  className="card"
  style={{ animationDelay: `${delays[index]}ms` }}
/>
```

### Use Cases in Application
1. **Card grids** (AdminDashboard stats, OrderPage menu items)
2. **List items** (UserManagement table rows, Order lists)
3. **Modal content** (Multiple form fields appearing sequentially)
4. **Toast notifications** (Multiple toasts in queue)

## Performance Considerations

- **Lightweight**: Pure calculation, no side effects or state
- **No re-renders**: Returns new array on each call, but values are deterministic
- **Memoization**: Can be wrapped with `useMemo` if needed for expensive renders
- **No DOM operations**: Pure JavaScript calculation

## Browser Compatibility

- Works in all modern browsers (ES6+ Array.from)
- No external dependencies
- No browser APIs required
- Compatible with SSR (no window/document access)

## Future Enhancements (Optional)

1. **Easing function**: Support non-linear delay progression
2. **Reverse stagger**: Option to stagger from last to first
3. **Random stagger**: Add randomness to delays for organic feel
4. **Max delay cap**: Limit maximum delay for large lists

## Conclusion

The `useStaggeredAnimation` hook is successfully implemented and tested. It provides a simple, reusable solution for creating staggered animations across multiple elements, fulfilling Requirement 2.2 and enabling smooth, professional-looking sequential animations throughout the application.
