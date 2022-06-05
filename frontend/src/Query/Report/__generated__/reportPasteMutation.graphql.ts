/**
 * @generated SignedSource<<dbd318e6b44691dfa353869bc423815a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type reportPasteMutation$variables = {
  pid: string;
  reason: string;
};
export type reportPasteMutation$data = {
  readonly reportPaste: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type reportPasteMutation = {
  variables: reportPasteMutation$variables;
  response: reportPasteMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "pid"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reason"
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
            "name": "pid",
            "variableName": "pid"
          },
          {
            "kind": "Variable",
            "name": "reason",
            "variableName": "reason"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ReportPastePayload",
    "kind": "LinkedField",
    "name": "reportPaste",
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
    "name": "reportPasteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "reportPasteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "af293871c604dde0bef609468498ba58",
    "id": null,
    "metadata": {},
    "name": "reportPasteMutation",
    "operationKind": "mutation",
    "text": "mutation reportPasteMutation(\n  $pid: ID!\n  $reason: String!\n) {\n  reportPaste(input: {pid: $pid, reason: $reason}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "9cc88c658e974d5551b4c8693641199d";

export default node;
