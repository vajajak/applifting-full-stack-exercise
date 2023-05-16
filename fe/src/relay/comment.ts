import { graphql } from 'react-relay';

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
