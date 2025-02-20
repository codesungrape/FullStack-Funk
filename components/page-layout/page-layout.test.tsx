// page-layout.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageLayout from './page-layout';
import styles from "./page-layout.module.css"

// Mock the Sidebar component
jest.mock('../sidebar/sidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-sidebar">Mocked Sidebar</div>
}));

describe('PageLayout', () => {
  it('renders children content', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    render(<PageLayout>{testContent}</PageLayout>);
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  it('renders sidebar component', () => {
    render(<PageLayout>Content</PageLayout>);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
  });
  
  it('maintains correct layout structure', () => {
    render(<PageLayout>Content</PageLayout>);
    
    // Get the container and main elements by their class names
    const container = document.querySelector(`.${styles.container}`);
    const main = document.querySelector(`.${styles.main}`);
    
    expect(container).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(main?.parentElement).toBe(container);
  });
  it('renders multiple children correctly', () => {
    const multipleChildren = (
      <>
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
      </>
    );
    
    render(<PageLayout>{multipleChildren}</PageLayout>);
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});