import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from '../page';
const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="mock-image" {...props} />,
}));

describe('Welcome Page', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders headline, description, and image', () => {
    render(<Welcome />);

    expect(
      screen.getByText('Agende sua consulta de forma simples')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Escolha a melhor data, horário e clínica disponível/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId('mock-image')).toBeInTheDocument();
  });

  it("navigates to /appointment when clicking 'Agendar'", () => {
    render(<Welcome />);

    const button = screen.getByRole('button', { name: 'Agendar' });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/appointment');
  });
});
