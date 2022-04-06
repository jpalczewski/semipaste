import graphql from "babel-plugin-relay/macro";

export const highlightPasteBin = graphql`
    mutation highlightPasteBin($id: ID!) {
        highlightPasteBin(id: $id) {
            highlight
        }
    }
`;
