import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PageTransition from './PageTransition';

describe('PageTransition Component', () => {
  beforeEach(() => {
    // Reset matchMedia mock before each test
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('should render children correctly', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply fade-in and slide-in-right classes when motion is not reduced', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('page-transition');
    expect(wrapper).toHaveClass('fade-in');
    expect(wrapper).toHaveClass('slide-in-right');
  });

  it('should not apply animation classes when prefers-reduced-motion is enabled', () => {
    // Mock prefers-reduced-motion: reduce
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('page-transition');
    expect(wrapper).not.toHaveClass('fade-in');
    expect(wrapper).not.toHaveClass('slide-in-right');
  });

  it('should set willChange style property when motion is not reduced', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({ willChange: 'opacity, transform' });
  });

  it('should set willChange to auto when prefers-reduced-motion is enabled', () => {
    // Mock prefers-reduced-motion: reduce
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({ willChange: 'auto' });
  });
});
