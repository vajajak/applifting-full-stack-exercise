import { graphql } from 'react-relay';

// ------------------------------------------ Queries -------------------------------------- \\

/**
 * List query
 */
export const CommentListQuery = graphql`
    query commentListQuery($sorting: [CommentSort!], $filter: CommentFilter) {
        comments(sorting: $sorting, filter: $filter) {
            ...commentFragment @relay(mask: false)
        }
    }
`;

// --------------------------------------------- Fragments ----------------------------------------------- \\

graphql`
    fragment commentFragment on Comment {
        id
        content
        articleId
        upVotes
        downVotes
        voted
        user {
            ...userFragment @relay(mask: false)
        }
        parent {
            ...commentSubCommentFragment @relay(mask: false)
        }
        createdAt
    }
`;

graphql`
    fragment commentSubCommentFragment on Comment {
        id
        content
        articleId
        upVotes
        downVotes
        voted
        user {
            ...userFragment @relay(mask: false)
        }
        createdAt
    }
`;

// --------------------------------------------- Subscriptions ----------------------------------------------- \\

export const CommentCreateSubscription = graphql`
    subscription commentCreateSubscription($articleId: String!) {
        createdComment(input: { filter: { articleId: { eq: $articleId } } }) {
            ...commentFragment @relay(mask: false)
        }
    }
`;

// --------------------------------------------- Mutations ----------------------------------------------- \\

export const CommentCreateMutation = graphql`
    mutation commentCreateMutation($input: CreateOneCommentInput!) {
        createOneComment(input: $input) {
            ...commentFragment @relay(mask: false)
        }
    }
`;
