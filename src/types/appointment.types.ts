// PAYMENT
export type PaymentMethod = 'pix' | 'credit-card' | 'cash';

// CLINIC
export interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
}

// DOCTOR
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
  doctor: Doctor | undefined;
  paymentMethod: PaymentMethod | undefined;
  currentStep: number;
  setScheduling: (date: Date | undefined, time: string, clinic: Clinic | undefined) => void;
  setDoctor: (doctor: Doctor) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}
