/**
 * @generated SignedSource<<274031f60b049eddceec8b1bf2817180>>
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
        +id: string,
        +username: string,
        +firstName: string,
        +lastName: string,
        +isSuperuser: boolean,
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
    "cacheID": "caa68e98d1a1afcbfa294ded01123235",
    "id": null,
    "metadata": {},
    "name": "allUsersQuery",
    "operationKind": "query",
    "text": "query allUsersQuery {\n  allUsers {\n    edges {\n      node {\n        id\n        username\n        firstName\n        lastName\n        isSuperuser\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "efe541659b306eaccb7933445d7634e8";

module.exports = ((node/*: any*/)/*: Query<
  allUsersQuery$variables,
  allUsersQuery$data,
>*/);
