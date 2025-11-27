import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockApi } from '@/lib/mockApi';
import { toast } from '@/hooks/use-toast';
import { useAppointmentStore } from '@/store/appointmentStore';

export const useSummaryStep = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const date = useAppointmentStore((s) => s.date);
    const time = useAppointmentStore((s) => s.time);
    const clinic = useAppointmentStore((s) => s.clinic);
    const doctor = useAppointmentStore((s) => s.doctor);
    const paymentMethod = useAppointmentStore((s) => s.paymentMethod);
    const reset = useAppointmentStore((s) => s.reset);

    const isReady = useMemo(
        () => !!date && !!time && !!clinic && !!doctor && !!paymentMethod,
        [date, time, clinic, doctor, paymentMethod]
    );

    const handleConfirm = async () => {
        if (!isReady) return;
        setLoading(true);
        try {
            const result = await mockApi.confirmAppointment({
                date,
                time,
                clinicId: clinic!.id,
                doctorId: doctor!.id,
                paymentMethod,
            });
            if (result.success) {
                router.push('/success');
                return;
            }
        } catch {
            toast({
                title: 'Erro ao confirmar agendamento',
                description: 'Tente novamente mais tarde.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        date,
        time,
        clinic,
        doctor,
        paymentMethod,
        isReady,
        loading,
        handleConfirm,
        reset,
    };
};
