// Header.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
// import { ThemeProvider } from '../../app/providers/theme-provider';

// Mock the useTheme hook
jest.mock('../../app/providers/theme-provider', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    toggleTheme: jest.fn()
  })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header', () => {
  it('renders the logo with correct link', () => {
    render(<Header />);
    const logo = screen.getByText('Full-stack Funk');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });
});