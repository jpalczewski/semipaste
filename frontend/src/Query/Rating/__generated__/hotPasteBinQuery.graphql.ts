/**
 * @generated SignedSource<<30fbc0a4ee6acc19ea15960ec2a5cd76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type hotPasteBinQuery$variables = {};
export type hotPasteBinQuery$data = {
  readonly hotPasteBin: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly text: string;
    readonly dateOfCreation: any;
    readonly visible: boolean;
    readonly dateOfExpiry: any | null;
    readonly language: string;
    readonly totalRating: number | null;
  } | null> | null;
};
export type hotPasteBinQuery = {
  variables: hotPasteBinQuery$variables;
  response: hotPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PasteBinNode",
    "kind": "LinkedField",
    "name": "hotPasteBin",
    "plural": true,
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
        "name": "language",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalRating",
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
    "name": "hotPasteBinQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "hotPasteBinQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d51d8f6a5f2f9aa4322c576c3a3ba72f",
    "id": null,
    "metadata": {},
    "name": "hotPasteBinQuery",
    "operationKind": "query",
    "text": "query hotPasteBinQuery {\n  hotPasteBin {\n    id\n    title\n    text\n    dateOfCreation\n    visible\n    dateOfExpiry\n    language\n    totalRating\n  }\n}\n"
  }
};
})();

(node as any).hash = "db7c680ce098469713f8af9298326753";

export default node;
