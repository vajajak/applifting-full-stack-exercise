import { graphql } from 'react-relay';

// --------------------------------------------- Fragments ----------------------------------------------- \\

graphql`
    fragment mediaObjectFragment on MediaObject {
        path
        height
        width
        blurhash
    }
`;
