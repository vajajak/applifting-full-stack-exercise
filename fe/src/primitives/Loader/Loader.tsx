import Image from 'next/image';
import styles from './Loader.module.scss';
import clsx from 'clsx';

export const Loader = ({ className }: { className?: string }) => (
    <Image className={clsx(styles.loader, className)} src={'/loader.svg'} alt="" width={40} height={40} />
);
