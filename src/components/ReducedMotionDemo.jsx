import { useReducedMotion } from '../hooks/useAnimations';

/**
 * Demo component to showcase useReducedMotion hook
 * This component can be used for testing and demonstration purposes
 */
function ReducedMotionDemo() {
  const prefersReducedMotion = useReducedMotion();

  const boxStyle = {
    width: '100px',
    height: '100px',
    background: '#2196f3',
    margin: '20px',
    transition: prefersReducedMotion 
      ? 'transform 0.05s ease-out' 
      : 'transform 0.5s ease-out',
    cursor: 'pointer',
  };

  const hoverStyle = {
    transform: 'scale(1.2) rotate(10deg)',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useReducedMotion Hook Demo</h2>
      
      <div style={{ 
        padding: '15px', 
        background: prefersReducedMotion ? '#ffebee' : '#e8f5e9',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          Status: {prefersReducedMotion ? '⚠️ Reduced Motion Enabled' : '✅ Normal Motion'}
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
          Hook returns: <code>{String(prefersReducedMotion)}</code>
        </p>
      </div>

      <div>
        <p>Hover over the box below to see the animation:</p>
        <div 
          style={boxStyle}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
          }}
        />
        <p style={{ fontSize: '14px', color: '#666' }}>
          {prefersReducedMotion 
            ? 'Animation duration: 50ms (reduced)' 
            : 'Animation duration: 500ms (normal)'}
        </p>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        background: '#fff3cd',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>How to test:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>Windows:</strong> Settings → Accessibility → Visual effects → Animation effects (turn off)</li>
          <li><strong>macOS:</strong> System Preferences → Accessibility → Display → Reduce motion (check)</li>
          <li><strong>Linux:</strong> Settings → Accessibility → Reduce animation</li>
        </ul>
      </div>
    </div>
  );
}

export default ReducedMotionDemo;
