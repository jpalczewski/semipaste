/**
 * @generated SignedSource<<e68aab18333319b8b3d9863afeffcbf2>>
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
  password?: string | null;
  description?: string | null;
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
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
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
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
        "name": "password",
        "variableName": "password"
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
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "editUserMutation",
    "selections": (v7/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v6/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "editUserMutation",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "4f98d0d7ec806ceb3885d6434f080b96",
    "id": null,
    "metadata": {},
    "name": "editUserMutation",
    "operationKind": "mutation",
    "text": "mutation editUserMutation(\n  $id: ID!\n  $username: String = null\n  $lastName: String = null\n  $firstName: String = null\n  $email: String = null\n  $password: String\n  $description: String = null\n) {\n  editUser(id: $id, username: $username, lastName: $lastName, firstName: $firstName, email: $email, password: $password, description: $description) {\n    ok\n  }\n}\n"
  }
};
})();

(node as any).hash = "471c43ed9300c504ac467d26bdd914e4";

export default node;
