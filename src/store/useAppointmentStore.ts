import { create } from "zustand";

interface AppointmentState {
    step: number;
    setStep: (step: number) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
    step: 1,
    setStep: (step) => set({ step }),
}));
