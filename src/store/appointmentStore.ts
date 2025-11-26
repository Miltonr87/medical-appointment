import { create } from 'zustand';
import type { AppointmentState } from '../types/appointment.types';

export const useAppointmentStore = create<AppointmentState>((set) => ({
  date: undefined,
  time: '',
  clinic: undefined,
  doctor: undefined,
  paymentMethod: undefined,
  currentStep: 1,

  setScheduling: (date, time, clinic) =>
    set({ date, time, clinic }),

  setDoctor: (doctor) =>
    set({ doctor }),

  setPaymentMethod: (method) =>
    set({ paymentMethod: method }),

  setCurrentStep: (step) =>
    set({ currentStep: step }),

  reset: () =>
    set({
      date: undefined,
      time: '',
      clinic: undefined,
      doctor: undefined,
      paymentMethod: undefined,
      currentStep: 1,
    }),
}));
