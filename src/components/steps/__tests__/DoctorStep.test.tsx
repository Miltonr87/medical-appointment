import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DoctorStep } from '../DoctorStep';

const mockUseDoctorStep = vi.hoisted(() => ({
  searchDoctors: [],
  recommendedDoctors: [],
  loadingDoctors: false,
  selectedDoctor: null,
  loadDoctors: vi.fn(),
  setSelectedDoctor: vi.fn(),
  handleContinue: vi.fn(),
}));

vi.mock('@/hooks/appointment/useDoctorStep', () => ({
  useDoctorStep: () => mockUseDoctorStep,
}));

const mockDoctor = {
  id: '1',
  name: 'Dr. João Silva',
  specialty: 'Cardiologista',
  price: 200,
  image: 'doctor.jpg',
};

describe('DoctorStep Component', () => {
  beforeEach(() => {
    Object.assign(mockUseDoctorStep, {
      searchDoctors: [],
      recommendedDoctors: [],
      loadingDoctors: false,
      selectedDoctor: null,
      loadDoctors: vi.fn(),
      setSelectedDoctor: vi.fn(),
      handleContinue: vi.fn(),
    });
  });

  it('renders loading spinner when loadingDoctors = true', () => {
    mockUseDoctorStep.loadingDoctors = true;
    render(<DoctorStep onContinue={() => {}} onBack={() => {}} />);
    expect(screen.getByText('Carregando médicos...')).toBeInTheDocument();
  });

  it('renders doctors in searchDoctors and recommendedDoctors', () => {
    mockUseDoctorStep.searchDoctors = [mockDoctor];
    mockUseDoctorStep.recommendedDoctors = [mockDoctor];
    render(<DoctorStep onContinue={() => {}} onBack={() => {}} />);
    expect(screen.getAllByText(mockDoctor.name).length).toBe(2);
    expect(screen.getAllByText(mockDoctor.specialty).length).toBe(2);
  });

  it('selects a doctor when clicking on a DoctorCard', () => {
    mockUseDoctorStep.searchDoctors = [mockDoctor];
    render(<DoctorStep onContinue={() => {}} onBack={() => {}} />);
    fireEvent.click(screen.getByText(mockDoctor.name));
    expect(mockUseDoctorStep.setSelectedDoctor).toHaveBeenCalledWith(
      mockDoctor
    );
  });

  it("disables the 'Continuar' button if no doctor is selected", () => {
    mockUseDoctorStep.selectedDoctor = null;
    render(<DoctorStep onContinue={() => {}} onBack={() => {}} />);
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
  });

  it("enables 'Continuar' button once a doctor is selected", () => {
    mockUseDoctorStep.selectedDoctor = mockDoctor;
    render(<DoctorStep onContinue={() => {}} onBack={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Continuar' })
    ).not.toBeDisabled();
  });

  it("calls handleContinue with onContinue when clicking on 'Continuar'", () => {
    const onContinue = vi.fn();
    mockUseDoctorStep.selectedDoctor = mockDoctor;
    render(<DoctorStep onContinue={onContinue} onBack={() => {}} />);
    const btn = screen.getByRole('button', { name: 'Continuar' });
    fireEvent.click(btn);
    expect(mockUseDoctorStep.handleContinue).toHaveBeenCalledWith(onContinue);
  });

  it("calls onBack when clicking 'Voltar'", () => {
    const onBack = vi.fn();
    render(<DoctorStep onContinue={() => {}} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
