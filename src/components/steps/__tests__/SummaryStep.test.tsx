import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@phosphor-icons/react', () => ({
  CalendarBlankIcon: (props: any) => (
    <div data-testid="calendar-icon" {...props} />
  ),
  UserCircleIcon: (props: any) => <div data-testid="user-icon" {...props} />,
  MapPinIcon: (props: any) => <div data-testid="map-icon" {...props} />,
  CreditCardIcon: (props: any) => <div data-testid="payment-icon" {...props} />,
  CircleNotchIcon: (props: any) => (
    <div data-testid="loading-icon" {...props} />
  ),
}));

vi.mock('@/utils/format-date', () => ({
  formatDate: () => ({ formatted: '10 de Julho', dayOfWeek: 'Quarta-feira' }),
}));

vi.mock('@/utils/format-price', () => ({
  formatPrice: (value: number) => `R$ ${value}`,
}));

const mockHandleConfirm = vi.fn();

// default hook mock (used in most tests)
vi.mock('@/hooks/appointment/useSummaryStep', () => ({
  useSummaryStep: () => ({
    date: '2025-07-10',
    time: '14:00',
    clinic: { name: 'Clínica Central' },
    doctor: { name: 'Dra. Ana Souza', price: 200 },
    paymentMethod: 'pix',
    isReady: true,
    loading: false,
    handleConfirm: mockHandleConfirm,
  }),
}));

describe('SummaryStep', () => {
  it('renders all summary information correctly', async () => {
    const { SummaryStep } = await import('../SummaryStep');
    render(<SummaryStep onBack={vi.fn()} />);
    expect(
      screen.getByText('John, aqui está o resumo da sua consulta')
    ).toBeInTheDocument();
    expect(
      screen.getByText('10 de Julho, Quarta-feira às 14:00.')
    ).toBeInTheDocument();
    expect(screen.getByText('Dra. Ana Souza.')).toBeInTheDocument();
    expect(screen.getByText(/Clínica Central/)).toBeInTheDocument();
    expect(screen.getByText('R$ 200')).toBeInTheDocument();
    expect(screen.getByText(/pix/i)).toBeInTheDocument();
  });

  it('calls onBack when clicking "Voltar"', async () => {
    const { SummaryStep } = await import('../SummaryStep');
    const onBack = vi.fn();
    render(<SummaryStep onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls handleConfirm when clicking "Confirmar"', async () => {
    const { SummaryStep } = await import('../SummaryStep');
    render(<SummaryStep onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });

  it('shows loading spinner when loading=true', async () => {
    vi.doMock('@/hooks/appointment/useSummaryStep', () => ({
      useSummaryStep: () => ({
        date: '2025-07-10',
        time: '14:00',
        clinic: { name: 'Clínica Central' },
        doctor: { name: 'Dra. Ana Souza', price: 200 },
        paymentMethod: 'pix',
        isReady: true,
        loading: true,
        handleConfirm: mockHandleConfirm,
      }),
    }));
    vi.resetModules();
    const { SummaryStep: SummaryStepWithLoading } = await import(
      '../SummaryStep'
    );
    render(<SummaryStepWithLoading onBack={vi.fn()} />);
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    expect(screen.getByText('Aguarde...')).toBeInTheDocument();
  });

  it('returns null when isReady=false', async () => {
    vi.doMock('@/hooks/appointment/useSummaryStep', () => ({
      useSummaryStep: () => ({
        isReady: false,
      }),
    }));
    vi.resetModules();
    const { SummaryStep: SummaryStepNotReady } = await import('../SummaryStep');
    const { container } = render(<SummaryStepNotReady onBack={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
