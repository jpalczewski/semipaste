/**
 * @generated SignedSource<<0385c5bcada9482c18f2986810b38ef8>>
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
    "cacheID": "f01b617befa08b39cbb820ae052255ed",
    "id": null,
    "metadata": {},
    "name": "deleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation deleteUserMutation(\n  $input: ID!\n) {\n  deleteUser(input: {id: $input}) {\n    ok\n  }\n}\n"
  }
};
})();

(node as any).hash = "bf8f7b0889e059b73cb1f04cd74edeea";

export default node;
