import React from 'react';
import '../styles/skeleton.css';

/**
 * SkeletonLoader Component
 * 
 * Displays a shimmer loading animation as a placeholder for content being loaded.
 * Supports different shapes and sizes for various use cases.
 * 
 * **Validates: Requirements 4.1, 4.2**
 * 
 * @param {Object} props
 * @param {'card'|'text'|'circle'|'rectangle'} props.variant - Shape of the skeleton
 * @param {string} props.width - Width of the skeleton (CSS value)
 * @param {string} props.height - Height of the skeleton (CSS value)
 * @param {number} props.count - Number of skeleton elements to render
 * @param {string} props.className - Additional CSS classes
 * @param {React.CSSProperties} props.style - Additional inline styles
 */
function SkeletonLoader({ 
  variant = 'text', 
  width, 
  height, 
  count = 1,
  className = '',
  style = {}
}) {
  const getSkeletonClass = () => {
    const baseClass = 'skeleton';
    const variantClass = `skeleton-${variant}`;
    return `${baseClass} ${variantClass} ${className}`.trim();
  };

  const getSkeletonStyle = () => {
    const baseStyle = { ...style };
    
    if (width) {
      baseStyle.width = width;
    }
    
    if (height) {
      baseStyle.height = height;
    }
    
    return baseStyle;
  };

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className="skeleton-group">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={getSkeletonClass()}
            style={getSkeletonStyle()}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={getSkeletonClass()}
      style={getSkeletonStyle()}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonCard Component
 * 
 * Pre-configured skeleton for card layouts with header, text lines, and optional footer.
 * 
 * @param {Object} props
 * @param {boolean} props.showHeader - Show header skeleton
 * @param {number} props.lines - Number of text lines
 * @param {boolean} props.showFooter - Show footer skeleton
 */
export function SkeletonCard({ showHeader = true, lines = 3, showFooter = false }) {
  return (
    <div className="skeleton-card">
      {showHeader && (
        <div className="skeleton-card-header">
          <SkeletonLoader variant="circle" width="40px" height="40px" />
          <div className="skeleton-card-header-text">
            <SkeletonLoader variant="text" width="60%" height="16px" />
            <SkeletonLoader variant="text" width="40%" height="12px" />
          </div>
        </div>
      )}
      
      <div className="skeleton-card-body">
        <SkeletonLoader variant="text" count={lines} />
      </div>
      
      {showFooter && (
        <div className="skeleton-card-footer">
          <SkeletonLoader variant="rectangle" width="80px" height="32px" />
          <SkeletonLoader variant="rectangle" width="80px" height="32px" />
        </div>
      )}
    </div>
  );
}

/**
 * SkeletonTable Component
 * 
 * Pre-configured skeleton for table layouts.
 * 
 * @param {Object} props
 * @param {number} props.rows - Number of table rows
 * @param {number} props.columns - Number of table columns
 */
export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="skeleton-table">
      {/* Table Header */}
      <div className="skeleton-table-header">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonLoader 
            key={`header-${index}`}
            variant="text" 
            height="16px"
          />
        ))}
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="skeleton-table-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonLoader 
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text" 
              height="14px"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
