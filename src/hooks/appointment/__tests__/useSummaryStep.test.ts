import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const storeState = {
    date: null,
    time: null,
    clinic: null,
    doctor: null,
    paymentMethod: null,
    reset: vi.fn(),
};

vi.mock('@/store/appointmentStore', () => ({
    useAppointmentStore: (selector: any) => selector(storeState),
}));

const push = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push,
    }),
}));

const toastMock = vi.fn();

vi.mock('@/hooks/use-toast', () => ({
    toast: (args: any) => toastMock(args),
}));

const mockConfirm = vi.fn();

vi.mock('@/lib/mockApi', () => ({
    mockApi: {
        confirmAppointment: (payload: any) => mockConfirm(payload),
    },
}));

import { useSummaryStep } from '../useSummaryStep';

describe('useSummaryStep', () => {
    beforeEach(() => {
        storeState.date = null;
        storeState.time = null;
        storeState.clinic = null;
        storeState.doctor = null;
        storeState.paymentMethod = null;
        storeState.reset.mockReset();
        push.mockReset();
        toastMock.mockReset();
        mockConfirm.mockReset();
    });

    it('returns isReady = false when fields missing', () => {
        const { result } = renderHook(() => useSummaryStep());
        expect(result.current.isReady).toBe(false);
    });

    it('returns isReady = true when all fields exist', () => {
        storeState.date = '2024-01-01';
        storeState.time = '10:00';
        storeState.clinic = { id: 'c1', name: 'Clinic' };
        storeState.doctor = { id: 'd1', name: 'Dr' };
        storeState.paymentMethod = 'pix';
        const { result } = renderHook(() => useSummaryStep());
        expect(result.current.isReady).toBe(true);
    });

    it('does nothing when handleConfirm is called but isReady = false', async () => {
        const { result } = renderHook(() => useSummaryStep());
        await act(async () => {
            await result.current.handleConfirm();
        });
        expect(mockConfirm).not.toHaveBeenCalled();
        expect(push).not.toHaveBeenCalled();
    });

    it('calls API and redirects on success', async () => {
        storeState.date = '2024-01-01';
        storeState.time = '10:00';
        storeState.clinic = { id: 'c1', name: 'Clinic' };
        storeState.doctor = { id: 'd1', name: 'Doctor' };
        storeState.paymentMethod = 'credit-card';
        mockConfirm.mockResolvedValue({ success: true });
        const { result } = renderHook(() => useSummaryStep());
        await act(async () => {
            await result.current.handleConfirm();
        });
        expect(mockConfirm).toHaveBeenCalledWith({
            date: '2024-01-01',
            time: '10:00',
            clinicId: 'c1',
            doctorId: 'd1',
            paymentMethod: 'credit-card',
        });
        expect(push).toHaveBeenCalledWith('/success');
    });

    it('shows toast on API failure', async () => {
        storeState.date = '2024-01-01';
        storeState.time = '10:00';
        storeState.clinic = { id: 'c1' };
        storeState.doctor = { id: 'd1' };
        storeState.paymentMethod = 'cash';
        mockConfirm.mockRejectedValue(new Error('fail'));
        const { result } = renderHook(() => useSummaryStep());
        await act(async () => {
            await result.current.handleConfirm();
        });
        expect(toastMock).toHaveBeenCalledWith({
            title: 'Erro ao confirmar agendamento',
            description: 'Tente novamente mais tarde.',
            variant: 'destructive',
        });
    });

    it('loading state updates correctly', async () => {
        storeState.date = '2024-01-01';
        storeState.time = '10:00';
        storeState.clinic = { id: 'c1' };
        storeState.doctor = { id: 'd1' };
        storeState.paymentMethod = 'pix';
        mockConfirm.mockResolvedValue({ success: true });
        const { result } = renderHook(() => useSummaryStep());
        const start = result.current.loading;
        await act(async () => {
            const promise = result.current.handleConfirm();
            const mid = result.current.loading;
            await promise;
            const end = result.current.loading;
            expect(start).toBe(false);
            expect(mid).toBe(false)
            expect(end).toBe(false);
        });
    });
});
