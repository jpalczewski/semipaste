/**
 * @generated SignedSource<<b14478ffd4795987a6c0344e5b83edbb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type highlightPasteBinMutation$variables = {
  id: string;
};
export type highlightPasteBinMutation$data = {
  readonly highlightPasteBin: {
    readonly highlight: string | null;
  } | null;
};
export type highlightPasteBinMutation = {
  variables: highlightPasteBinMutation$variables;
  response: highlightPasteBinMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "HighlightPasteBinPayload",
    "kind": "LinkedField",
    "name": "highlightPasteBin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "highlight",
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
    "name": "highlightPasteBinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "highlightPasteBinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fc75b2dc272863828f6f3cb465b55802",
    "id": null,
    "metadata": {},
    "name": "highlightPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation highlightPasteBinMutation(\n  $id: ID!\n) {\n  highlightPasteBin(input: {id: $id}) {\n    highlight\n  }\n}\n"
  }
};
})();

(node as any).hash = "31929f09e970a50cc987730eed3a0dcc";

export default node;
