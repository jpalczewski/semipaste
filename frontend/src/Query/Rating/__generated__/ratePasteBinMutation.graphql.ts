/**
 * @generated SignedSource<<3e278b2fdeb343ce7d80afc746d00c07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ratePasteBinMutation$variables = {
  paste: string;
  liked?: boolean | null;
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
    "cacheID": "3bb008fe958f514aad6f7a191478c629",
    "id": null,
    "metadata": {},
    "name": "ratePasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation ratePasteBinMutation(\n  $paste: ID!\n  $liked: Boolean\n) {\n  ratePasteBin(input: {paste: $paste, liked: $liked}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "220ac7e1ddb1ae4a131de9fe43e9c3a3";

export default node;
