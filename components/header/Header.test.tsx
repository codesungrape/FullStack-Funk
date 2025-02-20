/* eslint-disable react/display-name */
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
  it('renders the theme toggle button with correct icon', () => {
    const mockUseTheme = require('../../app/providers/theme-provider').useTheme;
    
    mockUseTheme.mockImplementation(() => ({
      theme: 'light',
      toggleTheme: jest.fn()
    }));
    
    render(<Header />);
    expect(screen.getByRole('button', { name: /Toggle theme/i })).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
  it('calls toggleTheme when theme button is clicked', () => {
    const toggleTheme = jest.fn();
    const mockUseTheme = require('../../app/providers/theme-provider').useTheme;
    mockUseTheme.mockImplementation(() => ({
      theme: 'light',
      toggleTheme
    }));

    render(<Header />);
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeButton);
    expect(toggleTheme).toHaveBeenCalled();
  });
  it('renders the Sign In button', () => {
    render(<Header />);
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.tagName).toBe('BUTTON');
  });
  it('switches between Moon and Sun icons based on theme', () => {
    const mockUseTheme = require('../../app/providers/theme-provider').useTheme;
    
    // Test light theme (Moon icon)
    mockUseTheme.mockImplementation(() => ({
      theme: 'light',
      toggleTheme: jest.fn()
    }));
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();
    
    // Test dark theme (Sun icon)
    mockUseTheme.mockImplementation(() => ({
      theme: 'dark',
      toggleTheme: jest.fn()
    }));
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});