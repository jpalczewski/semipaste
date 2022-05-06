/**
 * @generated SignedSource<<7b7002c30014026106e3aea73757f9aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type topPasteBinQuery$variables = {
  mode?: string | null;
};
export type topPasteBinQuery$data = {
  readonly topPasteBin: ReadonlyArray<{
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
export type topPasteBinQuery = {
  variables: topPasteBinQuery$variables;
  response: topPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mode"
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
      }
    ],
    "concreteType": "PasteBinNode",
    "kind": "LinkedField",
    "name": "topPasteBin",
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
    "name": "topPasteBinQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "topPasteBinQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b8e06063a300ca54e76ebf38c7978f2",
    "id": null,
    "metadata": {},
    "name": "topPasteBinQuery",
    "operationKind": "query",
    "text": "query topPasteBinQuery(\n  $mode: String\n) {\n  topPasteBin(mode: $mode) {\n    id\n    title\n    text\n    dateOfCreation\n    visible\n    dateOfExpiry\n    language\n    totalRating\n  }\n}\n"
  }
};
})();

(node as any).hash = "7546a3c078a7ea38a77f77c4c1d32886";

export default node;
