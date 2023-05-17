'use client';
import useUser from '@/hooks/useUser';
import { Button } from '@/primitives/Button/button';
import { File } from '@/primitives/File/FIle';
import { Loader } from '@/primitives/Loader/Loader';
import { TextInput } from '@/primitives/TextInput/TextInput';
import { Textarea } from '@/primitives/Textarea/Textarea';
import { articleCreateMutation, articleCreateMutation$data } from '@/relay/__generated__/articleCreateMutation.graphql';
import { articleEditQuery } from '@/relay/__generated__/articleEditQuery.graphql';
import { articleUpdateMutation, articleUpdateMutation$data } from '@/relay/__generated__/articleUpdateMutation.graphql';
import { ArticleCreateMutation, ArticleUpdateMutation } from '@/relay/article';
import { axios } from '@/utils/axios';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { commitMutation } from 'relay-runtime';
import * as yup from 'yup';
import styles from './CreateUpdateArticle.module.scss';

interface CreateUpdateArticleProps {
    initialData?: articleEditQuery['response']['article'];
}

interface FormData {
    title: string;
    perex: string;
    content: string;
}

const schema = yup
    .object({
        title: yup.string().required(trans('login_page.validations.required_field')),
        perex: yup.string().required(trans('login_page.validations.required_field')),
        content: yup.string().required(trans('login_page.validations.required_field')),
    })
    .required();

export const CreateUpdateArticle = ({ initialData }: CreateUpdateArticleProps): ReactElement<null, 'div'> | null => {
    const environment = useMemo(() => createRelayEnvironment({}, false), []);
    const { user } = useUser({ redirectTo: '/login' });
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [imageId, setImageId] = useState<string>();
    const [imagePreview, setImagePreview] = useState<string>();

    useEffect(() => {
        if (initialData?.featuredImage?.path) {
            const path = getAssetPath(initialData.featuredImage.path);
            if (path) {
                setImagePreview(path);
            }
        }
    }, [initialData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: initialData?.title ?? '',
            perex: initialData?.perex ?? '',
            content: initialData?.content ?? '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = useCallback(
        async (values) => {
            setLoading(true);
            setError('');

            commitMutation<articleCreateMutation | articleUpdateMutation>(environment, {
                mutation: initialData ? ArticleUpdateMutation : ArticleCreateMutation,
                // @ts-ignore
                variables: {
                    ...(initialData && {
                        input: {
                            id: initialData.id,
                            update: { ...values, ...(imageId ? { featuredImageId: imageId } : {}) },
                        },
                    }),
                    ...(!initialData && {
                        input: { article: { ...values, ...(imageId ? { featuredImageId: imageId } : {}) } },
                    }),
                },
                onCompleted(data) {
                    if (
                        initialData
                            ? !(data as articleUpdateMutation$data).updateOneArticle.id
                            : !(data as articleCreateMutation$data).createOneArticle.id
                    ) {
                        setError('internal_server_error');
                        setLoading(false);
                    }
                    router.push('/my-articles');
                },
            });
        },
        [imageId],
    );

    const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setImageUploadLoading(true);

            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            const { data } = await axios.post('/media-object/upload', formData);
            setImageId(data.id);
            setImageUploadLoading(false);
        }
    }, []);

    if (!user) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.header}>
                    <h1>{initialData ? trans('update_article.title') : trans('create_article.title')}</h1>
                    <Button submit disabled={loading || imageUploadLoading} className={styles.newButton}>
                        <>
                            {(loading || imageUploadLoading) && <Loader className={styles.loader} />}
                            <span>{trans('create_article.publish_button.label')}</span>
                        </>
                    </Button>
                </div>
                <div className={styles.formContainer}>
                    {error && <div className={styles.errorMessage}>{trans(`login_page.validations.${error}`)}</div>}
                    <TextInput
                        className={styles.textInput}
                        name="title"
                        register={register}
                        error={errors.title?.message}
                        placeholder={trans('create_article.article_title.placeholder')}
                        type="text"
                        label={trans('create_article.article_title.label')}
                        required
                    />
                    <File
                        name="featuredImage"
                        label={trans('create_article.featuredImage.label')}
                        onChange={handleFileChange}
                        preview={imagePreview}
                        setPreview={setImagePreview}
                        uploadLoading={imageUploadLoading}
                    />
                    <Textarea
                        className={styles.textInput}
                        name="perex"
                        register={register}
                        error={errors.perex?.message}
                        label={trans('create_article.perex.title')}
                        placeholder={trans('create_article.perex.placeholder')}
                        required
                    />
                    <Textarea
                        className={clsx(styles.textInput, styles.content)}
                        name="content"
                        register={register}
                        error={errors.content?.message}
                        label={trans('create_article.content.title')}
                        placeholder={trans('create_article.content.placeholder')}
                        required
                    />
                </div>
            </form>
        </div>
    );
};
