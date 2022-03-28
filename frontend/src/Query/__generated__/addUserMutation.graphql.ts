/**
 * @generated SignedSource<<2aef2b722261c4560003770ecb301ec4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddUserInput = {
  username: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  id?: string | null;
  clientMutationId?: string | null;
};
export type addUserMutation$variables = {
  input: AddUserInput;
};
export type addUserMutation$data = {
  readonly addUser: {
    readonly user: {
      readonly id: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly dateJoined: any;
    } | null;
  } | null;
};
export type addUserMutation = {
  variables: addUserMutation$variables;
  response: addUserMutation$data;
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
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
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
        "concreteType": "UserNode",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dateJoined",
            "storageKey": null
          }
        ],
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
    "name": "addUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "addUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "acd85ae2dda428da993c44ddf140d4bc",
    "id": null,
    "metadata": {},
    "name": "addUserMutation",
    "operationKind": "mutation",
    "text": "mutation addUserMutation(\n  $input: AddUserInput!\n) {\n  addUser(input: $input) {\n    user {\n      id\n      firstName\n      lastName\n      dateJoined\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ca21bfe705c54f32a3fb5076fa8bc78";

export default node;
