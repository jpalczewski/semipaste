/**
 * @generated SignedSource<<b481b3afc307fc4d99ba9386bfad4e2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type addAttachmentMutation$variables = {
  token: string;
};
export type addAttachmentMutation$data = {
  readonly addAttachment: {
    readonly ok: boolean | null;
    readonly error: string | null;
  } | null;
};
export type addAttachmentMutation = {
  variables: addAttachmentMutation$variables;
  response: addAttachmentMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
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
            "name": "token",
            "variableName": "token"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "AddAttachmentPayload",
    "kind": "LinkedField",
    "name": "addAttachment",
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
    "name": "addAttachmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "addAttachmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c078b756db3b2b0531bea1c2d6d9502c",
    "id": null,
    "metadata": {},
    "name": "addAttachmentMutation",
    "operationKind": "mutation",
    "text": "mutation addAttachmentMutation(\n  $token: String!\n) {\n  addAttachment(input: {token: $token}) {\n    ok\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "17f6a2ef5a345ae6a2b6c8df8db5ee8e";

export default node;
