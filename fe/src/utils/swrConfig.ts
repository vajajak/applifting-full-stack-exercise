import axios from 'axios';

export const swrConfig = {
    refreshInterval: 0,
    fetcher: (url: string) =>
        axios
            .get(url, { baseURL: process.env.NEXT_PUBLIC_BE_BASE_URL, withCredentials: true })
            .then((data) => data.data.user),
    revalidateOnMount: true,
};
