/**
 * @generated SignedSource<<f15a190aca6c256dd6eca3475f38e688>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type allPasteBinQuery$variables = {
  first?: number | null;
  offset?: number | null;
  title_Icontains?: string | null;
  title_Istartswith?: string | null;
  title_Iendswith?: string | null;
  dateOfCreation_Gte?: any | null;
  dateOfCreation_Lte?: any | null;
  language?: string | null;
  author__Username?: string | null;
};
export type allPasteBinQuery$data = {
  readonly allPasteBin: {
    readonly totalCount: number | null;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title: string;
        readonly text: string;
        readonly dateOfCreation: any;
        readonly id: string;
        readonly visible: boolean;
        readonly dateOfExpiry: any | null;
        readonly language: string;
        readonly totalRating: number | null;
        readonly likes: number;
        readonly dislikes: number;
        readonly author: {
          readonly username: string;
        } | null;
      } | null;
    } | null>;
  } | null;
};
export type allPasteBinQuery = {
  variables: allPasteBinQuery$variables;
  response: allPasteBinQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "author__Username"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateOfCreation_Gte"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateOfCreation_Lte"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "language"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "offset"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title_Icontains"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title_Iendswith"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title_Istartswith"
},
v9 = [
  {
    "kind": "Variable",
    "name": "author_Username",
    "variableName": "author__Username"
  },
  {
    "kind": "Variable",
    "name": "dateOfCreation_Gte",
    "variableName": "dateOfCreation_Gte"
  },
  {
    "kind": "Variable",
    "name": "dateOfCreation_Lte",
    "variableName": "dateOfCreation_Lte"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "language",
    "variableName": "language"
  },
  {
    "kind": "Variable",
    "name": "offset",
    "variableName": "offset"
  },
  {
    "kind": "Variable",
    "name": "title_Icontains",
    "variableName": "title_Icontains"
  },
  {
    "kind": "Variable",
    "name": "title_Iendswith",
    "variableName": "title_Iendswith"
  },
  {
    "kind": "Variable",
    "name": "title_Istartswith",
    "variableName": "title_Istartswith"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfCreation",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visible",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfExpiry",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "language",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalRating",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likes",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dislikes",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "allPasteBinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "PasteBinNodeConnection",
        "kind": "LinkedField",
        "name": "allPasteBin",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PasteBinNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PasteBinNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserNode",
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v21/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v8/*: any*/),
      (v7/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "allPasteBinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "PasteBinNodeConnection",
        "kind": "LinkedField",
        "name": "allPasteBin",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PasteBinNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PasteBinNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserNode",
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v21/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "83b2f58e2ab458b9e9e66b5ac5dab4bf",
    "id": null,
    "metadata": {},
    "name": "allPasteBinQuery",
    "operationKind": "query",
    "text": "query allPasteBinQuery(\n  $first: Int\n  $offset: Int\n  $title_Icontains: String\n  $title_Istartswith: String\n  $title_Iendswith: String\n  $dateOfCreation_Gte: Date\n  $dateOfCreation_Lte: Date\n  $language: String\n  $author__Username: String\n) {\n  allPasteBin(first: $first, offset: $offset, title_Icontains: $title_Icontains, title_Istartswith: $title_Istartswith, title_Iendswith: $title_Iendswith, dateOfCreation_Gte: $dateOfCreation_Gte, dateOfCreation_Lte: $dateOfCreation_Lte, language: $language, author_Username: $author__Username) {\n    totalCount\n    edges {\n      node {\n        title\n        text\n        dateOfCreation\n        id\n        visible\n        dateOfExpiry\n        language\n        totalRating\n        likes\n        dislikes\n        author {\n          username\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "40450144e39363da1e755b21133f05ea";

export default node;
