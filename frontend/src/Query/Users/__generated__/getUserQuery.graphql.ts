/**
 * @generated SignedSource<<e33636196fdd9c284408b529882f9c03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getUserQuery$variables = {
  id: string;
};
export type getUserQuery$data = {
  readonly allUsers: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly username: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly dateJoined: any;
      } | null;
    } | null>;
  } | null;
};
export type getUserQuery = {
  variables: getUserQuery$variables;
  response: getUserQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "UserNodeConnection",
    "kind": "LinkedField",
    "name": "allUsers",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserNodeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "node",
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
                "name": "username",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getUserQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getUserQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "beabf2b7173f3d3e0d73348352479654",
    "id": null,
    "metadata": {},
    "name": "getUserQuery",
    "operationKind": "query",
    "text": "query getUserQuery(\n  $id: ID!\n) {\n  allUsers(id: $id) {\n    edges {\n      node {\n        id\n        username\n        firstName\n        lastName\n        dateJoined\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b8641a754a826e9d9fbe14552259261";

export default node;
