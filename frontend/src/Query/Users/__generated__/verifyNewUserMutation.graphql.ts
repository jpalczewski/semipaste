/**
 * @generated SignedSource<<cd8cd036926099555db8d304bd994cc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type verifyNewUserMutation$variables = {
  id: string;
  code: string;
};
export type verifyNewUserMutation$data = {
  readonly verifyNewUser: {
    readonly ok: boolean | null;
    readonly response: string | null;
  } | null;
};
export type verifyNewUserMutation = {
  variables: verifyNewUserMutation$variables;
  response: verifyNewUserMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "code"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "code",
            "variableName": "code"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "VerifyNewUserPayload",
    "kind": "LinkedField",
    "name": "verifyNewUser",
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
        "name": "response",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "verifyNewUserMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "verifyNewUserMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9663eb2c9572e0d726442accc1ae9482",
    "id": null,
    "metadata": {},
    "name": "verifyNewUserMutation",
    "operationKind": "mutation",
    "text": "mutation verifyNewUserMutation(\n  $id: ID!\n  $code: String!\n) {\n  verifyNewUser(input: {id: $id, code: $code}) {\n    ok\n    response\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e10e4f22849b0e5ffe519065547b847";

export default node;
