/**
 * @generated SignedSource<<13a2255b0434599eed0b69725e0b7394>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type highlightPreviewMutation$variables = {
  code: string;
  lang: string;
};
export type highlightPreviewMutation$data = {
  readonly highlightPreview: {
    readonly highlight: string | null;
  } | null;
};
export type highlightPreviewMutation = {
  variables: highlightPreviewMutation$variables;
  response: highlightPreviewMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "code"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "lang"
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
            "name": "code",
            "variableName": "code"
          },
          {
            "kind": "Variable",
            "name": "lang",
            "variableName": "lang"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "HighlightPreviewPayload",
    "kind": "LinkedField",
    "name": "highlightPreview",
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
    "name": "highlightPreviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "highlightPreviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aed0bed5d31670ba292c1a137ca68d2b",
    "id": null,
    "metadata": {},
    "name": "highlightPreviewMutation",
    "operationKind": "mutation",
    "text": "mutation highlightPreviewMutation(\n  $code: String!\n  $lang: String!\n) {\n  highlightPreview(input: {code: $code, lang: $lang}) {\n    highlight\n  }\n}\n"
  }
};
})();

(node as any).hash = "c5776ecb7fc6f2932acfe479e5aaa71a";

export default node;
