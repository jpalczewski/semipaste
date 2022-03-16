/**
 * @generated SignedSource<<d554b55000f59ba4685336cbd9a8297a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type usersQuery$variables = {||};
export type usersQuery$data = {|
  +allPasteBin: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +title: string,
        +pasteText: string,
      |},
    |}>,
  |},
|};
export type usersQuery = {|
  variables: usersQuery$variables,
  response: usersQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pasteText",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "usersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PasteBinNodeConnection",
        "kind": "LinkedField",
        "name": "allPasteBin",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PasteBinNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PasteBinNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PasteBinNodeConnection",
        "kind": "LinkedField",
        "name": "allPasteBin",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PasteBinNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PasteBinNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad9a2753213f457e085aae51a1d61329",
    "id": null,
    "metadata": {},
    "name": "usersQuery",
    "operationKind": "query",
    "text": "query usersQuery {\n  allPasteBin {\n    edges {\n      node {\n        title\n        pasteText\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "92453e664dc13314fe9b02d592e2f1b1";

module.exports = ((node/*: any*/)/*: Query<
  usersQuery$variables,
  usersQuery$data,
>*/);
