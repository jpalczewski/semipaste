/**
 * @generated SignedSource<<d22b4c6dda67448e951dc19b12358de0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type allPasteBinQuery$variables = {};
export type allPasteBinQuery$data = {
  readonly allPasteBin: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title: string;
        readonly text: string;
        readonly dateOfCreation: any;
        readonly id: string;
        readonly exposure: boolean;
        readonly dateOfExpiry: any | null;
      } | null;
    } | null>;
  } | null;
};
export type allPasteBinQuery = {
  variables: allPasteBinQuery$variables;
  response: allPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateOfCreation",
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
                "name": "exposure",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateOfExpiry",
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
    "name": "allPasteBinQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "allPasteBinQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5f31dd16b5ea717830b3f8d08d3e8c66",
    "id": null,
    "metadata": {},
    "name": "allPasteBinQuery",
    "operationKind": "query",
    "text": "query allPasteBinQuery {\n  allPasteBin {\n    edges {\n      node {\n        title\n        text\n        dateOfCreation\n        id\n        exposure\n        dateOfExpiry\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2de4c20e1a8dc4583f370bf8d8bb7a94";

export default node;
