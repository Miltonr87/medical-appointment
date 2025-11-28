import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCurrentStep } from '../useCurrentStep';

const mockSetCurrentStep = vi.fn();

vi.mock('@/store/appointmentStore', () => ({
  useAppointmentStore: (selector: any) =>
    selector({
      currentStep: 2,
      setCurrentStep: mockSetCurrentStep,
    }),
}));

describe('useCurrentStep', () => {
  beforeEach(() => {
    mockSetCurrentStep.mockClear();
  });

  it('returns current step from store', () => {
    const { result } = renderHook(() => useCurrentStep());

    expect(result.current.currentStep).toBe(2);
  });

  it('calls setCurrentStep when invoked', () => {
    const { result } = renderHook(() => useCurrentStep());

    act(() => {
      result.current.setCurrentStep(3);
    });

    expect(mockSetCurrentStep).toHaveBeenCalledWith(3);
  });
});
