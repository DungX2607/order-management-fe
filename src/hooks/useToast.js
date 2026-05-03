import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 * Provides a showToast function to display success/error messages
 * Manages toast queue and auto-dismiss timing
 * 
 * @returns {Object} { toasts, showToast }
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast: 'success' or 'error'
   */
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random(); // Unique ID for each toast
    
    const newToast = {
      id,
      message,
      type,
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  /**
   * Remove a toast from the queue
   * @param {number} id - The ID of the toast to remove
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
}
