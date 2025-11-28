import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const storeState = {
    date: null,
    time: null,
    clinic: null,
    setScheduling: vi.fn(),
};

vi.mock('@/store/appointmentStore', () => ({
    useAppointmentStore: (selector: any) => selector(storeState),
}));

const mockGetClinics = vi.fn();

vi.mock('@/lib/mockApi', () => ({
    mockApi: {
        getClinics: () => mockGetClinics(),
    },
}));

import { useSchedulingStep } from '../useSchedulingStep';

describe('useSchedulingStep', () => {
    beforeEach(() => {
        // Reset store state
        storeState.date = null;
        storeState.time = null;
        storeState.clinic = null;
        storeState.setScheduling.mockReset();
        // Reset API mock
        mockGetClinics.mockReset();
        mockGetClinics.mockResolvedValue([]);
    });

    it('initializes with default values', () => {
        const { result } = renderHook(() => useSchedulingStep());
        expect(result.current.date).toBeNull();
        expect(result.current.time).toBeNull();
        expect(result.current.clinic).toBeNull();
        expect(result.current.clinics).toEqual([]);
        expect(result.current.loadingClinics).toBe(false);
        expect(result.current.selectedClinic).toBeUndefined();
    });

    it('loads clinics when date and time are provided', async () => {
        const fakeClinics = [
            { id: '1', name: 'Clinic A', address: 'x', price: 100 },
            { id: '2', name: 'Clinic B', address: 'y', price: 200 },
        ];
        mockGetClinics.mockResolvedValue(fakeClinics);
        const { result } = renderHook(() => useSchedulingStep());
        await act(async () => {
            await result.current.loadClinics('2024-01-01', '10:00');
        });
        expect(result.current.loadingClinics).toBe(false);
        expect(result.current.clinics).toEqual(fakeClinics);
    });

    it('does NOT load clinics if date OR time is missing', async () => {
        const { result } = renderHook(() => useSchedulingStep());
        await act(async () => {
            await result.current.loadClinics('', '10:00');
        });
        expect(mockGetClinics).not.toHaveBeenCalled();
        expect(result.current.clinics).toEqual([]);
    });

    it('updateSelectedClinic sets selected clinic by id', async () => {
        const clinics = [
            { id: '99', name: 'Test Clinic', address: 'z', price: 150 },
        ];
        mockGetClinics.mockResolvedValue(clinics);
        const { result } = renderHook(() => useSchedulingStep());
        await act(async () => {
            await result.current.loadClinics('2024-01-01', '10:00');
        });
        act(() => {
            result.current.updateSelectedClinic('99');
        });
        expect(result.current.selectedClinic).toEqual(clinics[0]);
    });

    it('handleContinue sends scheduling info to store', () => {
        const { result } = renderHook(() => useSchedulingStep());
        const fakeClinic = {
            id: '1',
            name: 'Clinic Test',
            address: 'x',
            price: 200,
        };
        act(() => {
            result.current.handleContinue('2024-01-01', '09:00', fakeClinic, () => { });
        });
        expect(storeState.setScheduling).toHaveBeenCalledTimes(1);
        const args = storeState.setScheduling.mock.calls[0];
        expect(args[0] instanceof Date).toBe(true);
        expect(args[1]).toBe('09:00');
        expect(args[2]).toEqual(fakeClinic);
    });
});
