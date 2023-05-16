import { graphql } from 'react-relay';

// ------------------------------------------ Queries -------------------------------------- \\

/**
 * List query
 */
export const ArticleListQuery = graphql`
    query articleListQuery($sorting: [ArticleSort!], $filter: ArticleFilter, $paging: OffsetPaging) {
        articles(sorting: $sorting, filter: $filter, paging: $paging) {
            totalCount
            nodes {
                ...articleFragment @relay(mask: false)
            }
        }
    }
`;

// --------------------------------------------- Fragments ----------------------------------------------- \\

graphql`
    fragment articleFragment on Article {
        id
        title
        slug
        perex
        content
        user {
            ...userFragment @relay(mask: false)
        }
        featuredImage {
            ...mediaObjectFragment @relay(mask: false)
        }
        commentCount
        comments {
            ...commentFragment @relay(mask: false)
        }
        updatedAt
    }
`;