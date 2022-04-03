/**
 * @generated SignedSource<<5f8053c0ed7e87051c38a4bd9ed0505f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type loginMutation$variables = {
  username: string;
  password: string;
};
export type loginMutation$data = {
  readonly tokenAuth: {
    readonly token: string;
  } | null;
};
export type loginMutation = {
  variables: loginMutation$variables;
  response: loginMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
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
    "concreteType": "ObtainJSONWebTokenPayload",
    "kind": "LinkedField",
    "name": "tokenAuth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "loginMutation",
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
    "name": "loginMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7139b487951c95b61d11404eb854c173",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $username: String!\n  $password: String!\n) {\n  tokenAuth(input: {username: $username, password: $password}) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "824bc811c53f471187bc6ab58f315f63";

export default node;
