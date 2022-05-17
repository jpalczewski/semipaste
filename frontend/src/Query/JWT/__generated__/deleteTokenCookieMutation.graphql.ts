/**
 * @generated SignedSource<<f9ccabb028cd0a234df759bc7074ff05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteTokenCookieMutation$variables = {};
export type deleteTokenCookieMutation$data = {
  readonly deleteTokenCookie: {
    readonly deleted: boolean;
  } | null;
};
export type deleteTokenCookieMutation = {
  variables: deleteTokenCookieMutation$variables;
  response: deleteTokenCookieMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "DeleteJSONWebTokenCookie",
    "kind": "LinkedField",
    "name": "deleteTokenCookie",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deleted",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "deleteTokenCookieMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "deleteTokenCookieMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "74cd100796c09d281aecbd6ffba0f560",
    "id": null,
    "metadata": {},
    "name": "deleteTokenCookieMutation",
    "operationKind": "mutation",
    "text": "mutation deleteTokenCookieMutation {\n  deleteTokenCookie {\n    deleted\n  }\n}\n"
  }
};
})();

(node as any).hash = "a114314998d1328b6315deea5acd5c88";

export default node;
