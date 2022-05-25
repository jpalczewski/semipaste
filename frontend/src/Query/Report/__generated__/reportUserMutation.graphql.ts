/**
 * @generated SignedSource<<744dc64126fec50903893df587f1995a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type reportUserMutation$variables = {
  uid: string;
  reason: string;
};
export type reportUserMutation$data = {
  readonly reportUser: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type reportUserMutation = {
  variables: reportUserMutation$variables;
  response: reportUserMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reason"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "uid"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "reason",
            "variableName": "reason"
          },
          {
            "kind": "Variable",
            "name": "uid",
            "variableName": "uid"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ReportUserPayload",
    "kind": "LinkedField",
    "name": "reportUser",
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
    "name": "reportUserMutation",
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
    "name": "reportUserMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e976d906c21b0ecc8befaa5426f72a47",
    "id": null,
    "metadata": {},
    "name": "reportUserMutation",
    "operationKind": "mutation",
    "text": "mutation reportUserMutation(\n  $uid: ID!\n  $reason: String!\n) {\n  reportUser(input: {uid: $uid, reason: $reason}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "eb6b62307bdfaf4b62c03b07bd2263f3";

export default node;
