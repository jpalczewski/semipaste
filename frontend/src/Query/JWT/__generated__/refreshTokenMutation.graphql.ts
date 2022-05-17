/**
 * @generated SignedSource<<f392791440969a1344d2e041bdf66acb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type refreshTokenMutation$variables = {
  token: string;
};
export type refreshTokenMutation$data = {
  readonly refreshToken: {
    readonly token: string;
  } | null;
};
export type refreshTokenMutation = {
  variables: refreshTokenMutation$variables;
  response: refreshTokenMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RefreshPayload",
    "kind": "LinkedField",
    "name": "refreshToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "refreshTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "refreshTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "431803c0447b34d4c5345ed5d8a4adcb",
    "id": null,
    "metadata": {},
    "name": "refreshTokenMutation",
    "operationKind": "mutation",
    "text": "mutation refreshTokenMutation(\n  $token: String!\n) {\n  refreshToken(input: {token: $token}) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "af9b92032a8dbc2b52ac2a2b1f1ef3b0";

export default node;
