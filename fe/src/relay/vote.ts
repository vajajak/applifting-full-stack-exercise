import { graphql } from 'react-relay';

// ------------------------------------------ Mutations -------------------------------------- \\

export const VoteSetMutation = graphql`
    mutation voteSetMutation($commentId: ID!, $voteType: VoteType!) {
        setVote(commentId: $commentId, voteType: $voteType) {
            success
            message
        }
    }
`;
