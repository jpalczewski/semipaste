# Django
from django.contrib.auth import get_user_model
from django.test import TestCase

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query


class TestSchema(TestCase):
    def setUp(self) -> None:
        class Object:
            user = get_user_model().objects.create()

        self.user = Object

        self.query = """
            query{
              allPasteBin {
                edges {
                  node {
                    id
                    title
                    text
                    exposure
                    expireAfter
                    author{
                        id
                        }
                  }
                }
              }
            }
        """
        self.mutation = """
        mutation{
          addPasteBin(
            title: "Title test",
            text: "Paste text test",
            exposure: true,
            expireAfter: "DAY"
          ) {
            ok
            }
          }
        """
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showAllPasteBins_beforeAddMutation(self) -> None:
        result = self.client.execute(self.query)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": []}}}, result)

    def test_02_addPasteBin_mutation(self) -> None:
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(self.query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual(
            {
                "data": {
                    "allPasteBin": {
                        "edges": [
                            {
                                "node": {
                                    "id": "1",
                                    "title": "Title test",
                                    "text": "Paste text test",
                                    "exposure": True,
                                    "expireAfter": "DAY",
                                    "author": {'id': '2'}
                                }
                            }
                        ]
                    }
                }
            }, query_result)
