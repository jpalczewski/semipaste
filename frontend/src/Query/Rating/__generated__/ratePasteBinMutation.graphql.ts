/**
 * @generated SignedSource<<ab5a9825ec446a2cb63e6483a0010cfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ratePasteBinMutation$variables = {
  paste: string;
  liked: boolean;
};
export type ratePasteBinMutation$data = {
  readonly ratePasteBin: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type ratePasteBinMutation = {
  variables: ratePasteBinMutation$variables;
  response: ratePasteBinMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "liked"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "paste"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "liked",
            "variableName": "liked"
          },
          {
            "kind": "Variable",
            "name": "paste",
            "variableName": "paste"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RatingPasteBinPayload",
    "kind": "LinkedField",
    "name": "ratePasteBin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ratePasteBinMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ratePasteBinMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f8bfa7dd9367e4496c7ce48f127207e9",
    "id": null,
    "metadata": {},
    "name": "ratePasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation ratePasteBinMutation(\n  $paste: ID!\n  $liked: Boolean!\n) {\n  ratePasteBin(input: {paste: $paste, liked: $liked}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "05972aa85f3dc3bc2d53301711008f00";

export default node;
