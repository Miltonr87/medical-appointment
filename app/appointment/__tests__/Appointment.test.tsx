import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Appointment from '../page';

vi.mock('@/hooks/appointment/useCurrentStep', () => ({
  useCurrentStep: vi.fn(),
}));

import { useCurrentStep } from '@/hooks/appointment/useCurrentStep';

vi.mock('@/components/Sidebar', () => ({
  Sidebar: ({ currentStep }: { currentStep: number }) => (
    <div data-testid="sidebar">Sidebar step {currentStep}</div>
  ),
}));

vi.mock('@/components/steps/SchedulingStep', () => ({
  SchedulingStep: () => (
    <div data-testid="scheduling-step">Scheduling Step</div>
  ),
}));

vi.mock('@/components/steps/DoctorStep', () => ({
  DoctorStep: () => <div data-testid="doctor-step">Doctor Step</div>,
}));

vi.mock('@/components/steps/PaymentStep', () => ({
  PaymentStep: () => <div data-testid="payment-step">Payment Step</div>,
}));

vi.mock('@/components/steps/SummaryStep', () => ({
  SummaryStep: () => <div data-testid="summary-step">Summary Step</div>,
}));

const mockedUseCurrentStep = useCurrentStep as unknown as ReturnType<
  typeof vi.fn
>;

describe('Appointment Page', () => {
  it('renders SchedulingStep when currentStep = 1', () => {
    mockedUseCurrentStep.mockReturnValue({
      currentStep: 1,
      setCurrentStep: vi.fn(),
    });

    render(<Appointment />);

    expect(screen.getByTestId('scheduling-step')).toBeInTheDocument();
    expect(screen.queryByTestId('doctor-step')).not.toBeInTheDocument();
    expect(screen.queryByTestId('payment-step')).not.toBeInTheDocument();
    expect(screen.queryByTestId('summary-step')).not.toBeInTheDocument();
  });

  it('renders DoctorStep when currentStep = 2', () => {
    mockedUseCurrentStep.mockReturnValue({
      currentStep: 2,
      setCurrentStep: vi.fn(),
    });

    render(<Appointment />);
    expect(screen.getByTestId('doctor-step')).toBeInTheDocument();
  });

  it('renders PaymentStep when currentStep = 3', () => {
    mockedUseCurrentStep.mockReturnValue({
      currentStep: 3,
      setCurrentStep: vi.fn(),
    });

    render(<Appointment />);
    expect(screen.getByTestId('payment-step')).toBeInTheDocument();
  });

  it('renders SummaryStep when currentStep = 4', () => {
    mockedUseCurrentStep.mockReturnValue({
      currentStep: 4,
      setCurrentStep: vi.fn(),
    });

    render(<Appointment />);
    expect(screen.getByTestId('summary-step')).toBeInTheDocument();
  });
});
