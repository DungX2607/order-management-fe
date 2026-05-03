import { useEffect, useState } from 'react';
import '../styles/animations.css';

/**
 * Toast notification component
 * Displays temporary notifications at the bottom center of the screen
 * Auto-dismisses after 3000ms
 * 
 * @param {Object} props
 * @param {string} props.message - The message to display
 * @param {string} props.type - The type of toast: 'success' or 'error'
 * @param {Function} props.onClose - Callback when toast is dismissed
 */
function Toast({ message, type = 'success', onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 3000ms
    const dismissTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Call onClose after exit animation completes (300ms)
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3300);

    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}
      onClick={handleClick}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' ? '✓' : '✕'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
