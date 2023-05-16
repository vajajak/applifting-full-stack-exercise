'use client';
import { PAGE_SIZE } from '@/constants';
import useUser from '@/hooks/useUser';
import { Button } from '@/primitives/Button/button';
import { articleListQuery, articleListQuery$data } from '@/relay/__generated__/articleListQuery.graphql';
import { ArticleListQuery } from '@/relay/article';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import trans from '@/utils/strings';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { fetchQuery } from 'relay-runtime';
import styles from './MyArticles.module.scss';

export const MyArticles = (): ReactElement<null, 'div'> | null => {
    const environment = useMemo(() => createRelayEnvironment({}, false), []);
    const { user } = useUser({ redirectTo: '/login' });

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: PAGE_SIZE });
    const [articles, setArticles] = useState<articleListQuery$data['articles']['nodes'] | undefined>(undefined);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            fetchQuery<articleListQuery>(environment, ArticleListQuery, {
                sorting: [{ field: 'createdAt', direction: 'DESC' }],
                paging: { limit: PAGE_SIZE, offset: paginationModel.page * PAGE_SIZE },
                filter: { userId: { eq: user.id } },
            })
                .toPromise()
                .then((newData) => {
                    if (newData?.articles) {
                        setTotalCount(newData?.articles.totalCount);
                        setArticles(newData.articles.nodes);
                        setIsLoading(false);
                    }
                });
        }
    }, [paginationModel.page, user]);

    const rows: GridRowsProp = useMemo(
        () =>
            articles?.map((a) => ({
                id: a.id,
                title: a.title,
                perex: a.perex,
                author: [a.user.firstName, a.user.lastName].join(' '),
                commentCount: a.commentCount,
            })) || [],
        [articles],
    );

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Article title', width: 200 },
        { field: 'perex', headerName: 'Perex', width: 500 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'commentCount', headerName: '# of comments', width: 150 },
    ];

    if (!user) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>{trans('my_articles.title')}</h1>
                <Button className={styles.newButton}>{trans('my_articles.button.create_new_article')}</Button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                rowCount={totalCount}
                loading={isLoading}
                pageSizeOptions={[5]}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
            />
        </div>
    );
};
