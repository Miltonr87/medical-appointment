import { useState, useEffect, useCallback } from 'react';
import { mockApi } from '@/lib/mockApi';
import { useAppointmentStore } from '@/store/appointmentStore';
import type { Clinic } from '@/types/appointment.types';

export const useSchedulingStep = () => {
    const date = useAppointmentStore((s) => s.date);
    const time = useAppointmentStore((s) => s.time);
    const clinic = useAppointmentStore((s) => s.clinic);
    const setScheduling = useAppointmentStore((s) => s.setScheduling);
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loadingClinics, setLoadingClinics] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState<Clinic | undefined>();

    const loadClinics = useCallback(async (selectedDate: string, selectedTime: string) => {
        if (!selectedDate || !selectedTime) return;
        setLoadingClinics(true);
        const data = await mockApi.getClinics();
        setClinics(data);
        setLoadingClinics(false);
    }, []);
    const updateSelectedClinic = useCallback(
        (clinicId: string) => {
            const found = clinics.find((c) => c.id === clinicId);
            setSelectedClinic(found);
        },
        [clinics]
    );
    const handleContinue = (
        formDate: string,
        formTime: string,
        clinic: Clinic,
        next: () => void
    ) => {
        setScheduling(new Date(formDate), formTime, clinic);
        next();
    };

    return {
        date,
        time,
        clinic,
        clinics,
        loadingClinics,
        selectedClinic,
        loadClinics,
        updateSelectedClinic,
        handleContinue,
    };
};
