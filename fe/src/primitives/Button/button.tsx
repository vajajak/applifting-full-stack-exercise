import clsx from 'clsx';
import styles from './button.module.scss';

export const Button = ({
    submit,
    children,
    disabled,
    className,
}: {
    submit?: boolean;
    children: string;
    disabled?: boolean;
    className?: string;
}) => (
    <button disabled={!!disabled} className={clsx(styles.button, className)} {...(submit && { type: 'submit' })}>
        {children}
    </button>
);
