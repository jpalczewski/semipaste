/**
 * @generated SignedSource<<e341203fafe001963134a43779327ab3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type newPastesBinQuery$variables = {
  dateOfExpiry_Gte?: any | null;
};
export type newPastesBinQuery$data = {
  readonly activePasteBin: {
    readonly totalCount: number | null;
  } | null;
};
export type newPastesBinQuery = {
  variables: newPastesBinQuery$variables;
  response: newPastesBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "dateOfExpiry_Gte"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "dateOfExpiry_Gte",
        "variableName": "dateOfExpiry_Gte"
      }
    ],
    "concreteType": "ActivePasteBinConnection",
    "kind": "LinkedField",
    "name": "activePasteBin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
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
    "name": "newPastesBinQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newPastesBinQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "08cbd88c6638a4b09e3d9e4932d482fb",
    "id": null,
    "metadata": {},
    "name": "newPastesBinQuery",
    "operationKind": "query",
    "text": "query newPastesBinQuery(\n  $dateOfExpiry_Gte: Date\n) {\n  activePasteBin(dateOfExpiry_Gte: $dateOfExpiry_Gte) {\n    totalCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "09ea00cc986b90699186e4980963761f";

export default node;
