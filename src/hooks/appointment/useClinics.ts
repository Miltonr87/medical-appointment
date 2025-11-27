'use client';

import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/lib/mockApi';

export const useClinics = () => {
    const query = useQuery({
        queryKey: ['clinics'],
        queryFn: () => mockApi.getClinics(),
        retry: false, // let the UI handle retries manually
    });

    return {
        clinics: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
