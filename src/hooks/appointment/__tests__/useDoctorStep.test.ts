import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const storeState = {
    doctor: null,
    setDoctor: vi.fn(),
};

vi.mock('@/store/appointmentStore', () => ({
    useAppointmentStore: (selector: any) => selector(storeState),
}));

const mockGetDoctors = vi.fn();

vi.mock('@/lib/mockApi', () => ({
    mockApi: {
        getDoctors: () => mockGetDoctors(),
    },
}));

import { useDoctorStep } from '../useDoctorStep';

describe('useDoctorStep - simplified', () => {
    beforeEach(() => {
        storeState.doctor = null;
        storeState.setDoctor.mockReset();
        mockGetDoctors.mockReset();
        mockGetDoctors.mockResolvedValue({
            search: [],
            recommended: [],
        });
    });

    it('initializes with default state', () => {
        const { result } = renderHook(() => useDoctorStep());
        expect(result.current.doctor).toBeNull();
        expect(result.current.searchDoctors).toEqual([]);
        expect(result.current.recommendedDoctors).toEqual([]);
        expect(result.current.loadingDoctors).toBe(true);
        expect(result.current.selectedDoctor).toBeUndefined();
    });

    it('loads doctors correctly', async () => {
        mockGetDoctors.mockResolvedValue({
            search: [{ id: 1, name: 'Dr. A', price: 100 }],
            recommended: [{ id: 2, name: 'Dr. B', price: 200 }],
        });
        const { result } = renderHook(() => useDoctorStep());
        await act(async () => {
            await result.current.loadDoctors();
        });
        expect(result.current.loadingDoctors).toBe(false);
        expect(result.current.searchDoctors).toEqual([
            { id: 1, name: 'Dr. A', price: 100 },
        ]);
        expect(result.current.recommendedDoctors).toEqual([
            { id: 2, name: 'Dr. B', price: 200 },
        ]);
    });

    it('sets selectedDoctor', () => {
        const { result } = renderHook(() => useDoctorStep());
        const fake = { id: 99, name: 'Dr. Test', price: 150 };
        act(() => {
            result.current.setSelectedDoctor(fake);
        });
        expect(result.current.selectedDoctor).toEqual(fake);
    });

    it('handleContinue does nothing if no doctor selected', () => {
        const next = vi.fn();
        const { result } = renderHook(() => useDoctorStep());
        act(() => {
            result.current.handleContinue(next);
        });
        expect(storeState.setDoctor).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    it('syncs selectedDoctor when store has a doctor initially', () => {
        storeState.doctor = { id: 88, name: 'Dr. Sync', price: 250 };
        const { result } = renderHook(() => useDoctorStep());
        expect(result.current.selectedDoctor).toEqual({
            id: 88,
            name: 'Dr. Sync',
            price: 250,
        });
    });
});
