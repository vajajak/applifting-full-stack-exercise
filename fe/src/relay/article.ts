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

/**
 * Detail query
 */
export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String!) {
        articles(filter: { slug: { eq: $slug } }) {
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

// --------------------------------------------- Mutations ----------------------------------------------- \\

export const ArticleDeleteMutation = graphql`
    mutation articleDeleteMutation($id: ID!) {
        deleteOneArticle(input: { id: $id }) {
            id
        }
    }
`;
