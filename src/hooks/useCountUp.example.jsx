import { useCountUp } from './useAnimations';

/**
 * Example: Basic Count-Up Animation
 * Animates a number from 0 to target value
 */
export function BasicCountUpExample() {
  const count = useCountUp(100, 500);

  return (
    <div className="stat-card">
      <div className="stat-number">{Math.round(count)}</div>
      <div className="stat-label">Total Orders</div>
    </div>
  );
}

/**
 * Example: Stat Cards with Count-Up (AdminDashboard use case)
 * Shows how to use useCountUp for multiple stat cards
 */
export function StatCardsExample({ stats }) {
  const animatedTotal = useCountUp(stats.total, 500);
  const animatedPicked = useCountUp(stats.picked, 500);
  const animatedUnpicked = useCountUp(stats.unpicked, 500);

  return (
    <div className="card scale-in stagger-1">
      <h2>Thống kê</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{Math.round(animatedTotal)}</div>
          <div style={styles.statLabel}>Tổng đơn</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{Math.round(animatedPicked)}</div>
          <div style={styles.statLabel}>Đã lấy</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{Math.round(animatedUnpicked)}</div>
          <div style={styles.statLabel}>Chưa lấy</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Example: Custom Duration
 * Use different animation durations for different effects
 */
export function CustomDurationExample() {
  const fastCount = useCountUp(50, 300);   // Fast animation (300ms)
  const normalCount = useCountUp(100, 500); // Normal animation (500ms)
  const slowCount = useCountUp(150, 1000);  // Slow animation (1000ms)

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <div className="stat-number">{Math.round(fastCount)}</div>
        <div className="stat-label">Fast (300ms)</div>
      </div>
      <div>
        <div className="stat-number">{Math.round(normalCount)}</div>
        <div className="stat-label">Normal (500ms)</div>
      </div>
      <div>
        <div className="stat-number">{Math.round(slowCount)}</div>
        <div className="stat-label">Slow (1000ms)</div>
      </div>
    </div>
  );
}

/**
 * Example: Decimal Numbers
 * Show decimal values by not rounding
 */
export function DecimalCountUpExample() {
  const percentage = useCountUp(87.5, 500);

  return (
    <div className="stat-card">
      <div className="stat-number">{percentage.toFixed(1)}%</div>
      <div className="stat-label">Completion Rate</div>
    </div>
  );
}

/**
 * Example: Dynamic Value Updates
 * The animation restarts when the target value changes
 */
export function DynamicValueExample({ currentValue }) {
  // When currentValue changes, the animation restarts from 0
  const animatedValue = useCountUp(currentValue, 500);

  return (
    <div className="stat-card">
      <div className="stat-number">{Math.round(animatedValue)}</div>
      <div className="stat-label">Live Counter</div>
    </div>
  );
}

/**
 * Example: With Reduced Motion Support
 * Combine with useReducedMotion to respect user preferences
 */
export function AccessibleCountUpExample({ value }) {
  const prefersReducedMotion = useReducedMotion();
  
  // Use very short duration or no animation if user prefers reduced motion
  const duration = prefersReducedMotion ? 50 : 500;
  const animatedValue = useCountUp(value, duration);

  return (
    <div className="stat-card">
      <div className="stat-number">{Math.round(animatedValue)}</div>
      <div className="stat-label">Accessible Counter</div>
    </div>
  );
}

/**
 * Example: Currency Formatting
 * Format the animated value as currency
 */
export function CurrencyCountUpExample() {
  const amount = useCountUp(1234.56, 500);

  return (
    <div className="stat-card">
      <div className="stat-number">
        ${amount.toFixed(2)}
      </div>
      <div className="stat-label">Total Revenue</div>
    </div>
  );
}

/**
 * Example: Large Numbers with Formatting
 * Format large numbers with commas
 */
export function FormattedCountUpExample() {
  const count = useCountUp(1234567, 800);
  
  const formattedCount = Math.round(count).toLocaleString('en-US');

  return (
    <div className="stat-card">
      <div className="stat-number">{formattedCount}</div>
      <div className="stat-label">Total Users</div>
    </div>
  );
}

const styles = {
  statCard: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
  },
};
