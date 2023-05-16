import { graphql } from 'react-relay';

// --------------------------------------------- Fragments ----------------------------------------------- \\

graphql`
    fragment userFragment on User {
        id
        firstName
        lastName
        email
        avatar {
            ...mediaObjectFragment @relay(mask: false)
        }
    }
`;
