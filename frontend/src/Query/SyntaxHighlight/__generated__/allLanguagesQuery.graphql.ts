/**
 * @generated SignedSource<<97164bf2285718ce70d8c4eb36cb7af7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type allLanguagesQuery$variables = {};
export type allLanguagesQuery$data = {
  readonly allLanguages: ReadonlyArray<string | null> | null;
};
export type allLanguagesQuery = {
  variables: allLanguagesQuery$variables;
  response: allLanguagesQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "allLanguages",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "allLanguagesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "allLanguagesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "08d16cccc3d28fd5246d9ff9ca19971b",
    "id": null,
    "metadata": {},
    "name": "allLanguagesQuery",
    "operationKind": "query",
    "text": "query allLanguagesQuery {\n  allLanguages\n}\n"
  }
};
})();

(node as any).hash = "233bdcbc3db9633e9167b66bc36f3321";

export default node;
