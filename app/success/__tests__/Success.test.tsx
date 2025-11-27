import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Success from '../page';

const resetMock = vi.fn();
const pushMock = vi.fn();

// Mock router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock Zustand store
vi.mock('@/store/appointmentStore', () => ({
  useAppointmentStore: (selector: any) =>
    selector({
      reset: resetMock,
    }),
}));

describe('Success Page', () => {
  beforeEach(() => {
    resetMock.mockClear();
    pushMock.mockClear();
  });

  it('should render and handle button click correctly', () => {
    render(<Success />);
    const button = screen.getByRole('button', {
      name: /Ver minhas consultas/i,
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(resetMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
