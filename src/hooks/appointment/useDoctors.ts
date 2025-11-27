'use client';

import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/lib/mockApi';

export const useDoctors = () => {
    const query = useQuery({
        queryKey: ['doctors'],
        queryFn: () => mockApi.getDoctors(),
        retry: false,
    });

    return {
        doctors: query.data?.search ?? [],
        recommended: query.data?.recommended ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};
