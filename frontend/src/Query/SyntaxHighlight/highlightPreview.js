import graphql from "babel-plugin-relay/macro";

export const highlightPreview = graphql`
    mutation highlightPreview ($code: String!, $lang: String) {
        highlightPreview (input: {code: $code, lang: $lang}) {
            highlight
        }
    }
`;
