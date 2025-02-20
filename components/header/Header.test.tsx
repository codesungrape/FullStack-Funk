/* eslint-disable react/display-name */
// Header.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import type { ReactNode } from 'react';
import Header from './header';

// Define the type for our mocked useTheme
type UseThemeReturn = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Define the module type
type ThemeModule = {
  useTheme: () => UseThemeReturn;
  ThemeProvider: ({ children }: { children: ReactNode }) => JSX.Element;
};

// Mock the useTheme hook
jest.mock('../../app/providers/theme-provider', (): ThemeModule => ({
    useTheme: jest.fn((): UseThemeReturn => ({
      theme: 'light' as const,
      toggleTheme: jest.fn()
    })),
    ThemeProvider: ({ children }) => <div>{children}</div>
  }));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

describe('Header', () => {
  it('renders the logo with correct link', () => {
    render(<Header />);
    const logo = screen.getByText('Full-stack Funk');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the theme toggle button with correct icon', () => {
    const mockedModule = jest.requireMock('../../app/providers/theme-provider') as ThemeModule;
    
    (mockedModule.useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      toggleTheme: jest.fn()
    }));
    
    render(<Header />);
    expect(screen.getByRole('button', { name: /Toggle theme/i })).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    const toggleTheme = jest.fn();
    const mockedModule = jest.requireMock('../../app/providers/theme-provider') as ThemeModule;
    
    (mockedModule.useTheme as jest.Mock).mockImplementation(() => ({
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
    const mockedModule = jest.requireMock('../../app/providers/theme-provider') as ThemeModule;
    
    // Test light theme (Moon icon)
    (mockedModule.useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      toggleTheme: jest.fn()
    }));
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();

    // Test dark theme (Sun icon)
    (mockedModule.useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'dark',
      toggleTheme: jest.fn()
    }));
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});