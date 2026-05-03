# Loading States Integration Guide

## Overview
This guide shows how to integrate the new loading state animations into existing pages.

## Quick Start

### 1. Import Components
```jsx
// For skeleton loaders
import SkeletonLoader, { SkeletonCard, SkeletonTable } from './components/SkeletonLoader';

// For loading transitions
import LoadingTransition, { 
  LoadingButton, 
  LoadingOverlay, 
  LoadingSpinner 
} from './components/LoadingTransition';

// Import styles
import './styles/skeleton.css';
import './styles/animations.css';
```

## Integration Examples

### Example 1: OrderPage - Menu Items Loading

**Before:**
```jsx
function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="menu-grid">
      {menuItems.map(item => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

**After:**
```jsx
import LoadingTransition from './components/LoadingTransition';
import { SkeletonCard } from './components/SkeletonLoader';

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="menu-grid">
      {loading ? (
        // Show skeleton cards while loading
        Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} showHeader={false} lines={2} showFooter={true} />
        ))
      ) : (
        // Show actual menu items with fade-in
        menuItems.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

// Or use LoadingTransition for smoother transition:
function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <LoadingTransition
      isLoading={loading}
      skeleton={
        <div className="menu-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} showHeader={false} lines={2} showFooter={true} />
          ))}
        </div>
      }
    >
      <div className="menu-grid">
        {menuItems.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </LoadingTransition>
  );
}
```

### Example 2: UserManagement - Table Loading

**Before:**
```jsx
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**After:**
```jsx
import LoadingTransition from './components/LoadingTransition';
import { SkeletonTable } from './components/SkeletonLoader';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <LoadingTransition
      isLoading={loading}
      skeletonType="table"
      skeletonProps={{ rows: 5, columns: 4 }}
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LoadingTransition>
  );
}
```

### Example 3: Login Form - Button Loading

**Before:**
```jsx
function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" />
      <input type="password" />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

**After:**
```jsx
import { LoadingButton } from './components/LoadingTransition';

function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" />
      <input type="password" />
      <LoadingButton 
        type="submit" 
        isLoading={loading}
        showText={true}
        loadingText="Logging in..."
      >
        Login
      </LoadingButton>
    </form>
  );
}
```

### Example 4: AdminDashboard - Stat Cards Loading

**Before:**
```jsx
function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="stats-grid">
      <div className="card">
        <h3>Total Orders</h3>
        <p className="stat-value">{stats.totalOrders}</p>
      </div>
      <div className="card">
        <h3>Completed</h3>
        <p className="stat-value">{stats.completed}</p>
      </div>
      <div className="card">
        <h3>Pending</h3>
        <p className="stat-value">{stats.pending}</p>
      </div>
    </div>
  );
}
```

**After:**
```jsx
import LoadingTransition from './components/LoadingTransition';
import { SkeletonCard } from './components/SkeletonLoader';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="stats-grid">
      {loading ? (
        // Show skeleton cards
        Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} showHeader={false} lines={1} showFooter={false} />
        ))
      ) : (
        // Show actual stat cards
        <>
          <div className="card">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </>
      )}
    </div>
  );
}
```

### Example 5: Full Page Loading Overlay

**Use Case:** Show overlay during data refresh or background operations

```jsx
import { LoadingOverlay } from './components/LoadingTransition';

function OrderPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchOrders();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={handleRefresh}>Refresh</button>
      
      {/* Your page content */}
      <div className="orders-list">
        {/* ... */}
      </div>

      {/* Loading overlay */}
      <LoadingOverlay 
        isLoading={refreshing} 
        text="Refreshing orders..."
      />
    </div>
  );
}
```

## Component API Reference

### SkeletonLoader
```jsx
<SkeletonLoader
  variant="text|card|circle|rectangle"  // Shape of skeleton
  width="200px"                          // CSS width
  height="40px"                          // CSS height
  count={3}                              // Number of skeletons
  className="custom-class"               // Additional classes
  style={{ margin: '1rem' }}            // Inline styles
/>
```

### SkeletonCard
```jsx
<SkeletonCard
  showHeader={true}   // Show header with avatar and text
  lines={3}           // Number of body text lines
  showFooter={false}  // Show footer with buttons
/>
```

### SkeletonTable
```jsx
<SkeletonTable
  rows={5}      // Number of table rows
  columns={4}   // Number of table columns
/>
```

### LoadingTransition
```jsx
<LoadingTransition
  isLoading={loading}                    // Loading state
  skeletonType="card|table|text|custom"  // Skeleton type
  skeletonProps={{ lines: 3 }}           // Props for skeleton
  skeleton={<CustomSkeleton />}          // Custom skeleton component
  minLoadingTime={500}                   // Minimum loading time (ms)
  className="custom-class"               // Additional classes
