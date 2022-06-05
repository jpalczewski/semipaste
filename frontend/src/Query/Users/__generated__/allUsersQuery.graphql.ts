/**
 * @generated SignedSource<<01458b308c618b1c8b6245bbbbde7895>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type allUsersQuery$variables = {};
export type allUsersQuery$data = {
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
export type allUsersQuery = {
  variables: allUsersQuery$variables;
  response: allUsersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "allUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "allUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "705bdde444efcae12c2e4e24ba037958",
    "id": null,
    "metadata": {},
    "name": "allUsersQuery",
    "operationKind": "query",
    "text": "query allUsersQuery {\n  allUsers {\n    edges {\n      node {\n        username\n        firstName\n        lastName\n        id\n        email\n        dateJoined\n        isVerified\n        isStaff\n        isSuperuser\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "32ddeae5e52859a8402b82d84b989662";

export default node;
