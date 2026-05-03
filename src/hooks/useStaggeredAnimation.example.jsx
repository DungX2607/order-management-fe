import React from 'react';
import { useStaggeredAnimation } from './useAnimations';

/**
 * Example component demonstrating useStaggeredAnimation hook
 * Shows how to apply staggered delays to multiple card elements
 */
function StaggeredCardsExample() {
  const items = [
    { id: 1, title: 'Card 1', content: 'First card with 0ms delay' },
    { id: 2, title: 'Card 2', content: 'Second card with 100ms delay' },
    { id: 3, title: 'Card 3', content: 'Third card with 200ms delay' },
    { id: 4, title: 'Card 4', content: 'Fourth card with 300ms delay' },
  ];

  // Generate staggered delays: [0, 100, 200, 300]
  const delays = useStaggeredAnimation(items.length, 100);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Staggered Card Animation Example</h2>
      <p>Cards will appear one after another with 100ms delay between each</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="card scale-in"
            style={{
              animationDelay: `${delays[index]}ms`,
              padding: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              {item.content}
            </p>
            <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>
              Delay: {delays[index]}ms
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example with dynamic list
 * Shows how to handle variable number of items
 */
function DynamicStaggeredList() {
  const [itemCount, setItemCount] = React.useState(5);
  const delays = useStaggeredAnimation(itemCount, 80);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dynamic Staggered List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Number of items: 
          <input 
            type="number" 
            min="1" 
            max="20" 
            value={itemCount}
            onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            className="fade-in slide-in-right"
            style={{
              animationDelay: `${delays[index]}ms`,
              padding: '15px',
              background: '#f0f0f0',
              borderRadius: '4px',
              borderLeft: '4px solid #4CAF50',
            }}
          >
            Item {index + 1} - Delay: {delays[index]}ms
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example with menu items (like OrderPage)
 * Shows practical usage for menu item cards
 */
function MenuItemsExample() {
  const menuItems = [
    { id: 1, name: 'Cà phê đen', price: '15,000đ', emoji: '☕' },
    { id: 2, name: 'Cà phê sữa', price: '18,000đ', emoji: '☕' },
    { id: 3, name: 'Trà đào', price: '20,000đ', emoji: '🍑' },
    { id: 4, name: 'Trà sữa', price: '22,000đ', emoji: '🧋' },
    { id: 5, name: 'Nước cam', price: '25,000đ', emoji: '🍊' },
    { id: 6, name: 'Sinh tố', price: '28,000đ', emoji: '🥤' },
  ];

  const delays = useStaggeredAnimation(menuItems.length, 100);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu Items with Staggered Animation</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '15px',
        marginTop: '20px'
      }}>
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            className="card scale-in hover-lift"
            style={{
              animationDelay: `${delays[index]}ms`,
              padding: '20px',
              background: 'white',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>
              {item.emoji}
            </div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {item.name}
            </div>
            <div style={{ color: '#4CAF50', fontSize: '14px' }}>
              {item.price}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Export all examples
export { StaggeredCardsExample, DynamicStaggeredList, MenuItemsExample };
export default StaggeredCardsExample;
