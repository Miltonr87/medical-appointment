import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useIsMobile } from '../use-mobile';

// -------------------------------------
// STABLE matchMedia MOCK
// -------------------------------------
function mockMatchMedia(width: number) {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    });

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: (query: string) => ({
            matches: width < 768,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(), // old API fallback
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }),
    });
}

describe('useIsMobile', () => {
    beforeEach(() => {
        // Default viewport before each test
        mockMatchMedia(1024); // desktop
    });

    it('returns false on desktop width', () => {
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it('returns true on mobile width', () => {
        mockMatchMedia(500);

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('updates value when viewport changes', () => {
        const listeners: any[] = [];

        // Create a matchMedia mock that stores the listener
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: (query: string) => ({
                matches: window.innerWidth < 768,
                media: query,
                addEventListener: (_: string, cb: any) => listeners.push(cb),
                removeEventListener: vi.fn(),
            }),
        });

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false); // desktop

        // Simulate resize event
        act(() => {
            window.innerWidth = 500;
            listeners.forEach((cb) => cb());
        });

        expect(result.current).toBe(true);
    });
});
