import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SchedulingStep } from '../SchedulingStep';

let mockUseForm: any;
let mockHook: any;

const loadClinics = vi.fn();
const updateSelectedClinic = vi.fn();
const handleContinue = vi.fn();

vi.mock('@/hooks/appointment/useSchedulingStep', () => ({
  useSchedulingStep: () => mockHook(),
}));

vi.mock('react-hook-form', () => ({
  useForm: () => mockUseForm(),
}));

vi.mock('@phosphor-icons/react', () => ({
  CalendarBlankIcon: (props: any) => (
    <div data-testid="calendar-icon" {...props} />
  ),
  ClockIcon: (props: any) => <div data-testid="clock-icon" {...props} />,
  MapPinIcon: (props: any) => <div data-testid="pin-icon" {...props} />,
  CircleNotchIcon: (props: any) => (
    <div data-testid="loading-icon" {...props} />
  ),
}));

describe('SchedulingStep', () => {
  const onContinue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --------------------------------------------------------------
  // 1) LOADING STATE
  // --------------------------------------------------------------
  it('shows loading spinner when clinics are loading', () => {
    mockHook = vi.fn(() => ({
      date: '2025-12-01',
      time: '09:00',
      clinics: [],
      selectedClinic: null,
      loadingClinics: true,
      loadClinics,
      updateSelectedClinic,
      handleContinue,
    }));
    mockUseForm = vi.fn(() => ({
      register: vi.fn(),
      // IMPORTANT: return values for loading state
      watch: vi.fn((field) => {
        if (field === 'date') return '2025-12-01';
        if (field === 'time') return '09:00';
        return '';
      }),
      setValue: vi.fn(),
      formState: { errors: {}, isValid: false },
    }));
    render(<SchedulingStep onContinue={onContinue} />);
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Aguarde\.\.\. estamos buscando as clínicas disponíveis/i
      )
    ).toBeInTheDocument();
  });

  // --------------------------------------------------------------
  // 2) CLINIC SELECTION
  // --------------------------------------------------------------
  it('selects a clinic when clicked', () => {
    const setValue = vi.fn();
    mockHook = vi.fn(() => ({
      date: '2025-12-01',
      time: '09:00',
      clinics: [
        {
          id: 'clinic-1',
          name: 'Clínica Central',
          image: 'img',
          distance: '1km',
          address: 'Rua X',
        },
      ],
      selectedClinic: null,
      loadingClinics: false,
      loadClinics,
      updateSelectedClinic,
      handleContinue,
    }));
    mockUseForm = vi.fn(() => ({
      register: vi.fn(),
      // IMPORTANT: return values for rendering clinics
      watch: vi.fn((field) => {
        if (field === 'date') return '2025-12-01';
        if (field === 'time') return '09:00';
        if (field === 'clinicId') return '';
        return '';
      }),
      setValue,
      formState: { errors: {}, isValid: false },
    }));
    render(<SchedulingStep onContinue={onContinue} />);
    const clinicBtn = screen.getByText('Clínica Central');
    fireEvent.click(clinicBtn);
    expect(setValue).toHaveBeenCalledWith('clinicId', 'clinic-1', {
      shouldValidate: true,
    });
  });

  // --------------------------------------------------------------
  // 3) DISABLE/ENABLE CONTINUE BUTTON
  // --------------------------------------------------------------
  it('disables Continue when invalid and enables when valid', () => {
    mockHook = vi.fn(() => ({
      date: '2025-12-01',
      time: '10:00',
      clinics: [],
      selectedClinic: null,
      loadingClinics: false,
      loadClinics,
      updateSelectedClinic,
      handleContinue,
    }));

    // First render INVALID form
    mockUseForm = vi.fn(() => ({
      register: vi.fn(),
      watch: vi.fn(),
      setValue: vi.fn(),
      formState: { errors: {}, isValid: false },
    }));
    const { rerender } = render(<SchedulingStep onContinue={onContinue} />);
    const continueBtn = screen.getByRole('button', { name: 'Continuar' });
    expect(continueBtn).toBeDisabled();
    mockUseForm = vi.fn(() => ({
      register: vi.fn(),
      watch: vi.fn(),
      setValue: vi.fn(),
      formState: { errors: {}, isValid: true },
    }));
    rerender(<SchedulingStep onContinue={onContinue} />);
    expect(continueBtn).not.toBeDisabled();
  });

  // --------------------------------------------------------------
  // 4) HANDLE CONTINUE
  // --------------------------------------------------------------
  it('calls handleContinue with correct arguments', () => {
    mockHook = vi.fn(() => ({
      date: '2025-12-01',
      time: '08:00',
      clinics: [],
      selectedClinic: { id: 'clinic-1' },
      loadingClinics: false,
      loadClinics,
      updateSelectedClinic,
      handleContinue,
    }));
    mockUseForm = vi.fn(() => ({
      register: vi.fn(),
      watch: vi.fn().mockImplementation((field: string) => {
        if (field === 'date') return '2025-12-01';
        if (field === 'time') return '08:00';
        if (field === 'clinicId') return 'clinic-1';
      }),
      setValue: vi.fn(),
      formState: { errors: {}, isValid: true },
    }));
    render(<SchedulingStep onContinue={onContinue} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(handleContinue).toHaveBeenCalledWith(
      '2025-12-01',
      '08:00',
      { id: 'clinic-1' },
      onContinue
    );
  });
});
