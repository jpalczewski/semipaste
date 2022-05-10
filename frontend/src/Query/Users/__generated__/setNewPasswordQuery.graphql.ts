/**
 * @generated SignedSource<<eb797ed1d93be90240e6e1cfeadb815d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type setNewPasswordQuery$variables = {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type setNewPasswordQuery$data = {
  readonly setNewPassword: {
    readonly ok: boolean | null;
    readonly response: string | null;
  } | null;
};
export type setNewPasswordQuery = {
  variables: setNewPasswordQuery$variables;
  response: setNewPasswordQuery$data;
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
    "name": "setNewPasswordQuery",
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
    "name": "setNewPasswordQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "f69de8196404b924974579a39eac54d2",
    "id": null,
    "metadata": {},
    "name": "setNewPasswordQuery",
    "operationKind": "mutation",
    "text": "mutation setNewPasswordQuery(\n  $email: String!\n  $code: String!\n  $newPassword: String!\n  $confirmNewPassword: String!\n) {\n  setNewPassword(input: {email: $email, code: $code, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword}) {\n    ok\n    response\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce60696da254205e5fb53667348efa1b";

export default node;
