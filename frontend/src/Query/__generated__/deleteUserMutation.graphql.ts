/**
 * @generated SignedSource<<398420b7c7f69eb7ad5300a18c0013cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type deleteUserMutation$variables = {
  input: string;
};
export type deleteUserMutation$data = {
  readonly deleteUser: {
    readonly ok: boolean | null;
  } | null;
};
export type deleteUserMutation = {
  variables: deleteUserMutation$variables;
  response: deleteUserMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "id",
            variableName: "input",
          },
        ],
        concreteType: "DeleteUser",
        kind: "LinkedField",
        name: "deleteUser",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "ok",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "deleteUserMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "deleteUserMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "6e172649730e76330ef114c07cd4f06f",
      id: null,
      metadata: {},
      name: "deleteUserMutation",
      operationKind: "mutation",
      text: "mutation deleteUserMutation(\n  $input: ID!\n) {\n  deleteUser(id: $input) {\n    ok\n  }\n}\n",
    },
  };
})();

(node as any).hash = "a513419c13e10bea491bd2e084cf99e5";

export default node;
