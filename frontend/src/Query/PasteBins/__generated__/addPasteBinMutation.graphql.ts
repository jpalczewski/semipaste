/**
 * @generated SignedSource<<c7701731ff957269209c35c192dba6f2>>
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
  visible: boolean;
  expireAfter?: ExpireChoices | null;
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
  "name": "exposure"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "language"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "text"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
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
            "name": "exposure",
            "variableName": "exposure"
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
      (v3/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "addPasteBinMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "9dc93d18b30085b490f93735054f95d0",
    "id": null,
    "metadata": {},
    "name": "addPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation addPasteBinMutation(\n  $text: String!\n  $title: String!\n  $visible: Boolean!\n  $expireAfter: ExpireChoices = DAY\n  $language: String\n) {\n  addPasteBin(input: {text: $text, title: $title, expireAfter: $expireAfter, visible: $visible, language: $language}) {\n    ok\n    addedPasteId\n  }\n}\n"
  }
};
})();

(node as any).hash = "266f9af41e1c365531ba4f93a662e54b";

export default node;
