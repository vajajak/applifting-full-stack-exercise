'use client';
import trans from '@/utils/strings';
import { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';

export const ArticleDetail = (): ReactElement<null, 'div'> | null => {
    return (
        <div className={styles.wrapper}>
            <h1>{trans('recent_articles.title')}</h1>
        </div>
    );
};
