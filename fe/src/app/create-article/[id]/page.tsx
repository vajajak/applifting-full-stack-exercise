import { CreateUpdateArticle } from '@/organisms/CreateUpdateArticle/CreateUpdateArticle';
import articleEditQueryNode, { articleEditQuery } from '@/relay/__generated__/articleEditQuery.graphql';
import loadSerializableQuery from '@/utils/loadSerializableQuery';
import { notFound } from 'next/navigation';

export default async function UpdateDetailPage({ params }: { params: { id: string } }) {
    const preloadedQuery = await loadSerializableQuery<typeof articleEditQueryNode, articleEditQuery>(
        articleEditQueryNode.params,
        {
            id: params.id,
        },
    );

    if (!preloadedQuery.response.article.id) {
        notFound();
    }

    return <CreateUpdateArticle initialData={preloadedQuery.response.article} />;
}
