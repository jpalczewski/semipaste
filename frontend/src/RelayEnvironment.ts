import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

async function fetchRelay(params: any, variables: any, cacheConfig: any, uploadables: any) {
  let init;
  if (uploadables) {
    if (!window.FormData) {
      throw new Error("Uploading files without `FormData` not supported.");
    }
    const formData = new FormData();
    formData.append("query", params.text);
    formData.append("variables", JSON.stringify(variables));
    Object.keys(uploadables).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        formData.append(key, uploadables[key])
      }
    });

    init = {
      method: "POST",
      body: formData,
    };
  } else {
    init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    };
  }
  return fetchGraphQL(init);
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
