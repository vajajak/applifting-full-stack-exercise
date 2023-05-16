import trans from '@/utils/strings';

export const mainMenu = [
    {
        id: 1,
        title: trans('navigation.recent_articles'),
        url: '/',
    },
];

export const userMenu = [
    {
        id: 1,
        title: trans('navigation.my-articles'),
        url: '/my-articles',
    },
    {
        id: 2,
        title: trans('navigation.create-article'),
        url: '/create-article',
    },
];
