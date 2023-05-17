import { ArticleDetail } from '@/organisms/ArticleDetail/ArticleDetail';
import articleDetailQueryNode, { articleDetailQuery } from '@/relay/__generated__/articleDetailQuery.graphql';
import articleListQueryNode, { articleListQuery } from '@/relay/__generated__/articleListQuery.graphql';
import loadSerializableQuery from '@/utils/loadSerializableQuery';
import { notFound } from 'next/navigation';

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const articleDetail = await loadSerializableQuery<typeof articleDetailQueryNode, articleDetailQuery>(
        articleDetailQueryNode.params,
        {
            slug: params.slug,
        },
    );

    const relatedArticles = await loadSerializableQuery<typeof articleListQueryNode, articleListQuery>(
        articleListQueryNode.params,
        {
            filter: { slug: { neq: params.slug } },
            paging: { limit: 4, offset: 0 },
            sorting: [{ field: 'createdAt', direction: 'DESC' }],
        },
    );

    if (articleDetail.response.articles.totalCount !== 1) {
        notFound();
    }

    return <ArticleDetail article={articleDetail.response.articles} related={relatedArticles.response.articles} />;
}
