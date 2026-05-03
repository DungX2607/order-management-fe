import Toast from './Toast';

/**
 * Container component for managing multiple toast notifications
 * Renders all active toasts in a stack at the bottom center
 * 
 * @param {Object} props
 * @param {Array} props.toasts - Array of toast objects with id, message, and type
 * @param {Function} props.onRemove - Callback to remove a toast by id
 */
function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
