import { useAppointmentStore } from '@/store/appointmentStore';

export const useCurrentStep = () => {
    const currentStep = useAppointmentStore((s) => s.currentStep);
    const setCurrentStep = useAppointmentStore((s) => s.setCurrentStep);
    return { currentStep, setCurrentStep };
};
