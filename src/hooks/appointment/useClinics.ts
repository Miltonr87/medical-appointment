'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/lib/mockApi';
import { toast } from '@/components/ui/sonner';
import type { Clinic } from '@/types/appointment.types';

export const useClinics = () => {
    const query = useQuery({
        queryKey: ['clinics'],
        queryFn: mockApi.getClinics,
        retry: false,
    });
    useEffect(() => {
        if (query.isError) {
            const message =
                query.error instanceof Error
                    ? query.error.message
                    : 'Erro ao carregar clínicas';

            toast.error(message);
        }
    }, [query.isError, query.error]);
    const clinics = query.data as Clinic[] | undefined;

    return {
        clinics: clinics ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
