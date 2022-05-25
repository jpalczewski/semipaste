/**
 * @generated SignedSource<<20fb43b24a8574ed3a81a30446cdc81f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deletePasteBinMutation$variables = {
  id: string;
};
export type deletePasteBinMutation$data = {
  readonly deletePasteBin: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type deletePasteBinMutation = {
  variables: deletePasteBinMutation$variables;
  response: deletePasteBinMutation$data;
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
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "DeletePasteBin",
    "kind": "LinkedField",
    "name": "deletePasteBin",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deletePasteBinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deletePasteBinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "61a331a272d8d175a2ce4885ec18d6c8",
    "id": null,
    "metadata": {},
    "name": "deletePasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation deletePasteBinMutation(\n  $id: ID!\n) {\n  deletePasteBin(id: $id) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "69bef7acfe55c2b551e65efab2c62680";

export default node;
