# Django
from django.contrib.auth import get_user_model

# 3rd-Party
import graphene
from graphene_django.utils.testing import GraphQLTestCase
from graphene.test import Client

# Project
from schema import Mutation, Query
from ..factories import PasteBinFactory
from users.factories import UserFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        self.user = User
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showAllPasteBins_beforeAddMutation(self) -> None:
        query = """query{allPasteBin {edges {node {id title text exposure expireAfter author{id}}}}}"""
        response = self.client.execute(query)
        self.assertEqual(response["data"]["allPasteBin"]["edges"], [])

    def test_02_addPasteBin_mutation(self) -> None:
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)

    def test_03_showPasteBin_id_1(self) -> None:
        id_query = """query{ allPasteBin { edges { node { id}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
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
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
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
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(title_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["title"], pasteBin.title)

    def test_06_showPasteBin_title_2(self) -> None:
        title_query = """query($title: String){ allPasteBin(title: $title) { edges { node { title}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables_mutation = {"title": pasteBin.title,
                              "text": pasteBin.text,
                              "exposure": pasteBin.exposure,
                              "expireAfter": pasteBin.expire_after}
        variables_query = {
            "title": pasteBin.title
        }
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(title_query, variable_values=variables_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["title"], pasteBin.title)

    def test_07_showPasteBin_text(self) -> None:
        text_query = """query{ allPasteBin { edges { node { text}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables_mutation = {"title": pasteBin.title,
                              "text": pasteBin.text,
                              "exposure": pasteBin.exposure,
                              "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(text_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["text"], pasteBin.text)

    def test_08_showPasteBin_exposure(self) -> None:
        exposure_query = """query{ allPasteBin { edges { node { exposure}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables_mutation = {"title": pasteBin.title,
                              "text": pasteBin.text,
                              "exposure": pasteBin.exposure,
                              "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(exposure_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["exposure"], pasteBin.exposure)

    def test_09_showPasteBin_expireAfter_DAY(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "DAY"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "DAY")

    def test_10_showPasteBin_expireAfter_NEVER(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "NEVER"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "NEVER")

    def test_11_showPasteBin_expireAfter_HOUR(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "HOUR"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "HOUR")

    def test_12_showPasteBin_expireAfter_WEEK(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "WEEK"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "WEEK")

    def test_13_showPasteBin_expireAfter_MONTH(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "MONTH"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "MONTH")

    def test_14_showPasteBin_expireAfter_YEAR(self) -> None:
        expireafter_query = """query{ allPasteBin { edges { node { expireAfter}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        variables_mutation = {"title": "Title test",
                              "text": "Text test",
                              "exposure": True,
                              "expireAfter": "YEAR"}
        mutation_result = self.client.execute(mutation, variable_values=variables_mutation, context=self.user)
        query_result = self.client.execute(expireafter_query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], "YEAR")

    def test_15_showPasteBins_afterAddMutation(self) -> None:
        query = """query{allPasteBin {edges {node {id title text exposure expireAfter author{id}}}}}"""
        mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        pasteBin = PasteBinFactory()
        variables = {"title": pasteBin.title,
                     "text": pasteBin.text,
                     "exposure": pasteBin.exposure,
                     "expireAfter": pasteBin.expire_after}
        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"], '21')
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["title"], pasteBin.title)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["text"], pasteBin.text)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["exposure"], pasteBin.exposure)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"], pasteBin.expire_after)
        self.assertEqual(query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"], pasteBin.author)

    def test_16_deletePasteBin_mutation(self) -> None:
        id_query = """query{ allPasteBin { edges { node { id}}}}"""
        add_mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        delete_mutation = """mutation($id: ID!){deletePasteBin(id: $id) {ok error errorCode}}"""
        pasteBin = PasteBinFactory()
        add_variables = {"title": pasteBin.title,
                         "text": pasteBin.text,
                         "exposure": pasteBin.exposure,
                         "expireAfter": pasteBin.expire_after}
        add_mutation_result = self.client.execute(add_mutation, variable_values=add_variables, context=self.user)
        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["ok"], True)
        query_result = self.client.execute(id_query)
        pasteBinID = query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"]
        delete_variables = {"id": pasteBinID}
        delete_mutation_result = self.client.execute(delete_mutation, variable_values=delete_variables,
                                                     context=self.user)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], True)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["error"], None)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["errorCode"], None)

    def test_17_deletePasteBin_dont_own_mutation(self) -> None:
        id_query = """query{ allPasteBin { edges { node { id}}}}"""
        add_mutation = """mutation($title: String! $text: String! $exposure: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,exposure: $exposure ,expireAfter: $expireAfter}) {ok}} """
        delete_mutation = """mutation($id: ID!){deletePasteBin(id: $id) {ok error errorCode}}"""
        pasteBin = PasteBinFactory()
        add_variables = {"title": pasteBin.title,
                         "text": pasteBin.text,
                         "exposure": pasteBin.exposure,
                         "expireAfter": pasteBin.expire_after}
        add_mutation_result = self.client.execute(add_mutation, variable_values=add_variables, context=self.user)
        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["ok"], True)
        query_result = self.client.execute(id_query)
        pasteBinID = query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"]
        delete_variables = {"id": pasteBinID}
        user = self.user
        user.user.is_superuser = False
        delete_mutation_result = self.client.execute(delete_mutation, variable_values=delete_variables, context=user)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], False)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["error"],
                         "You can\'t delete paste that you don't own")
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["errorCode"], "PERMISSIONDENIED")

    def test_18_deletePasteBin_doesnt_exist_mutation(self) -> None:
        delete_mutation = """mutation($id: ID!){deletePasteBin(id: $id) {ok error errorCode}}"""
        delete_variables = {"id": 999}
        delete_mutation_result = self.client.execute(delete_mutation, variable_values=delete_variables,
                                                     context=self.user)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], False)
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["error"], "Requested paste doesn't exist")
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["errorCode"], "NONEXISTENTPASTE")
