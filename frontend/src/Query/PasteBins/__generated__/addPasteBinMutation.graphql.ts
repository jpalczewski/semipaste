/**
 * @generated SignedSource<<b53d792e50168cad100ec92c0f055a08>>
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
  exposure: boolean;
  expireAfter?: ExpireChoices | null;
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
  "defaultValue": "WEEK",
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
  "name": "text"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v4 = [
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "addPasteBinMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "addPasteBinMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "d0d205fb266a2e1748d2a0a34dc98bb4",
    "id": null,
    "metadata": {},
    "name": "addPasteBinMutation",
    "operationKind": "mutation",
    "text": "mutation addPasteBinMutation(\n  $text: String!\n  $title: String!\n  $exposure: Boolean!\n  $expireAfter: ExpireChoices = WEEK\n) {\n  addPasteBin(input: {text: $text, title: $title, expireAfter: $expireAfter, exposure: $exposure}) {\n    ok\n    addedPasteId\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b1ebc36ec2583a162c102b73286dae0";

export default node;
