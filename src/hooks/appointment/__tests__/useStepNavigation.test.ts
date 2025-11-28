import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// -------------------------------------
// ZUSTAND MOCK (STATIC + CORRECT)
// -------------------------------------
const storeState = {
    currentStep: 1,
    setCurrentStep: vi.fn(), // IMPORTANT: do NOT replace this function
};

vi.mock('@/store/appointmentStore', () => ({
    useAppointmentStore: (selector: any) => selector(storeState),
}));

// Hook import must come AFTER mocks
import { useStepNavigation } from '../useStepNavigation';

describe('useStepNavigation', () => {
    beforeEach(() => {
        // Reset store before each test
        storeState.currentStep = 1;
        storeState.setCurrentStep.mockReset(); // The correct reset
    });

    it('returns the current step from store', () => {
        storeState.currentStep = 3;

        const { result } = renderHook(() => useStepNavigation());

        expect(result.current.currentStep).toBe(3);
    });

    it('nextStep increments step', () => {
        storeState.currentStep = 2;

        const { result } = renderHook(() => useStepNavigation());

        act(() => {
            result.current.nextStep();
        });

        expect(storeState.setCurrentStep).toHaveBeenCalledWith(3);
        expect(storeState.setCurrentStep).toHaveBeenCalledTimes(1);
    });

    it('prevStep decrements step', () => {
        storeState.currentStep = 4;

        const { result } = renderHook(() => useStepNavigation());

        act(() => {
            result.current.prevStep();
        });

        expect(storeState.setCurrentStep).toHaveBeenCalledWith(3);
        expect(storeState.setCurrentStep).toHaveBeenCalledTimes(1);
    });

    it('allows manually setting a step', () => {
        const { result } = renderHook(() => useStepNavigation());

        act(() => {
            result.current.setCurrentStep(10);
        });

        expect(storeState.setCurrentStep).toHaveBeenCalledWith(10);
        expect(storeState.setCurrentStep).toHaveBeenCalledTimes(1);
    });
});
