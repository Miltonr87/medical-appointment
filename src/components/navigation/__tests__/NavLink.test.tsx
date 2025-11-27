import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { NavLink } from '../NavLink';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('NavLink', () => {
  it('renders children correctly', () => {
    render(
      <NavLink href="/dashboard" className="link">
        Dashboard
      </NavLink>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('applies activeClassName when the link is active', () => {
    render(
      <NavLink href="/dashboard" className="default" activeClassName="active">
        Dashboard
      </NavLink>
    );

    const link = screen.getByText('Dashboard');
    expect(link.className).toContain('active');
  });

  it('does NOT apply activeClassName when link is not active', () => {
    render(
      <NavLink href="/settings" className="default" activeClassName="active">
        Settings
      </NavLink>
    );

    const link = screen.getByText('Settings');
    expect(link.className).not.toContain('active');
  });
});
