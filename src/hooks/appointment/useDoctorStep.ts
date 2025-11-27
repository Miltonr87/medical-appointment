import { useState, useEffect, useCallback } from 'react';
import { mockApi } from '@/lib/mockApi';
import { useAppointmentStore } from '@/store/appointmentStore';
import type { Doctor } from '@/types/appointment.types';

export const useDoctorStep = () => {
    const doctor = useAppointmentStore((s) => s.doctor);
    const setDoctorStore = useAppointmentStore((s) => s.setDoctor);

    const [searchDoctors, setSearchDoctors] = useState<Doctor[]>([]);
    const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();

    const loadDoctors = useCallback(async () => {
        setLoadingDoctors(true);
        const data = await mockApi.getDoctors();
        setSearchDoctors(data.search);
        setRecommendedDoctors(data.recommended);
        setLoadingDoctors(false);
    }, []);

    useEffect(() => {
        if (doctor) setSelectedDoctor(doctor);
    }, [doctor]);

    const handleContinue = (next: () => void) => {
        if (!selectedDoctor) return;
        setDoctorStore(selectedDoctor);
        next();
    };

    return {
        doctor,
        searchDoctors,
        recommendedDoctors,
        loadingDoctors,
        selectedDoctor,
        loadDoctors,
        setSelectedDoctor,
        handleContinue,
    };
};
