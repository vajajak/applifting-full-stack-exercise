import trans from '@/utils/strings';

export const mainMenu = [
    {
        id: 1,
        title: trans('navigation.recent_articles'),
        url: '/',
    },
    {
        id: 2,
        title: trans('navigation.about'),
        url: '/about',
    },
];

export const userMenu = [{ title: trans('navigation.auth.log_in'), url: '/login' }];
