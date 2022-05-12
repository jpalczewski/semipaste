/**
 * @generated SignedSource<<de569a836af6db75ebb719530dd0b761>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type activePasteBinFragment$data = {
  readonly title: string;
  readonly text: string;
  readonly dateOfCreation: any;
  readonly dateOfExpiry: any | null;
  readonly language: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly totalRating: number | null;
  readonly " $fragmentType": "activePasteBinFragment";
};
export type activePasteBinFragment$key = {
  readonly " $data"?: activePasteBinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"activePasteBinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "activePasteBinFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateOfCreation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateOfExpiry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "language",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dislikes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalRating",
      "storageKey": null
    }
  ],
  "type": "ActivePasteBin",
  "abstractKey": null
};

(node as any).hash = "96e560df8a3da5ee28b5e2e63d6c32ee";

export default node;
