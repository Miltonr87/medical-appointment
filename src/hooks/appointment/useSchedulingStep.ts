import { useAppointmentStore } from '@/store/appointmentStore';

export const useSchedulingStep = () => {
    const date = useAppointmentStore((s) => s.date);
    const time = useAppointmentStore((s) => s.time);
    const clinic = useAppointmentStore((s) => s.clinic);

    const setScheduling = useAppointmentStore((s) => s.setScheduling);

    return {
        date,
        time,
        clinic,
        setScheduling,
    };
};
