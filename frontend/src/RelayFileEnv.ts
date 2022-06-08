// relay-environment.js
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

function fetchQuery(operation: any, variables: any, cacheConfig: any, uploadables: any) {
  let init;
 if (uploadables) {
    if (!window.FormData) {
      throw new Error("Uploading files without `FormData` not supported.");
    }
    const formData = new FormData();
    formData.append("query", operation.text);
    formData.append("variables", JSON.stringify(variables));
    for (const uploadable in uploadables) {
      if (Object.prototype.hasOwnProperty.call(uploadables, uploadable)) {
        formData.append(uploadable, uploadables[uploadable]);
        console.log("Appending: ", uploadable, uploadables[uploadable]);
      }
    }
    init = {
      method: "POST",
      body: formData,
      headers: {
          'Content-Type': "application/json"
      }
    };
  } else {
    init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    };
  }
  return fetch("localhost:8000/graphql/v1/", init).then(response=>response.json());
}

export default new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});
