'use client';
import { mainMenu, userMenu } from '@/dummies/pages';
import useUser from '@/hooks/useUser';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useMemo, useState } from 'react';
import styles from './Navbar.module.scss';

export const Navbar = (): ReactElement<null, 'div'> | null => {
    const pathname = usePathname();
    const { user, logout } = useUser();
    const imagePath = useMemo(() => getAssetPath(user?.avatar?.path), [user]);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className={styles.wrapper}>
                <Link href={'/'}>
                    <Image className={styles.logo} src={'/logo.png'} width={39} height={44} alt="logo" priority />
                </Link>
                <div className={styles.menuItems}>
                    {mainMenu.map((page) => (
                        <Link
                            href={page.url}
                            className={clsx(styles.menuItem, pathname === page.url && styles.active)}
                            key={page.id}
                        >
                            {page.title}
                        </Link>
                    ))}
                </div>
                <div className={styles.userNavigation}>
                    {!user ? (
                        <Link href={'/login'}>
                            <span className={clsx(styles.logIn)}>{trans('navigation.auth.log_in')}</span>
                            <Image
                                className={styles.rightArrow}
                                src={'/right-arrow.svg'}
                                alt=""
                                width={13.5}
                                height={9.9}
                            />
                        </Link>
                    ) : (
                        <div className={styles.loggedIn}>
                            <div
                                className={styles.userInfo}
                                onClick={() => {
                                    setMenuOpen((open) => !open);
                                }}
                            >
                                <Image
                                    className={clsx(styles.caret, menuOpen && styles.open)}
                                    src={'/caret-down.svg'}
                                    alt="open dropdown"
                                    width={8}
                                    height={4}
                                />
                                <div>
                                    {user.avatar && imagePath ? (
                                        <Image
                                            src={imagePath}
                                            width={user.avatar.width}
                                            height={user.avatar.height}
                                            alt="avatar"
                                            className={styles.avatar}
                                            sizes="4rem"
                                        />
                                    ) : (
                                        <div className={styles.noImage}>
                                            {user.firstName.charAt(0)}
                                            {user.lastName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={clsx(styles.userMenu, menuOpen && styles.open)}
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            >
                                <div className={styles.userName}>
                                    {user.firstName} {user.lastName}
                                </div>
                                {userMenu.map((page) => (
                                    <Link
                                        href={page.url}
                                        className={clsx(styles.menuItem, pathname === page.url && styles.active)}
                                        key={page.id}
                                    >
                                        {page.title}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        logout();
                                    }}
                                    className={styles.logOut}
                                >
                                    {trans('navigation.log_out')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};
