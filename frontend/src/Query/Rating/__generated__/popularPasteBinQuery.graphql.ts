/**
 * @generated SignedSource<<1ee6b91438479bb800ba0e2e882ce74d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type popularPasteBinQuery$variables = {
  mode: string;
  topFilter?: string | null;
};
export type popularPasteBinQuery$data = {
  readonly popularPasteBin: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly text: string;
    readonly dateOfCreation: any;
    readonly visible: boolean;
    readonly dateOfExpiry: any | null;
    readonly language: string;
    readonly totalRating: number | null;
    readonly likes: number | null;
    readonly dislikes: number | null;
    readonly author: {
      readonly username: string;
    } | null;
  } | null> | null;
};
export type popularPasteBinQuery = {
  variables: popularPasteBinQuery$variables;
  response: popularPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mode"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topFilter"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "mode",
    "variableName": "mode"
  },
  {
    "kind": "Variable",
    "name": "topFilter",
    "variableName": "topFilter"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfCreation",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visible",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfExpiry",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "language",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalRating",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likes",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dislikes",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "popularPasteBinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PasteBinNode",
        "kind": "LinkedField",
        "name": "popularPasteBin",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              (v12/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "popularPasteBinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PasteBinNode",
        "kind": "LinkedField",
        "name": "popularPasteBin",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0cf88f0db0e678953a34517316b5125c",
    "id": null,
    "metadata": {},
    "name": "popularPasteBinQuery",
    "operationKind": "query",
    "text": "query popularPasteBinQuery(\n  $mode: String!\n  $topFilter: String\n) {\n  popularPasteBin(mode: $mode, topFilter: $topFilter) {\n    id\n    title\n    text\n    dateOfCreation\n    visible\n    dateOfExpiry\n    language\n    totalRating\n    likes\n    dislikes\n    author {\n      username\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cb514926bd28359887304d905f23b0f9";

export default node;
