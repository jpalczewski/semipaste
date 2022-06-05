/**
 * @generated SignedSource<<2e6d0d9817d3e88ff866488336ab34b8>>
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
        readonly username: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly id: string;
        readonly email: string;
        readonly dateJoined: any;
        readonly isVerified: boolean;
        readonly isStaff: boolean;
        readonly isSuperuser: boolean;
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
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateJoined",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerified",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isStaff",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSuperuser",
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
    "cacheID": "c7f280abdca904082fc4126e00992212",
    "id": null,
    "metadata": {},
    "name": "getUserQuery",
    "operationKind": "query",
    "text": "query getUserQuery(\n  $id: ID!\n) {\n  allUsers(id: $id) {\n    edges {\n      node {\n        username\n        firstName\n        lastName\n        id\n        email\n        dateJoined\n        isVerified\n        isStaff\n        isSuperuser\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd3ce248bb4ebc4fabd65684b35fbea2";

export default node;
