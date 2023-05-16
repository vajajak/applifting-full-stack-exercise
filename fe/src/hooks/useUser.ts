import { swrConfig } from '@/utils/swrConfig';
import useSWR from 'swr';

interface UserProps {
    redirectTo?: string | boolean;
    redirectIfFound?: boolean;
}

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
    } | null;
}

export default function useUser({ redirectTo = false, redirectIfFound = false }: UserProps = {}) {
    const { data: user, isLoading, mutate: mutateUser } = useSWR<UserData>('/auth/user', swrConfig);
    // const { push } = useRouter();
    // const _axios = useMemo(
    //     () =>
    //         axios.create({
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //             withCredentials: true,
    //         }),
    //     [],
    // );

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
    //         Router.push(redirectTo?.toString());
    //     }
    // }, [user, redirectIfFound, redirectTo]);

    // const logout = useCallback(async (afterLogoutPage) => {
    //     await _axios.get('/api/user/logout');
    //     await push(afterLogoutPage).then(() => mutateUser());
    // }, []);

    // const login = useCallback(async (formData: FormData, afterLoginPage) => {
    //     const { data } = await _axios.post('/api/user/login', formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //         withCredentials: true,
    //     });

    //     if (data.success) {
    //         await mutateUser();
    //         push(afterLoginPage);
    //     }

    //     return data;
    // }, []);

    return { user, isLoading, mutateUser /* nullifyNotifications, login, logout */ };
}
