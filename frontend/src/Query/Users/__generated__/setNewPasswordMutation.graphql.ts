/**
 * @generated SignedSource<<3a92fed0d603949025f56a9076b55d6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type setNewPasswordMutation$variables = {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type setNewPasswordMutation$data = {
  readonly setNewPassword: {
    readonly ok: boolean | null;
    readonly response: string | null;
  } | null;
};
export type setNewPasswordMutation = {
  variables: setNewPasswordMutation$variables;
  response: setNewPasswordMutation$data;
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
  "name": "confirmNewPassword"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newPassword"
},
v4 = [
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
            "name": "confirmNewPassword",
            "variableName": "confirmNewPassword"
          },
          {
            "kind": "Variable",
            "name": "email",
            "variableName": "email"
          },
          {
            "kind": "Variable",
            "name": "newPassword",
            "variableName": "newPassword"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SetNewPasswordPayload",
    "kind": "LinkedField",
    "name": "setNewPassword",
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "setNewPasswordMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "setNewPasswordMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "37c9f9d99bbda1656a6bab50e09a2743",
    "id": null,
    "metadata": {},
    "name": "setNewPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation setNewPasswordMutation(\n  $email: String!\n  $code: String!\n  $newPassword: String!\n  $confirmNewPassword: String!\n) {\n  setNewPassword(input: {email: $email, code: $code, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword}) {\n    ok\n    response\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c0173848930d02f0757ad2b779c4be4";

export default node;
