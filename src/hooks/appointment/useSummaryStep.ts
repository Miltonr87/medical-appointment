import { useAppointmentStore } from '@/store/appointmentStore';

export const useSummaryStep = () => {
    const date = useAppointmentStore((s) => s.date);
    const time = useAppointmentStore((s) => s.time);
    const clinic = useAppointmentStore((s) => s.clinic);
    const doctor = useAppointmentStore((s) => s.doctor);
    const paymentMethod = useAppointmentStore((s) => s.paymentMethod);

    const reset = useAppointmentStore((s) => s.reset);

    return {
        date,
        time,
        clinic,
        doctor,
        paymentMethod,
        reset,
    };
};