>
  {/* Actual content */}
</LoadingTransition>
```

### LoadingButton
```jsx
<LoadingButton
  isLoading={loading}              // Loading state
  showText={false}                 // Show text while loading
  loadingText="Loading..."         // Text during loading
  onClick={handleClick}            // Click handler
  type="button|submit|reset"       // Button type
  disabled={false}                 // Disabled state
  className="btn-primary"          // Additional classes
>
  Button Text
</LoadingButton>
```

### LoadingSpinner
```jsx
<LoadingSpinner
  size="small|medium|large"        // Spinner size
  color="primary|white|danger"     // Spinner color
  inline={false}                   // Display inline
  centered={false}                 // Center in container
  className="custom-class"         // Additional classes
/>
```

### LoadingOverlay
```jsx
<LoadingOverlay
  isLoading={loading}              // Show/hide overlay
  text="Loading..."                // Loading text
  fixed={false}                    // Fixed positioning (full-screen)
  type="spinner|dots"              // Loading indicator type
/>
```

## Best Practices

### 1. Choose the Right Loading Pattern

- **Skeleton Loaders**: Best for content that has a predictable layout (cards, tables, lists)
- **Spinners**: Best for unpredictable content or short loading times
- **Loading Buttons**: Always use for form submissions and actions
- **Loading Overlays**: Use for background operations that don't change layout

### 2. Match Skeleton to Content

Make sure your skeleton closely matches the actual content layout:
```jsx
// Good: Skeleton matches content structure
<SkeletonCard showHeader={true} lines={3} showFooter={true} />
// Content has header, 3 lines of text, and footer buttons

// Bad: Skeleton doesn't match
<SkeletonLoader variant="text" count={1} />
// Content is a complex card with multiple sections
```

### 3. Use Appropriate Loading Times

```jsx
// Good: Show skeleton for data fetching
<LoadingTransition isLoading={isFetchingData}>

// Good: Use minLoadingTime to prevent flash
<LoadingTransition isLoading={loading} minLoadingTime={300}>

// Bad: Don't use skeleton for instant operations
<LoadingTransition isLoading={isTogglingCheckbox}>
```

### 4. Combine with Existing Animations

Loading states work well with other animations:
```jsx
<PageTransition>
  <LoadingTransition isLoading={loading}>
    <div className="card fade-in">
      {/* Content */}
    </div>
  </LoadingTransition>
</PageTransition>
```

## Accessibility

All loading components include accessibility features:

- **aria-hidden="true"**: Skeletons are hidden from screen readers
- **disabled state**: Loading buttons are properly disabled
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **Semantic HTML**: Proper button and loading states

## Performance Tips

1. **Reuse skeleton components**: Don't create new skeleton components for each item
2. **Use CSS animations**: All animations use GPU-accelerated properties
3. **Lazy load**: Only show skeletons for visible content
4. **Optimize count**: Don't render too many skeleton items at once

## Testing

### Visual Testing
Open the demo files to test animations:
- `src/components/LoadingStates.demo.html` - Standalone HTML demo
- `src/components/LoadingStates.example.jsx` - React component demo

### Manual Testing Checklist
- [ ] Skeleton shimmer animation runs smoothly
- [ ] Spinner rotates without jank
- [ ] Loading buttons disable interaction
- [ ] Transitions fade smoothly
- [ ] Reduced motion works correctly
- [ ] Components work on mobile

## Troubleshooting

### Skeleton not showing
- Make sure `skeleton.css` is imported
- Check that `isLoading` prop is `true`
- Verify skeleton component is rendered

### Transition not smooth
- Ensure both skeleton and content have similar dimensions
- Check that CSS animations are not disabled
- Verify `animations.css` is imported

### Button spinner not visible
- Check button has enough padding
- Verify button text color is not transparent
- Ensure `animations.css` is imported

### Spinner not rotating
- Check that `@keyframes spin` is defined
- Verify no CSS conflicts
- Check browser console for errors

## Next Steps

1. **Integrate into pages**: Start with high-traffic pages (OrderPage, Login)
2. **Replace existing loading states**: Update old spinners and loading text
3. **Test on real data**: Verify loading states with actual API calls
4. **Gather feedback**: Monitor user experience with new loading states
5. **Optimize**: Adjust timing and animations based on feedback

## Support

For issues or questions:
- Check the demo files for examples
- Review the component source code
- Test with the standalone HTML demo
- Verify CSS imports are correct
