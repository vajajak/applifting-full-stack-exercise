import clsx from 'clsx';
import styles from './button.module.scss';

export const Button = ({
    submit,
    children,
    disabled,
    className,
    onClick,
}: {
    submit?: boolean;
    children: string | JSX.Element;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}) => (
    <button
        disabled={!!disabled}
        className={clsx(styles.button, className)}
        {...(submit && { type: 'submit' })}
        {...(onClick && { onClick })}
    >
        {children}
    </button>
);
