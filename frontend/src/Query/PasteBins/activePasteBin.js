import graphql from "babel-plugin-relay/macro";

export const activePasteBin = graphql`
  query activePasteBinQuery(
    $mode: String,
    $time: String,
    $first: Int,
    $offset: Int,
    $title_Icontains: String,
    $title_Istartswith: String,
    $title_Iendswith: String,
    $dateOfCreation_Gte: Date,
    $dateOfCreation_Lte: Date,
    $language: String,
    $author__Username: String,
  ) 
  {
    activePasteBin(
      visible: true,
      mode: $mode,
      time: $time,
      first: $first,
      offset: $offset,
      title_Icontains: $title_Icontains,
      title_Istartswith: $title_Istartswith,
      title_Iendswith: $title_Iendswith,
      dateOfCreation_Gte: $dateOfCreation_Gte,
      dateOfCreation_Lte: $dateOfCreation_Lte,
      language: $language,
      author_Username: $author__Username
    ) {
      totalCount
      edges {
        node {
          title
          text
          dateOfCreation
          id
          dateOfExpiry
          language
          totalRating
          likes
          dislikes
          author {
            id
            username
          }
        }
      }
    }
  }
`;
