import React, { ReactElement } from 'react';
import styles from './InputLabel.module.scss';
import clsx from 'clsx';

export interface InputLabelProps {
    required?: boolean;
    label: string;
    htmlFor: string;
}

const InputLabel = ({ htmlFor, label, required }: InputLabelProps): ReactElement => (
    <label htmlFor={htmlFor} className={clsx(styles.label, required && styles.label__required)}>
        {label}
    </label>
);

export { InputLabel };
