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

    def test_03_showPasteBin_id_1(self) -> None:
        id_query = """query{ allPasteBin { edges { node { id}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(id_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"id": "2"}}]}}}, query_result)

    def test_04_showPasteBin_id_2(self) -> None:
        id_query = """query{ allPasteBin(id: 3) { edges { node { id title text exposure expireAfter author {id}}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(id_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual(
            {"data": {
                "allPasteBin": {
                    "edges": [
                        {
                            "node": {
                                "id": "3",
                                "title": "Title test",
                                "text": "Paste text test",
                                "exposure": True,
                                "expireAfter": "DAY",
                                "author": {'id': '4'}
                            }
                        }
                    ]
                }
            }
            }, query_result)

    def test_05_showPasteBin_title_1(self) -> None:
        title_query = """query{ allPasteBin { edges { node { title}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(title_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"title": "Title test"}}]}}}, query_result)

    def test_06_showPasteBin_title_2(self) -> None:
        title_query = ("""query{ allPasteBin(title: "Title test") { edges { node { title}}}}""")
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(title_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"title": "Title test"}}]}}}, query_result)

    def test_07_showPasteBin_text(self) -> None:
        text_query = """query{ allPasteBin { edges { node { text}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(text_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"text": "Paste text test"}}]}}},
                             query_result, )

    def test_08_showPasteBin_exposure(self) -> None:
        exposure_query = """query{ allPasteBin { edges { node { exposure}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(exposure_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"exposure": True}}]}}}, query_result)

    def test_09_showPasteBin_expireAfter_DAY(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(self.mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "DAY"}}]}}}, query_result)

    def test_10_showPasteBin_expireAfter_NEVER(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(
            """mutation{addPasteBin(title: "Title test 1", text: "Paste text test", exposure: true, expireAfter: "NEVER") {ok}}""",
            context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "NEVER"}}]}}}, query_result)
