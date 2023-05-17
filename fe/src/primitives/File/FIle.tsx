import trans from '@/utils/strings';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';
import { InputLabel } from '../InputLabel/InputLabel';
import { Loader } from '../Loader/Loader';
import styles from './File.module.scss';

export interface FileProps {
    name: string;
    error?: string | undefined;
    required?: boolean;
    label?: string | null;
    preview?: string;
    setPreview?: Dispatch<SetStateAction<string | undefined>>;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    uploadLoading?: boolean;
    className?: string;
}

const File = ({
    name,
    error,
    required,
    label,
    preview,
    setPreview,
    onChange,
    uploadLoading,
    className,
}: FileProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        {label && <InputLabel htmlFor={name} required={required} label={label} />}
        {preview && (
            <div className={styles.previewContainer}>
                <Image className={styles.previewImage} src={preview} alt="featured image" width={100} height={100} />
                {uploadLoading ? (
                    <Loader className={styles.loader} />
                ) : (
                    <span
                        className={styles.removeImage}
                        onClick={() => {
                            setPreview?.(undefined);
                        }}
                    >
                        {trans('create_article.featuredImage.remove')}
                    </span>
                )}
            </div>
        )}
        <input
            type="file"
            onChange={onChange}
            accept="image/png, image/jpeg"
            className={clsx(styles.file, preview && styles.preview)}
        />
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { File };
