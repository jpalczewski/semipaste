/**
 * @generated SignedSource<<78e129a44f87892a97fd8243f4736ca9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getPasteBinQuery$variables = {
  id: string;
};
export type getPasteBinQuery$data = {
  readonly allPasteBin: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title: string;
        readonly text: string;
        readonly dateOfCreation: any;
        readonly id: string;
        readonly visible: boolean;
        readonly dateOfExpiry: any | null;
        readonly totalRating: number | null;
        readonly language: string;
        readonly author: {
          readonly id: string;
          readonly username: string;
        } | null;
      } | null;
    } | null>;
  } | null;
};
export type getPasteBinQuery = {
  variables: getPasteBinQuery$variables;
  response: getPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "visible",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateOfExpiry",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalRating",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "language",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserNode",
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getPasteBinQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getPasteBinQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "60a4acb7ca0a99707ebeba8fc87b0e7d",
    "id": null,
    "metadata": {},
    "name": "getPasteBinQuery",
    "operationKind": "query",
    "text": "query getPasteBinQuery(\n  $id: ID!\n) {\n  allPasteBin(id: $id) {\n    edges {\n      node {\n        title\n        text\n        dateOfCreation\n        id\n        visible\n        dateOfExpiry\n        totalRating\n        language\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "445060e33d706a19765dfab1a4f4472e";

export default node;
