/**
 * @generated SignedSource<<44069b01bb2c6287f30b0140310cd13e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type activePasteBinQuery$variables = {};
export type activePasteBinQuery$data = {
  readonly activePasteBin: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title: string;
        readonly text: string;
        readonly dateOfCreation: any;
        readonly id: string;
        readonly visible: boolean;
        readonly dateOfExpiry: any | null;
        readonly language: string;
      } | null;
    } | null>;
  } | null;
};
export type activePasteBinQuery = {
  variables: activePasteBinQuery$variables;
  response: activePasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ActivePasteBinConnection",
    "kind": "LinkedField",
    "name": "activePasteBin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActivePasteBinEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivePasteBin",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "language",
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
    "name": "activePasteBinQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "activePasteBinQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f513d1f23032c38a8d4ebdc4acef6f99",
    "id": null,
    "metadata": {},
    "name": "activePasteBinQuery",
    "operationKind": "query",
    "text": "query activePasteBinQuery {\n  activePasteBin {\n    edges {\n      node {\n        title\n        text\n        dateOfCreation\n        id\n        visible\n        dateOfExpiry\n        language\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4da96e045c7b3e213bc8164b9771c699";

export default node;
