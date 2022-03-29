/**
 * @generated SignedSource<<44c7f1b2c16214909ad501cef12cfd2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type addPasteBinMutation$variables = {
  exposure?: boolean | null;
  text?: string | null;
  title?: string | null;
};
export type addPasteBinMutation$data = {
  readonly addPasteBin: {
    readonly ok: boolean | null;
  } | null;
};
export type addPasteBinMutation = {
  variables: addPasteBinMutation$variables;
  response: addPasteBinMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "exposure"
  },
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "text"
  },
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "exposure",
        "variableName": "exposure"
      },
      {
        "kind": "Variable",
        "name": "text",
        "variableName": "text"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "AddPasteBin",
    "kind": "LinkedField",
    "name": "addPasteBin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "name": "addPasteBinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "addPasteBinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "398bbbd8964d4b79c83b789d3c55a750",
    "id": null,
    "metadata": {},
    "name": "addPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation addPasteBinMutation(\n  $exposure: Boolean\n  $text: String = \"\"\n  $title: String = \"\"\n) {\n  addPasteBin(exposure: $exposure, text: $text, title: $title) {\n    ok\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff7a4e4a5a17e88a757a3de4046ca650";

export default node;
