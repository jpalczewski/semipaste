/**
 * @generated SignedSource<<493b483ee2735f80fafd580ad96138d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type isPasteBinRatedMutation$variables = {
  paste: string;
};
export type isPasteBinRatedMutation$data = {
  readonly isPasteBinRated: {
    readonly ok: boolean | null;
    readonly error: string | null;
    readonly rate: boolean | null;
    readonly isRated: boolean | null;
    readonly likes: number | null;
    readonly dislikes: number | null;
  } | null;
};
export type isPasteBinRatedMutation = {
  variables: isPasteBinRatedMutation$variables;
  response: isPasteBinRatedMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "paste"
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
            "name": "paste",
            "variableName": "paste"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "IsPasteBinRatedPayload",
    "kind": "LinkedField",
    "name": "isPasteBinRated",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isRated",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "likes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "dislikes",
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
    "name": "isPasteBinRatedMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "isPasteBinRatedMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "367a5765772dd893ea66e54be4855cf9",
    "id": null,
    "metadata": {},
    "name": "isPasteBinRatedMutation",
    "operationKind": "mutation",
    "text": "mutation isPasteBinRatedMutation(\n  $paste: ID!\n) {\n  isPasteBinRated(input: {paste: $paste}) {\n    ok\n    error\n    rate\n    isRated\n    likes\n    dislikes\n  }\n}\n"
  }
};
})();

(node as any).hash = "98ee8f481cf2c5c49a072484f669b171";

export default node;
