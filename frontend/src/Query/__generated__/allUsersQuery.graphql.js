/**
 * @generated SignedSource<<e3d3c47ff9d71c9f84a17d2fc4047382>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type allUsersQuery$variables = {||};
export type allUsersQuery$data = {|
  +allUsers: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +username: string,
        +firstName: string,
        +lastName: string,
        +id: string,
        +email: string,
        +dateJoined: any,
      |},
    |}>,
  |},
|};
export type allUsersQuery = {|
  variables: allUsersQuery$variables,
  response: allUsersQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "cacheID": "b292245b4c9a14b3c099a0338454a707",
    "id": null,
    "metadata": {},
    "name": "allUsersQuery",
    "operationKind": "query",
    "text": "query allUsersQuery {\n  allUsers {\n    edges {\n      node {\n        username\n        firstName\n        lastName\n        id\n        email\n        dateJoined\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "91c8e27e175500b80b08336ebb2f5eb2";

module.exports = ((node/*: any*/)/*: Query<
  allUsersQuery$variables,
  allUsersQuery$data,
>*/);
