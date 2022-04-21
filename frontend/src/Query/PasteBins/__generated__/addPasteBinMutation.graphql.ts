/**
 * @generated SignedSource<<e35608262fc3c04ea8eb4e5144d1cac1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ExpireChoices = "NEVER" | "MIN" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR" | "%future added value";
export type addPasteBinMutation$variables = {
  text: string;
  title: string;
  expireAfter?: ExpireChoices | null;
  visible: boolean;
  language?: string | null;
};
export type addPasteBinMutation$data = {
  readonly addPasteBin: {
    readonly ok: boolean | null;
    readonly addedPasteId: number | null;
  } | null;
};
export type addPasteBinMutation = {
  variables: addPasteBinMutation$variables;
  response: addPasteBinMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": "DAY",
  "kind": "LocalArgument",
  "name": "expireAfter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "language"
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
        "fields": [
          {
            "kind": "Variable",
            "name": "expireAfter",
            "variableName": "expireAfter"
          },
          {
            "kind": "Variable",
            "name": "language",
            "variableName": "language"
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
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "AddPasteBinPayload",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "addedPasteId",
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
    "name": "addPasteBinMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "addPasteBinMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "f92c77fa9cdbf4b71fdfe31d4dc5cd55",
    "id": null,
    "metadata": {},
    "name": "addPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation addPasteBinMutation(\n  $text: String!\n  $title: String!\n  $expireAfter: ExpireChoices = DAY\n  $visible: Boolean!\n  $language: String\n) {\n  addPasteBin(input: {text: $text, title: $title, expireAfter: $expireAfter, visible: $visible, language: $language}) {\n    ok\n    addedPasteId\n  }\n}\n"
  }
};
})();

(node as any).hash = "829fe6f1870757c51b661cbcaf0c8d43";

export default node;
