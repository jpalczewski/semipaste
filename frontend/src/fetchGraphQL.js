async function fetchGraphQL(init) {
    let path;
    if (process.env.NODE_ENV === "production") {
      path = "/api";
    } else  {
      path = "";
    }
    const response = await fetch(`${path}/graphql/v1/`, init);

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
