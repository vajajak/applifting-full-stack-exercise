import { swrConfig } from '@/utils/swrConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar: {
        path: string;
        height: number;
        width: number;
        blurhash: string;
    } | null;
}

interface UserProps {
    redirectTo?: string | boolean;
}

export default function useUser({ redirectTo = false }: UserProps = {}) {
    const { data: user, isLoading, mutate: mutateUser } = useSWR<UserData>('/auth/user', swrConfig);
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const _axios = useMemo(
        () =>
            axios.create({
                baseURL: process.env.NEXT_PUBLIC_BE_BASE_URL,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }),
        [],
    );

    useEffect(() => {
        if (isLoading) return;
        if (redirectTo && !user?.id) {
            router.push(redirectTo?.toString());
        }
    }, [user, redirectTo, isLoading]);

    const logout = useCallback(async () => {
        await _axios.get('/auth/logout');
        router.push('/login');
        mutate('/auth/user', undefined);
    }, []);

    const login = useCallback(async (formData: Record<string, string>) => {
        const { data } = await _axios.post('/auth/login', formData);

        if (data.id) {
            await mutateUser();
            router.push('/my-articles');
        }

        return data;
    }, []);

    return { user, isLoading, mutateUser, logout, login };
}
