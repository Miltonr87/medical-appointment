import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-font',
  }),
}));

vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: any) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
}));

vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

describe('RootLayout', () => {
  it('renders children inside TooltipProvider and includes Toaster', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('applies Inter font class to body', () => {
    render(
      <RootLayout>
        <div></div>
      </RootLayout>
    );

    expect(document.body.className).toContain('mocked-inter-font');
  });
});
