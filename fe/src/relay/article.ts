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

export const ArticleEditQuery = graphql`
    query articleEditQuery($id: ID!) {
        article(id: $id) {
            id
            title
            perex
            content
            featuredImage {
                id
                path
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

export const ArticleCreateMutation = graphql`
    mutation articleCreateMutation($input: CreateOneArticleInput!) {
        createOneArticle(input: $input) {
            id
        }
    }
`;

export const ArticleUpdateMutation = graphql`
    mutation articleUpdateMutation($input: UpdateOneArticleInput!) {
        updateOneArticle(input: $input) {
            id
        }
    }
`;
