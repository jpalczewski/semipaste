/**
 * @generated SignedSource<<63e0a7b223830dfacc2cd95e1f8cb5c1>>
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
    "alias": null,
    "args": [
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
    "concreteType": "PasteBinNode",
    "kind": "LinkedField",
    "name": "popularPasteBin",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "popularPasteBinQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "popularPasteBinQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "338414f07ff33c8b6f38efdd69b27a4b",
    "id": null,
    "metadata": {},
    "name": "popularPasteBinQuery",
    "operationKind": "query",
    "text": "query popularPasteBinQuery(\n  $mode: String!\n  $topFilter: String\n) {\n  popularPasteBin(mode: $mode, topFilter: $topFilter) {\n    id\n    title\n    text\n    dateOfCreation\n    visible\n    dateOfExpiry\n    language\n    totalRating\n  }\n}\n"
  }
};
})();

(node as any).hash = "9ba345ea4de9eb5fa9df41689bdd015f";

export default node;
