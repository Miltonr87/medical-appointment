import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const storeState = {
    paymentMethod: null,
    setPaymentMethod: vi.fn(),
};

vi.mock('@/store/appointmentStore', () => ({
    useAppointmentStore: (selector: any) => selector(storeState),
}));

import { usePaymentStep } from '../usePaymentStep';

describe('usePaymentStep', () => {
    beforeEach(() => {
        storeState.paymentMethod = null;
        storeState.setPaymentMethod.mockReset();
    });

    it('initializes with no selected method', () => {
        const { result } = renderHook(() => usePaymentStep());
        expect(result.current.selectedMethod).toBeUndefined();
    });

    it('syncs selectedMethod when store has a value', () => {
        storeState.paymentMethod = 'pix';
        const { result } = renderHook(() => usePaymentStep());
        expect(result.current.selectedMethod).toBe('pix');
    });

    it('selectMethod updates selectedMethod', () => {
        const { result } = renderHook(() => usePaymentStep());
        act(() => {
            result.current.selectMethod('cash');
        });
        expect(result.current.selectedMethod).toBe('cash');
    });

    it('handleContinue does nothing if no method selected', () => {
        const next = vi.fn();
        const { result } = renderHook(() => usePaymentStep());
        act(() => {
            result.current.handleContinue(next);
        });
        expect(storeState.setPaymentMethod).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
