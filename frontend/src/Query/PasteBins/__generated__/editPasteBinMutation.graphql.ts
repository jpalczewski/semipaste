/**
 * @generated SignedSource<<8e34df35c9781101c2368aedb5864c30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type editPasteBinMutation$variables = {
  id: string;
  title?: string | null;
  text?: string | null;
  visible?: boolean | null;
  expireAfter?: string | null;
};
export type editPasteBinMutation$data = {
  readonly editPaste: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type editPasteBinMutation = {
  variables: editPasteBinMutation$variables;
  response: editPasteBinMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "expireAfter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "text"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visible"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "expireAfter",
        "variableName": "expireAfter"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
      },
      {
        "kind": "Variable",
        "name": "visible",
        "variableName": "visible"
      }
    ],
    "concreteType": "EditPasteBin",
    "kind": "LinkedField",
    "name": "editPaste",
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "editPasteBinMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "editPasteBinMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "b35a84bc14851223fad1ad593033a20c",
    "id": null,
    "metadata": {},
    "name": "editPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation editPasteBinMutation(\n  $id: ID!\n  $title: String\n  $text: String\n  $visible: Boolean\n  $expireAfter: String\n) {\n  editPaste(id: $id, title: $title, text: $text, visible: $visible, expireAfter: $expireAfter) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "0aa0b24a53281327ee5800798a95e71f";

export default node;
