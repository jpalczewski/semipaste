/**
 * @generated SignedSource<<106b3422b1a404114376cb978ba569bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type passwordRecoveryMutation$variables = {
  email: string;
};
export type passwordRecoveryMutation$data = {
  readonly sendNewPasswordToken: {
    readonly ok: boolean | null;
    readonly response: string | null;
  } | null;
};
export type passwordRecoveryMutation = {
  variables: passwordRecoveryMutation$variables;
  response: passwordRecoveryMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
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
            "name": "email",
            "variableName": "email"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SendNewPasswordTokenPayload",
    "kind": "LinkedField",
    "name": "sendNewPasswordToken",
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
        "name": "response",
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
    "name": "passwordRecoveryMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "passwordRecoveryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6f396dfa138e3cf745d51916a6f7ad44",
    "id": null,
    "metadata": {},
    "name": "passwordRecoveryMutation",
    "operationKind": "mutation",
    "text": "mutation passwordRecoveryMutation(\n  $email: String!\n) {\n  sendNewPasswordToken(input: {email: $email}) {\n    ok\n    response\n  }\n}\n"
  }
};
})();

(node as any).hash = "96bcc2cac14a33630f4c032ba5aa73ba";

export default node;
