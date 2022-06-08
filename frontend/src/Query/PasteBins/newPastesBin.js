import graphql from "babel-plugin-relay/macro";

export const newPastesBin = graphql`
  query newPastesBinQuery ($dateOfExpiry_Gte: Date)
  {
    activePasteBin
    (dateOfExpiry_Gte: $dateOfExpiry_Gte)
    {
      totalCount
    }
  }
`;
