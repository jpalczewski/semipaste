/**
 * @generated SignedSource<<75579258aa48b975261f32e29149343c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type addUserMutation$variables = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string | null;
  lastName?: string | null;
};
export type addUserMutation$data = {
  readonly addUser: {
    readonly ok: boolean | null;
    readonly response: string | null;
    readonly id: string | null;
  } | null;
};
export type addUserMutation = {
  variables: addUserMutation$variables;
  response: addUserMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "confirmPassword"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "confirmPassword",
            "variableName": "confirmPassword"
          },
          {
            "kind": "Variable",
            "name": "email",
            "variableName": "email"
          },
          {
            "kind": "Variable",
            "name": "firstName",
            "variableName": "firstName"
          },
          {
            "kind": "Variable",
            "name": "lastName",
            "variableName": "lastName"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password"
          },
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "AddUserPayload",
    "kind": "LinkedField",
    "name": "addUser",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "addUserMutation",
    "selections": (v6/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "addUserMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "e6800317fbd5748d1dcbbaebb3d6689c",
    "id": null,
    "metadata": {},
    "name": "addUserMutation",
    "operationKind": "mutation",
    "text": "mutation addUserMutation(\n  $username: String!\n  $email: String!\n  $password: String!\n  $confirmPassword: String!\n  $firstName: String\n  $lastName: String\n) {\n  addUser(input: {username: $username, email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName}) {\n    ok\n    response\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "59a1dde411d587e3ec53fb8d551f7b3e";

export default node;
