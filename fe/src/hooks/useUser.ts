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

export default function useUser() {
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

    // useEffect(() => {
    //     // if no redirect needed, just return (example: already on /dashboard)
    //     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    //     if (!redirectTo || !user) return;
    //     if (
    //         // If redirectTo is set, redirect if the user was not found.
    //         (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
    //         // If redirectIfFound is also set, redirect if the user was found
    //         (redirectIfFound && user?.isLoggedIn)
    //     ) {
    //         push(redirectTo?.toString());
    //     }
    // }, [user, redirectIfFound, redirectTo]);

    const logout = useCallback(async () => {
        await _axios.get('/auth/logout');
        router.push('/');
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
