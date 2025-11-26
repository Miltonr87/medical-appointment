import { useAppointmentStore } from '@/store/appointmentStore';

export const useDoctorStep = () => {
    const doctor = useAppointmentStore((s) => s.doctor);
    const setDoctor = useAppointmentStore((s) => s.setDoctor);

    return {
        doctor,
        setDoctor,
    };
};
