import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AppointmentState } from "../types/appointment.types";

export const useAppointmentStore = create<AppointmentState>()(
  devtools(
    (set) => ({
      date: null,
      time: null,
      clinic: null,
      doctor: null,
      paymentMethod: null,
      currentStep: 1,
      setScheduling: (date, time, clinic) =>
        set({ date, time, clinic }, false, "appointment/setScheduling"),
      setDoctor: (doctor) =>
        set({ doctor }, false, "appointment/setDoctor"),
      setPaymentMethod: (method) =>
        set({ paymentMethod: method }, false, "appointment/setPaymentMethod"),
      setCurrentStep: (step) =>
        set({ currentStep: step }, false, "appointment/setCurrentStep"),
      reset: () =>
        set(
          {
            date: null,
            time: null,
            clinic: null,
            doctor: null,
            paymentMethod: null,
            currentStep: 1,
          },
          false,
          "appointment/reset"
        ),
    }),
    { name: "Appointment Store" }
  )
);
