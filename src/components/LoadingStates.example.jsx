import React, { useState } from 'react';
import LoadingTransition, { LoadingButton, LoadingOverlay, LoadingSpinner } from './LoadingTransition';
import SkeletonLoader, { SkeletonCard, SkeletonTable } from './SkeletonLoader';
import '../styles/skeleton.css';
import '../styles/animations.css';

/**
 * LoadingStates Example Component
 * 
 * Demonstrates all loading state animations:
 * - Skeleton loaders (card, table, text)
 * - Enhanced spinners (various sizes and colors)
 * - Loading buttons
 * - Loading transitions (skeleton to content)
 * - Loading overlays
 */
function LoadingStatesExample() {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const handleOverlayClick = () => {
    setOverlayLoading(true);
    setTimeout(() => setOverlayLoading(false), 3000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Loading State Animations Demo</h1>
      
      {/* Section 1: Skeleton Loaders */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>1. Skeleton Loaders</h2>
        
        <h3>Basic Skeleton Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <p>Text Skeleton:</p>
            <SkeletonLoader variant="text" width="200px" />
          </div>
          <div>
            <p>Circle Skeleton:</p>
            <SkeletonLoader variant="circle" width="60px" height="60px" />
          </div>
          <div>
            <p>Rectangle Skeleton:</p>
            <SkeletonLoader variant="rectangle" width="120px" height="40px" />
          </div>
        </div>

        <h3>Multiple Text Lines</h3>
        <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
          <SkeletonLoader variant="text" count={5} />
        </div>

        <h3>Skeleton Card</h3>
        <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
          <SkeletonCard showHeader={true} lines={4} showFooter={true} />
        </div>

        <h3>Skeleton Table</h3>
        <div style={{ marginBottom: '2rem' }}>
          <SkeletonTable rows={5} columns={4} />
        </div>
      </section>

      {/* Section 2: Enhanced Spinners */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>2. Enhanced Spinners</h2>
        
        <h3>Spinner Sizes</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <p>Small:</p>
            <LoadingSpinner size="small" />
          </div>
          <div>
            <p>Medium:</p>
            <LoadingSpinner size="medium" />
          </div>
          <div>
            <p>Large:</p>
            <LoadingSpinner size="large" />
          </div>
        </div>

        <h3>Spinner Colors</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <p>Primary:</p>
            <LoadingSpinner color="primary" />
          </div>
          <div style={{ background: '#333', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: 'white' }}>White:</p>
            <LoadingSpinner color="white" />
          </div>
          <div>
            <p>Danger:</p>
            <LoadingSpinner color="danger" />
          </div>
        </div>

        <h3>Centered Spinner</h3>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '2rem' }}>
          <LoadingSpinner centered />
        </div>

        <h3>Inline Spinner</h3>
        <p>
          Loading data <LoadingSpinner size="small" inline /> please wait...
        </p>
      </section>

      {/* Section 3: Loading Buttons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>3. Loading Buttons</h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <LoadingButton isLoading={buttonLoading} onClick={handleButtonClick}>
            Click Me
          </LoadingButton>
          
          <LoadingButton 
            isLoading={buttonLoading} 
            showText={true}
            loadingText="Processing..."
            onClick={handleButtonClick}
            className="btn-secondary"
          >
            With Text
          </LoadingButton>
          
          <LoadingButton isLoading={true}>
            Always Loading
          </LoadingButton>
        </div>
      </section>

      {/* Section 4: Loading Transitions */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>4. Loading Transitions (Skeleton → Content)</h2>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button className="btn" onClick={() => setIsLoading1(!isLoading1)}>
            Toggle Card Loading
          </button>
          <button className="btn" onClick={() => setIsLoading2(!isLoading2)}>
            Toggle Table Loading
          </button>
          <button className="btn" onClick={() => setIsLoading3(!isLoading3)}>
            Toggle Text Loading
          </button>
        </div>

        <h3>Card Transition</h3>
        <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
          <LoadingTransition 
            isLoading={isLoading1}
            skeletonType="card"
            skeletonProps={{ showHeader: true, lines: 3, showFooter: true }}
          >
            <div className="card">
              <h3>Loaded Content</h3>
              <p>This is the actual content that appears after loading.</p>
              <p>The skeleton smoothly fades out and this content fades in.</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn">Action</button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </LoadingTransition>
        </div>

        <h3>Table Transition</h3>
        <div style={{ marginBottom: '2rem' }}>
          <LoadingTransition 
            isLoading={isLoading2}
            skeletonType="table"
            skeletonProps={{ rows: 5, columns: 4 }}
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>User</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Bob Johnson</td>
                  <td>bob@example.com</td>
                  <td>User</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </table>
          </LoadingTransition>
        </div>

        <h3>Text Transition</h3>
        <div style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          <LoadingTransition 
            isLoading={isLoading3}
            skeletonType="text"
            skeletonProps={{ count: 4 }}
          >
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
            </div>
          </LoadingTransition>
        </div>
      </section>

      {/* Section 5: Loading Overlay */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>5. Loading Overlay</h2>
        
        <button className="btn" onClick={handleOverlayClick}>
          Show Loading Overlay (3s)
        </button>
        
        <div style={{ position: 'relative', marginTop: '2rem', minHeight: '200px', border: '1px solid #ddd', borderRadius: '8px', padding: '2rem' }}>
          <h3>Container with Overlay</h3>
          <p>This content will be covered by the loading overlay.</p>
          <LoadingOverlay isLoading={overlayLoading} text="Loading data..." />
        </div>
      </section>

      {/* Section 6: Loading Dots Alternative */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>6. Loading Dots (Alternative)</h2>
        
        <div className="loading-dots">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
      </section>
    </div>
  );
}

export default LoadingStatesExample;
