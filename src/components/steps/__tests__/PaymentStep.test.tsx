import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { PaymentStep } from '../PaymentStep';

vi.mock('@/hooks/appointment/usePaymentStep', () => ({
  usePaymentStep: () => mockHook(),
}));

let mockHook: any;

vi.mock('@/constants/payment-methods', () => ({
  paymentMethods: [
    { id: 'pix', label: 'Pix', icon: () => <div data-testid="icon-pix" /> },
    {
      id: 'credit-card',
      label: 'Cartão de Crédito',
      icon: () => <div data-testid="icon-card" />,
    },
    {
      id: 'cash',
      label: 'Dinheiro',
      icon: () => <div data-testid="icon-cash" />,
    },
  ],
}));

describe('PaymentStep', () => {
  const onContinue = vi.fn();
  const onBack = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders payment methods and disables Continue initially', () => {
    mockHook = vi.fn(() => ({
      selectedMethod: null,
      selectMethod: vi.fn(),
      handleContinue: vi.fn(),
    }));
    render(<PaymentStep onContinue={onContinue} onBack={onBack} />);
    // All methods should be rendered
    expect(screen.getByText('Pix')).toBeInTheDocument();
    expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument();
    expect(screen.getByText('Dinheiro')).toBeInTheDocument();
    // Continue should be disabled
    const continueButton = screen.getByRole('button', { name: 'Continuar' });
    expect(continueButton).toBeDisabled();
  });

  it('selects a method when clicked', () => {
    const selectMethod = vi.fn();
    mockHook = vi.fn(() => ({
      selectedMethod: null,
      selectMethod,
      handleContinue: vi.fn(),
    }));
    render(<PaymentStep onContinue={onContinue} onBack={onBack} />);
    const pixButton = screen.getByText('Pix');
    fireEvent.click(pixButton);
    expect(selectMethod).toHaveBeenCalledWith('pix');
  });

  it('enables Continue when a method is selected and triggers handleContinue', () => {
    const handleContinue = vi.fn();

    mockHook = vi.fn(() => ({
      selectedMethod: 'pix',
      selectMethod: vi.fn(),
      handleContinue,
    }));
    render(<PaymentStep onContinue={onContinue} onBack={onBack} />);
    const continueBtn = screen.getByRole('button', { name: 'Continuar' });
    expect(continueBtn).not.toBeDisabled();
    fireEvent.click(continueBtn);
    expect(handleContinue).toHaveBeenCalledWith(onContinue);
  });

  it("triggers onBack when clicking 'Voltar'", () => {
    mockHook = vi.fn(() => ({
      selectedMethod: null,
      selectMethod: vi.fn(),
      handleContinue: vi.fn(),
    }));
    render(<PaymentStep onContinue={onContinue} onBack={onBack} />);
    const backButton = screen.getByRole('button', { name: 'Voltar' });
    fireEvent.click(backButton);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
