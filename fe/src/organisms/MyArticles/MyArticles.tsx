'use client';
import { PAGE_SIZE } from '@/constants';
import useUser from '@/hooks/useUser';
import { Button } from '@/primitives/Button/button';
import { articleListQuery, articleListQuery$data } from '@/relay/__generated__/articleListQuery.graphql';
import { ArticleDeleteMutation, ArticleListQuery } from '@/relay/article';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import trans from '@/utils/strings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridRowsProp,
    GridSortModel,
} from '@mui/x-data-grid';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { commitMutation, fetchQuery } from 'relay-runtime';
import styles from './MyArticles.module.scss';
import { articleDeleteMutation } from '@/relay/__generated__/articleDeleteMutation.graphql';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

enum ArticleSortFields {
    CommentCount = 'commentCount',
    Content = 'content',
    CreatedAt = 'createdAt',
    Id = 'id',
    Perex = 'perex',
    Slug = 'slug',
    Title = 'title',
    UpdatedAt = 'updatedAt',
    UserId = 'userId',
}

enum SortDirection {
    Asc = 'ASC',
    Desc = 'DESC',
}

export const MyArticles = (): ReactElement<null, 'div'> | null => {
    const environment = useMemo(() => createRelayEnvironment({}, false), []);
    const { user } = useUser({ redirectTo: '/login' });
    const router = useRouter();

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: PAGE_SIZE });
    const [articles, setArticles] = useState<articleListQuery$data['articles']['nodes'] | undefined>(undefined);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [sortModel, setSortModel] = useState([{ field: ArticleSortFields.CreatedAt, direction: SortDirection.Desc }]);

    const fetchRows = useCallback(async () => {
        if (user) {
            return await fetchQuery<articleListQuery>(environment, ArticleListQuery, {
                sorting: sortModel,
                paging: { limit: PAGE_SIZE, offset: paginationModel.page * PAGE_SIZE },
                filter: { userId: { eq: user.id } },
            })
                .toPromise()
                .then((newData) => {
                    if (newData?.articles) {
                        return newData?.articles;
                    }
                });
        }
        return { totalCount: 0, nodes: [] };
    }, [paginationModel.page, user, sortModel]);

    const deleteArticle = useCallback((articleId: string) => {
        setIsLoading(true);
        commitMutation<articleDeleteMutation>(environment, {
            mutation: ArticleDeleteMutation,
            variables: { id: articleId },
            onCompleted() {
                fetchRows().then((articles) => {
                    if (articles?.totalCount && articles.nodes) {
                        setTotalCount(articles?.totalCount);
                        setArticles(articles.nodes);
                    }
                    setIsLoading(false);
                });
            },
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchRows().then((articles) => {
            if (articles?.totalCount && articles.nodes) {
                setTotalCount(articles?.totalCount);
                setArticles(articles.nodes);
            }
            setIsLoading(false);
        });
    }, [paginationModel.page, user, sortModel]);

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
        setSortModel(
            sortModel.map((sort) => ({
                field: sort.field as ArticleSortFields,
                direction: sort.sort?.toUpperCase() as SortDirection,
            })),
        );
    }, []);

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
        { field: 'perex', headerName: 'Perex', width: 400 },
        { field: 'author', headerName: 'Author', width: 200, sortable: false },
        { field: 'commentCount', headerName: '# of comments', width: 130, sortable: false },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Actions',
            align: 'right',
            minWidth: 120,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    showInMenu
                    onClick={() => {
                        deleteArticle(String(params.id));
                    }}
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    showInMenu
                    onClick={() => {
                        router.push(`/create-article/${params.id}`);
                    }}
                />,
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="View"
                    showInMenu
                    onClick={() => {
                        router.push(`/articles/${articles?.find((a) => a.id === params.id)?.slug}`);
                    }}
                />,
            ],
        },
    ];

    if (!user) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>{trans('my_articles.title')}</h1>
                <Link href={'/create-article'}>
                    <Button className={styles.newButton}>{trans('my_articles.button.create_new_article')}</Button>
                </Link>
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
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
            />
        </div>
    );
};
