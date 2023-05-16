'use client';
import { PAGE_SIZE } from '@/constants';
import { Loader } from '@/primitives/Loader/Loader';
import { articleListQuery, articleListQuery$data } from '@/relay/__generated__/articleListQuery.graphql';
import { ArticleListQuery } from '@/relay/article';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { fetchQuery } from 'relay-runtime';
import styles from './ArticleList.module.scss';

export const ArticleList = (): ReactElement<null, 'div'> | null => {
    const environment = useMemo(() => createRelayEnvironment({}), []);

    const [page, setPage] = useState(0);
    const [articles, setArticles] = useState<articleListQuery$data['articles']['nodes'] | undefined>(undefined);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchQuery<articleListQuery>(environment, ArticleListQuery, {
            sorting: [{ field: 'createdAt', direction: 'DESC' }],
            paging: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
            filter: {},
        })
            .toPromise()
            .then((newData) => {
                if (newData?.articles) {
                    setTotalCount(newData?.articles.totalCount);
                    setArticles((articles) =>
                        [...(articles ?? []), ...newData.articles.nodes].filter(
                            (e, i, arr) => arr.findIndex((l) => l.id === e.id) === i,
                        ),
                    );
                    setIsLoading(false);
                }
            });
    }, [page]);

    return (
        <div className={styles.wrapper}>
            <h1>{trans('recent_articles.title')}</h1>
            <div className={styles.articleList}>
                {articles?.map((article) => {
                    const imagePath = getAssetPath(article?.featuredImage?.path);
                    const authorName = `${article.user.firstName} ${article.user.lastName}`;

                    return (
                        <div key={article.id} className={styles.articleItem}>
                            {imagePath && (
                                <Image
                                    className={styles.coverImage}
                                    src={imagePath}
                                    width={article.featuredImage?.width}
                                    height={article.featuredImage?.height}
                                    placeholder="blur"
                                    blurDataURL={article.featuredImage?.blurhash}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    alt=""
                                />
                            )}
                            <div>
                                <h2>{article.title}</h2>
                                <p className={styles.metadata}>
                                    <span>{authorName}</span>
                                    <span>
                                        {new Date(article.updatedAt).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: '2-digit',
                                        })}
                                    </span>
                                </p>
                                <p className={styles.perex}>{article.perex}</p>
                                <p className={styles.controls}>
                                    <Link className={styles.link} href={{ pathname: 'articles' }}>
                                        {trans('article.read_whole_article')}
                                    </Link>
                                    <span>
                                        {trans('article.comment_count').replace(
                                            '{count}',
                                            String(article.commentCount),
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && typeof articles?.length === 'number' && typeof totalCount === 'number' && (
                <div className={styles.pagination}>
                    <span>
                        {totalCount !== 0
                            ? trans('articles.pagination.count')
                                  .replace('{loaded}', String(articles?.length))
                                  .replace('{total}', String(totalCount))
                            : trans('articles.pagination.no_results')}
                    </span>
                    {(page + 1) * PAGE_SIZE <= totalCount && (
                        <button
                            onClick={() => {
                                setPage((page) => page + 1);
                            }}
                            className={styles.loadMore}
                        >
                            {trans('articles.pagination.load_more')}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
