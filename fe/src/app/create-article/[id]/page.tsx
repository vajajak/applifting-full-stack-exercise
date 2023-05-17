import { CreateUpdateArticle } from '@/organisms/CreateUpdateArticle/CreateUpdateArticle';
import articleEditQueryNode, {
    articleEditQuery,
    articleEditQuery$data,
} from '@/relay/__generated__/articleEditQuery.graphql';
import loadSerializableQuery from '@/utils/loadSerializableQuery';

export default async function UpdateDetailPage({ params }: { params: { id: string } }) {
    const preloadedQuery = await loadSerializableQuery<typeof articleEditQueryNode, articleEditQuery>(
        articleEditQueryNode.params,
        {
            id: params.id,
        },
    );

    return <CreateUpdateArticle initialData={preloadedQuery.response.article} />;
}
