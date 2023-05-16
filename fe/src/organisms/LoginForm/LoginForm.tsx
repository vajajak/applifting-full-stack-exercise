'use client';
import useUser from '@/hooks/useUser';
import { PasswordInput } from '@/primitives/PasswordInput/PasswordInput';
import { TextInput } from '@/primitives/TextInput/TextInput';
import trans from '@/utils/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginForm.module.scss';
import { Button } from '@/primitives/Button/button';

interface FormData {
    email: string;
    password: string;
}

const schema = yup
    .object({
        email: yup
            .string()
            .email(trans('login_page.validations.email_invalid'))
            .required(trans('login_page.validations.required_field')),
        password: yup.string().required(trans('login_page.validations.required_field')),
    })
    .required();

export const LoginForm = (): ReactElement<null, 'div'> | null => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { login } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = useCallback(
        async (values) => {
            setLoading(true);
            setError('');

            if (!loading) {
                const formData: Record<string, string> = {};
                Object.keys(values).forEach((key) => {
                    Object.assign(formData, { [key]: String(values[key as keyof FormData]) });
                });
                const data = await login(formData).catch((data) => {
                    setLoading(false);
                    return data.response.data;
                });

                if (!data.id) {
                    setError(data?.message);
                    setLoading(false);
                }
            }
        },
        [loading],
    );

    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    {trans('login_page.title')}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && <div className={styles.errorMessage}>{trans(`login_page.validations.${error}`)}</div>}
                    <TextInput
                        className={styles.textInput}
                        name="email"
                        register={register}
                        error={errors.email?.message}
                        placeholder={trans('login_page.email_placeholder')}
                        type="email"
                        label={trans('login_page.email_label')}
                    />
                    <PasswordInput
                        className={styles.textInput}
                        name="password"
                        register={register}
                        error={errors.password?.message}
                        placeholder={trans('login_page.password_placeholder')}
                        label={trans('login_page.password_label')}
                    />
                    <Button submit disabled={loading}>
                        {trans('login_page.submit_button_label')}
                    </Button>
                </form>
            </div>
        </div>
    );
};
