import { useState, useEffect, startTransition } from 'react';
import { useAppointmentStore } from '@/store/appointmentStore';

export const usePaymentStep = () => {
    const paymentMethodStore = useAppointmentStore((s) => s.paymentMethod);
    const setPaymentMethodStore = useAppointmentStore((s) => s.setPaymentMethod);

    const [selectedMethod, setSelectedMethod] = useState<
        'pix' | 'credit-card' | 'cash' | undefined
    >(undefined);

    // ✅ Correção definitiva: sincronização usando transition
    useEffect(() => {
        if (paymentMethodStore != null) {
            startTransition(() => {
                setSelectedMethod(paymentMethodStore);
            });
        }
    }, [paymentMethodStore]);

    const selectMethod = (method: 'pix' | 'credit-card' | 'cash') => {
        setSelectedMethod(method);
    };

    const handleContinue = (next: () => void) => {
        if (!selectedMethod) return;
        setPaymentMethodStore(selectedMethod);
        next();
    };

    return {
        selectedMethod,
        selectMethod,
        handleContinue,
    };
};
