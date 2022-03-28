/**
 * @generated SignedSource<<50237db53bef0b9d6726a8c83f4b3d77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type editUserMutation$variables = {
  id: string;
  username?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  email?: string | null;
};
export type editUserMutation$data = {
  readonly editUser: {
    readonly ok: boolean | null;
  } | null;
};
export type editUserMutation = {
  variables: editUserMutation$variables;
  response: editUserMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": "",
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": "",
  "kind": "LocalArgument",
  "name": "firstName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": "",
  "kind": "LocalArgument",
  "name": "lastName"
},
v4 = {
  "defaultValue": "",
  "kind": "LocalArgument",
  "name": "username"
},
v5 = [
  {
    "alias": null,
    "args": [
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "lastName",
        "variableName": "lastName"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "EditUser",
    "kind": "LinkedField",
    "name": "editUser",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "editUserMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "editUserMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "0646cc3b1fb36fab04b6d034f2ff8bbf",
    "id": null,
    "metadata": {},
    "name": "editUserMutation",
    "operationKind": "mutation",
    "text": "mutation editUserMutation(\n  $id: ID!\n  $username: String = \"\"\n  $lastName: String = \"\"\n  $firstName: String = \"\"\n  $email: String = \"\"\n) {\n  editUser(id: $id, username: $username, lastName: $lastName, firstName: $firstName, email: $email) {\n    ok\n  }\n}\n"
  }
};
})();

(node as any).hash = "07a159653208c0a0cb3ec92ab4ee4ce6";

export default node;
