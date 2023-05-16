import React, { ReactElement } from 'react';
import styles from './TextInput.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { InputLabel } from '../InputLabel/InputLabel';

export interface TextInputProps {
    name: string;
    type?: 'text' | 'email';
    register: UseFormRegister<any>;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
    required?: boolean;
    label?: string | null;
    disabled?: boolean;
}

const TextInput = ({
    name,
    type = 'text',
    register,
    error,
    placeholder,
    className,
    required,
    label,
    disabled,
}: TextInputProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        {label && <InputLabel htmlFor={name} required={required} label={label} />}
        <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            autoComplete="off"
            className={clsx(styles.input, disabled && styles.input__disabled)}
        />
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { TextInput };
