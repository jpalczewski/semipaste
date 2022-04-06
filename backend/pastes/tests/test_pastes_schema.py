# Django
from django.contrib.auth import get_user_model
from django.test import TestCase

# 3rd-Party
import graphene
from graphene_django.utils.testing import GraphQLTestCase
from graphene.test import Client

# Project
from schema import Mutation, Query
from ..factories import PasteBinFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class Object:
            user = get_user_model().objects.create(
                username="test",
                email="t@t.pl",
                password="123",
                is_superuser=True)

        self.user = Object
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showAllPasteBins_beforeAddMutation(self) -> None:
        query = """query{allPasteBin {edges {node {id title text exposure expireAfter author{id}}}}}"""
        response = self.client.execute(query)
        self.assertEqual(response["data"]["allPasteBin"]["edges"], [])

    def test_02_addPasteBin_mutation(self) -> None:
        mutation = """mutation($title: String $text: String $exposure: Boolean $expireAfter: String){addPasteBin(
        title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)

    def test_03_showPasteBin_id_1(self) -> None:
        id_query = """query{ allPasteBin { edges { node { id}}}}"""
        mutation = """mutation($title: String $text: String $exposure: Boolean $expireAfter: String){addPasteBin(
                title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"], '3')

    def test_04_showPasteBin_id_2(self) -> None:
        id_query = """query{ allPasteBin(id: 5) { edges { node { id title text exposure expireAfter author {id}}}}}"""
        mutation = """mutation($title: String $text: String $exposure: Boolean $expireAfter: String){addPasteBin(
                title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"], '5')

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

    def test_11_showPasteBin_expireAfter_HOUR(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(
            """mutation{addPasteBin(title: "Title test 1", text: "Paste text test", exposure: true, expireAfter: "HOUR") {ok}}""",
            context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "HOUR"}}]}}}, query_result)

    def test_12_showPasteBin_expireAfter_WEEK(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(
            """mutation{addPasteBin(title: "Title test 1", text: "Paste text test", exposure: true, expireAfter: "WEEK") {ok}}""",
            context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "WEEK"}}]}}}, query_result)

    def test_13_showPasteBin_expireAfter_MONTH(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(
            """mutation{addPasteBin(title: "Title test", text: "Paste text test", exposure: true, expireAfter: "MONTH") {ok}}""",
            context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "MONTH"}}]}}}, query_result)

    def test_14_showPasteBin_expireAfter_YEAR(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation_result = self.client.execute(
            """mutation{addPasteBin(title: "Title test", text: "Paste text test", exposure: true, expireAfter: "YEAR") {ok}}""",
            context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertDictEqual({"data": {"addPasteBin": {"ok": True}}}, mutation_result)
        self.assertDictEqual({"data": {"allPasteBin": {"edges": [{"node": {"expireAfter": "YEAR"}}]}}}, query_result)

    def test_15_showPasteBins_afterAddMutation(self) -> None:
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
                                    "id": '14',
                                    "title": "Title test",
                                    "text": "Paste text test",
                                    "exposure": True,
                                    "expireAfter": "DAY",
                                    "author": {'id': '15'}
                                }
                            }
                        ]
                    }
                }
            },
            query_result
        )
