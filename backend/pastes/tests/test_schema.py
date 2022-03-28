# Django
from django.test import TestCase

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query


class TestSchema(TestCase):
    def setUp(self) -> None:
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
                  }
                }
              }
            }
        """
        self.mutation = """
        mutation{
          addPasteBin(input: {
            title: "Title test",
            text: "Paste text test",
            exposure: true,
            expireAfter: "DAY"
          }) {
            pasteBin{
              id
              title
              text
              exposure
              expireAfter
            }
          }
        }
        """
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_allPasteBin_query(self) -> None:
        result = self.client.execute(self.query)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": []}}}, result)

    # def test_addPasteBin_mutation(self) -> None:
    #     result = self.client.execute(self.mutation)
    #     self.assertDictEqual(
    #         {
    #             "data": {
    #                 "addPasteBin": {
    #                     "pasteBin": {
    #                         "id": '1',
    #                         "title": "Title test",
    #                         "text": "Paste text test",
    #                         "exposure": True,
    #                         "expireAfter": "DAY",
    #                     }
    #                 }
    #             }
    #         },
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_id_1(self) -> None:
    #     id_query = """query{ allPasteBin { edges { node { id}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(id_query)
    #     self.assertDictEqual(
    #         {"data": {"allPasteBin": {"edges": [{"node": {"id": "5"}}]}}}, result
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_id_2(self) -> None:
    #     id_query = """query{ allPasteBin(id: 6) { edges { node { id title text exposure expireAfter}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(id_query)
    #     self.assertDictEqual(
    #         {
    #             "data": {
    #                 "allPasteBin": {
    #                     "edges": [
    #                         {
    #                             "node": {
    #                                 "id": "6",
    #                                 "title": "Title test",
    #                                 "text": "Paste text test",
    #                                 "exposure": True,
    #                                 "expireAfter": "DAY",
    #                             }
    #                         }
    #                     ]
    #                 }
    #             }
    #         },
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_title_1(self) -> None:
    #     title_query = """query{ allPasteBin { edges { node { title}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(title_query)
    #     self.assertDictEqual(
    #         {"data": {"allPasteBin": {"edges": [{"node": {"title": "Title test"}}]}}},
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_title_2(self) -> None:
    #     title_query = (
    #         """query{ allPasteBin(title: "Title test") { edges { node { title}}}}"""
    #     )
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(title_query)
    #     self.assertDictEqual(
    #         {"data": {"allPasteBin": {"edges": [{"node": {"title": "Title test"}}]}}},
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_pasteText(self) -> None:
    #     pastetext_query = """query{ allPasteBin { edges { node { text}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(pastetext_query)
    #     self.assertDictEqual(
    #         {
    #             "data": {
    #                 "allPasteBin": {
    #                     "edges": [{"node": {"text": "Paste text test"}}]
    #                 }
    #             }
    #         },
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_exposure(self) -> None:
    #     exposure_query = """query{ allPasteBin { edges { node { exposure}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(exposure_query)
    #     self.assertDictEqual(
    #         {"data": {"allPasteBin": {"edges": [{"node": {"exposure": True}}]}}}, result
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query_expireAfter(self) -> None:
    #     expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(expireafter_query)
    #     self.assertDictEqual(
    #         {"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "DAY"}}]}}},
    #         result,
    #     )

    # def test_addPasteBin_mutation_and_allPasteBin_query(self) -> None:
    #     self.client.execute(self.mutation)
    #     result = self.client.execute(self.query)
    #     self.assertDictEqual(
    #         {
    #             "data": {
    #                 "allPasteBin": {
    #                     "edges": [
    #                         {
    #                             "node": {
    #                                 "id": '2',
    #                                 "title": "Title test",
    #                                 "text": "Paste text test",
    #                                 "exposure": True,
    #                                 "expireAfter": "DAY",
    #                             }
    #                         }
    #                     ]
    #                 }
    #             }
    #         },
    #         result,
    #     )
