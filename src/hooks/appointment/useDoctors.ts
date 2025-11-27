'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/lib/mockApi';
import { toast } from '@/components/ui/sonner';
import type { Doctor } from '@/types/appointment.types';

export const useDoctors = () => {
    const query = useQuery({
        queryKey: ['doctors'],
        queryFn: mockApi.getDoctors,
        retry: false,
    });
    useEffect(() => {
        if (query.isError) {
            const message =
                query.error instanceof Error
                    ? query.error.message
                    : 'Erro ao buscar médicos';

            toast.error(message);
        }
    }, [query.isError, query.error]);
    const data = query.data as
        | { search: Doctor[]; recommended: Doctor[] }
        | undefined;

    return {
        doctors: data?.search ?? [],
        recommended: data?.recommended ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
