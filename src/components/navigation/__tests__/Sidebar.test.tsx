import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Sidebar } from '../Sidebar';

vi.mock('@phosphor-icons/react', () => ({
  UserIcon: (props: any) => <div data-testid="user-icon" {...props} />,
  CalendarIcon: (props: any) => <div data-testid="calendar-icon" {...props} />,
  StethoscopeIcon: (props: any) => <div data-testid="doctor-icon" {...props} />,
  CreditCardIcon: (props: any) => <div data-testid="payment-icon" {...props} />,
  FileTextIcon: (props: any) => <div data-testid="summary-icon" {...props} />,
}));

describe('Sidebar', () => {
  it('renders all steps', () => {
    render(<Sidebar currentStep={1} />);
    expect(screen.getByText('Agendamento')).toBeInTheDocument();
    expect(screen.getByText('Médico')).toBeInTheDocument();
    expect(screen.getByText('Forma de Pagamento')).toBeInTheDocument();
    expect(screen.getByText('Resumo')).toBeInTheDocument();
  });

  it('highlights the current active step', () => {
    render(<Sidebar currentStep={2} />);
    const activeStep = screen.getByText('Médico');
    expect(activeStep.className).toContain('text-primary');
    expect(activeStep.className).toContain('font-semibold');
  });

  it('marks previous steps as completed', () => {
    render(<Sidebar currentStep={3} />);
    const calendarIcon = screen.getByTestId('calendar-icon');
    expect(calendarIcon.parentElement?.className).toContain('bg-primary');
    const doctorIcon = screen.getByTestId('doctor-icon');
    expect(doctorIcon.parentElement?.className).toContain('bg-primary');
  });

  it('marks upcoming steps as inactive', () => {
    render(<Sidebar currentStep={1} />);
    const doctorIcon = screen.getByTestId('doctor-icon');
    expect(doctorIcon.parentElement?.className).toContain('bg-muted');
  });

  it('renders the user info section', () => {
    render(<Sidebar currentStep={1} />);
    expect(screen.getByText('Bem-vindo')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });
});
