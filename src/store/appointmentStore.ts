import { create } from "zustand";
import type { AppointmentState } from "../types/appointment.types";

const logger =
  (config) =>
    (set, get, api) =>
      config(
        (...args) => {
          console.log("🟨 Action Payload →", args[0]);
          set(...args);
          console.log("🟩 New state →", get());
        },
        get,
        api
      );

export const useAppointmentStore = create<AppointmentState>()(
  logger((set) => ({
    date: null,
    time: null,
    clinic: null,
    doctor: null,
    paymentMethod: null,
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
        date: null,
        time: null,
        clinic: null,
        doctor: null,
        paymentMethod: null,
        currentStep: 1,
      }),
  }))
);
