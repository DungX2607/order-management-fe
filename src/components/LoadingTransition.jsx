import React, { useEffect, useState } from 'react';
import SkeletonLoader, { SkeletonCard, SkeletonTable } from './SkeletonLoader';
import '../styles/skeleton.css';

/**
 * LoadingTransition Component
 * 
 * Manages smooth transitions between loading skeleton and actual content.
 * Fades out skeleton and fades in content with proper timing.
 * 
 * **Validates: Requirements 4.5**
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether content is currently loading
 * @param {React.ReactNode} props.children - Actual content to display when loaded
 * @param {React.ReactNode} props.skeleton - Custom skeleton component (optional)
 * @param {'card'|'table'|'text'|'custom'} props.skeletonType - Type of skeleton to show
 * @param {Object} props.skeletonProps - Props to pass to skeleton component
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.minLoadingTime - Minimum time to show skeleton (ms)
 */
function LoadingTransition({
  isLoading,
  children,
  skeleton,
  skeletonType = 'card',
  skeletonProps = {},
  className = '',
  minLoadingTime = 0
}) {
  const [showSkeleton, setShowSkeleton] = useState(isLoading);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      setHasLoaded(false);
    } else {
      // Ensure minimum loading time if specified
      if (minLoadingTime > 0) {
        const timer = setTimeout(() => {
          setHasLoaded(true);
        }, minLoadingTime);
        return () => clearTimeout(timer);
      } else {
        setHasLoaded(true);
      }
    }
  }, [isLoading, minLoadingTime]);

  // Render custom skeleton if provided
  const renderSkeleton = () => {
    if (skeleton) {
      return skeleton;
    }

    // Render default skeleton based on type
    switch (skeletonType) {
      case 'card':
        return <SkeletonCard {...skeletonProps} />;
      case 'table':
        return <SkeletonTable {...skeletonProps} />;
      case 'text':
        return <SkeletonLoader variant="text" {...skeletonProps} />;
      default:
        return <SkeletonLoader {...skeletonProps} />;
    }
  };

  const containerClass = `loading-container ${
    isLoading ? 'is-loading' : hasLoaded ? 'is-loaded' : ''
  } ${className}`.trim();

  return (
    <div className={containerClass}>
      {showSkeleton && (
        <div className="skeleton-layer">
          {renderSkeleton()}
        </div>
      )}
      <div className="content-layer">
        {children}
      </div>
    </div>
  );
}

/**
 * LoadingButton Component
 * 
 * Button with integrated loading state and spinner.
 * 
 * **Validates: Requirements 4.3, 4.4**
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether button is in loading state
 * @param {React.ReactNode} props.children - Button text/content
 * @param {boolean} props.showText - Show text while loading
 * @param {string} props.loadingText - Text to show while loading
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 */
export function LoadingButton({
  isLoading = false,
  children,
  showText = false,
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  const buttonClass = `btn ${
    isLoading 
      ? showText 
        ? 'btn-loading-with-text' 
        : 'btn-loading'
      : ''
  } ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading && showText ? loadingText : children}
    </button>
  );
}

/**
 * LoadingOverlay Component
 * 
 * Full-screen or container overlay with spinner.
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether to show overlay
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.fixed - Use fixed positioning (full-screen)
 * @param {'spinner'|'dots'} props.type - Type of loading indicator
 */
export function LoadingOverlay({
  isLoading,
  text = '',
  fixed = false,
  type = 'spinner'
}) {
  if (!isLoading) return null;

  const overlayClass = `loading-overlay ${fixed ? 'loading-overlay-fixed' : ''}`;

  return (
    <div className={overlayClass}>
      <div>
        {type === 'spinner' ? (
          <div className="spinner spinner-medium spinner-primary" />
        ) : (
          <div className="loading-dots">
            <div className="loading-dot" />
            <div className="loading-dot" />
            <div className="loading-dot" />
          </div>
        )}
        {text && <div className="loading-text">{text}</div>}
      </div>
    </div>
  );
}

/**
 * LoadingSpinner Component
 * 
 * Standalone spinner component with various sizes and colors.
 * 
 * @param {Object} props
 * @param {'small'|'medium'|'large'} props.size - Spinner size
 * @param {'primary'|'white'|'danger'} props.color - Spinner color
 * @param {boolean} props.inline - Display inline
 * @param {boolean} props.centered - Center in container
 * @param {string} props.className - Additional CSS classes
 */
export function LoadingSpinner({
  size = 'medium',
  color = 'primary',
  inline = false,
  centered = false,
  className = ''
}) {
  const spinnerClass = `spinner spinner-${size} spinner-${color} ${
    inline ? 'spinner-inline' : ''
  } ${className}`.trim();

  if (centered) {
    return (
      <div className="loading-spinner-container">
        <div className={spinnerClass} />
      </div>
    );
  }

  return <div className={spinnerClass} />;
}

export default LoadingTransition;
