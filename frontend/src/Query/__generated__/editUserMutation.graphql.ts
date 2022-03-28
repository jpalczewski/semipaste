/**
 * @generated SignedSource<<18fdee14837062e3c43989d13746a833>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type editUserMutation$variables = {
  id: string;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
};
export type editUserMutation$data = {
  readonly editUser: {
    readonly ok: boolean | null;
  } | null;
};
export type editUserMutation = {
  variables: editUserMutation$variables;
  response: editUserMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "email",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "firstName",
    },
    v2 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "id",
    },
    v3 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "lastName",
    },
    v4 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "username",
    },
    v5 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "email",
            variableName: "email",
          },
          {
            kind: "Variable",
            name: "firstName",
            variableName: "firstName",
          },
          {
            kind: "Variable",
            name: "id",
            variableName: "id",
          },
          {
            kind: "Variable",
            name: "lastName",
            variableName: "lastName",
          },
          {
            kind: "Variable",
            name: "username",
            variableName: "username",
          },
        ],
        concreteType: "EditUser",
        kind: "LinkedField",
        name: "editUser",
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
      argumentDefinitions: [
        v0 /*: any*/,
        v1 /*: any*/,
        v2 /*: any*/,
        v3 /*: any*/,
        v4 /*: any*/,
      ],
      kind: "Fragment",
      metadata: null,
      name: "editUserMutation",
      selections: v5 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [
        v2 /*: any*/,
        v4 /*: any*/,
        v3 /*: any*/,
        v1 /*: any*/,
        v0 /*: any*/,
      ],
      kind: "Operation",
      name: "editUserMutation",
      selections: v5 /*: any*/,
    },
    params: {
      cacheID: "f7ebe47a44a5cd69f1fe45e14ff8ca20",
      id: null,
      metadata: {},
      name: "editUserMutation",
      operationKind: "mutation",
      text: "mutation editUserMutation(\n  $id: ID!\n  $username: String!\n  $lastName: String!\n  $firstName: String!\n  $email: String!\n) {\n  editUser(id: $id, username: $username, lastName: $lastName, firstName: $firstName, email: $email) {\n    ok\n  }\n}\n",
    },
  };
})();

(node as any).hash = "62af63d63a1e715ae8917df8482e2992";

export default node;
