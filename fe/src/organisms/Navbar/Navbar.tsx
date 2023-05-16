'use client';
import { mainMenu } from '@/dummies/pages';
import useUser from '@/hooks/useUser';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useMemo } from 'react';
import styles from './Navbar.module.scss';

export const Navbar = (): ReactElement<null, 'div'> | null => {
    const pathname = usePathname();
    const { user } = useUser();
    const imagePath = useMemo(() => getAssetPath(user?.avatar?.path), [user]);

    return (
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
                            <>noImage</>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};
