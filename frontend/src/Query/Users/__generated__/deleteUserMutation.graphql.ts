/**
 * @generated SignedSource<<664cf57df4b1c8ec941e453c57b9d5c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteUserMutation$variables = {
  input: string;
};
export type deleteUserMutation$data = {
  readonly deleteUser: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type deleteUserMutation = {
  variables: deleteUserMutation$variables;
  response: deleteUserMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
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
            "name": "id",
            "variableName": "input"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "DeleteUserPayload",
    "kind": "LinkedField",
    "name": "deleteUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
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
    "name": "deleteUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deleteUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8b807695b3941cd8166148ca9d6b111b",
    "id": null,
    "metadata": {},
    "name": "deleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation deleteUserMutation(\n  $input: ID!\n) {\n  deleteUser(input: {id: $input}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2d244c833b9bfd4e109fa8644a00e9c";

export default node;
