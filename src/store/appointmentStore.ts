import { create } from 'zustand';

export interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  price: number;
  image: string;
  recommended?: boolean;
}

export interface AppointmentState {
  date: Date | undefined;
  time: string;
  clinic: Clinic | undefined;

  // Step 2: Doctor
  doctor: Doctor | undefined;

  // Step 3: Payment
  paymentMethod: 'pix' | 'credit-card' | 'cash' | undefined;

  // Current step
  currentStep: number;

  // Actions
  setScheduling: (date: Date | undefined, time: string, clinic: Clinic | undefined) => void;
  setDoctor: (doctor: Doctor) => void;
  setPaymentMethod: (method: 'pix' | 'credit-card' | 'cash') => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

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
