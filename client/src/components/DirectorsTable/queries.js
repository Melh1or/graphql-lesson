import { gql } from "apollo-boost";

export const directorsQuery = gql`
  query moviesQuery {
    directors {
      id
      name
      age
      movies {
        name
        id
      }
    }
  }
`;