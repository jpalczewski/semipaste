/**
 * @generated SignedSource<<1f221a2d163d8ebb00a8e68ad2b855cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type verifyTokenMutation$variables = {
  token: string;
};
export type verifyTokenMutation$data = {
  readonly verifyToken: {
    readonly payload: any;
  } | null;
};
export type verifyTokenMutation = {
  variables: verifyTokenMutation$variables;
  response: verifyTokenMutation$data;
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
    "concreteType": "VerifyPayload",
    "kind": "LinkedField",
    "name": "verifyToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "payload",
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
    "name": "verifyTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "verifyTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "42558d5601ed34d069abe7f5227624f5",
    "id": null,
    "metadata": {},
    "name": "verifyTokenMutation",
    "operationKind": "mutation",
    "text": "mutation verifyTokenMutation(\n  $token: String!\n) {\n  verifyToken(input: {token: $token}) {\n    payload\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb4fe6602936106ba8e280ff96a5057c";

export default node;
