import React, { ReactElement, useState } from 'react';
import styles from './PasswordInput.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { InputLabel } from '../InputLabel/InputLabel';
import Image from 'next/image';

export interface PasswordInputProps {
    name: string;
    register: UseFormRegister<any>;
    error: string | undefined;
    placeholder?: string;
    className?: string;
    required?: boolean;
    label?: string | null;
    showIcon?: boolean;
}

const PasswordInput = ({
    name,
    register,
    error,
    placeholder,
    className,
    label,
    required,
    showIcon,
}: PasswordInputProps): ReactElement => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && <InputLabel required={required} label={label} htmlFor={name} />}
            <div className={styles.content}>
                <input
                    type={show ? 'text' : 'password'}
                    {...register(name)}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={styles.input}
                />
                {showIcon && (
                    // <Icon name={show ? 'hide' : 'show'} onClick={() => setShow(!show)} className={styles.icon} />
                    <Image
                        className={styles.icon}
                        src={show ? 'hide' : 'show'}
                        alt=""
                        onClick={() => setShow(!show)}
                        width={13.5}
                        height={9.9}
                    />
                )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export { PasswordInput };
