import { useAppointmentStore } from '@/store/appointmentStore';

export const usePaymentStep = () => {
    const paymentMethod = useAppointmentStore((s) => s.paymentMethod);
    const setPaymentMethod = useAppointmentStore((s) => s.setPaymentMethod);

    return {
        paymentMethod,
        setPaymentMethod,
    };
};
