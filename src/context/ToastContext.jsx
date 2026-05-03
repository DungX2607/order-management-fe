import { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext(null);

/**
 * Toast Provider component
 * Wraps the application and provides toast functionality to all children
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function ToastProvider({ children }) {
  const { toasts, showToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Custom hook to access toast functionality
 * @returns {Object} { showToast }
 */
export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}
