async function fetchGraphQL(text, variables) {
    let path;
    if (process.env.NODE_ENV === "production") {
      path = "/api";
    } else  {
      path = "";
    }
    const response = await fetch(`${path}/graphql/v1/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
