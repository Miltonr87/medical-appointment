import { useAppointmentStore } from '@/store/appointmentStore';

export const useStepNavigation = () => {
    const currentStep = useAppointmentStore((s) => s.currentStep);
    const setCurrentStep = useAppointmentStore((s) => s.setCurrentStep);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    return {
        currentStep,
        nextStep,
        prevStep,
        setCurrentStep,
    };
};
