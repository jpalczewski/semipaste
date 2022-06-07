# Standard Library
import time

# Django
from django.contrib.auth.models import AnonymousUser

# 3rd-Party
import graphene
from graphene.test import Client
from graphene_django.utils.testing import GraphQLTestCase

# Project
from schema import Mutation, Query
from users.factories import UserFactory
from users.models import User

# Local
from ..factories import PasteBinFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        self.user = User()
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    # add_paste_bin
    def test_01_showAllPasteBins_beforeAddMutation(self) -> None:
        query = """query{
                    allPasteBin {
                        edges {
                            node {
                                id
                                title
                                text
                                visible
                                expireAfter
                                author{
                                    id
                                }
                            }
                        }
                    }
                }"""

        response = self.client.execute(query, context=self.user)

        self.assertEqual(response["data"]["allPasteBin"]["edges"], [])

    def test_02_addPasteBin_mutation(self) -> None:
        pasteBin = PasteBinFactory()

        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                    input: {
                        title: $title ,
                        text: $text ,
                        visible: $visible ,
                        expireAfter: $expireAfter}) {
                            ok
                            error
                            errorCode
                        }
                    } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )

    def test_03_showPasteBin_id_1(self) -> None:
        pasteBin = PasteBinFactory()

        id_query = """query{
                        allPasteBin {
                            edges {
                                node {
                                    id
                                    author {
                                        id
                                    }
                                }
                            }
                        }
                    }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        query_result = self.client.execute(id_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '4'
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"], '3'
        )

    def test_04_showPasteBin_id_2(self) -> None:
        pasteBin = PasteBinFactory()

        id_query = """query{
                        allPasteBin(id: 6) {
                            edges {
                                node {
                                    id
                                    title
                                    text
                                    visible
                                    expireAfter
                                    author {
                                        id
                                    }
                                }
                            }
                        }
                    }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        query_result = self.client.execute(id_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"], '6'
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"], '4'
        )

    def test_05_showPasteBin_title_1(self) -> None:
        pasteBin = PasteBinFactory()

        title_query = """query{
                            allPasteBin {
                                edges {
                                    node {
                                        title
                                        author {
                                            id
                                        }
                                    }
                                }
                            }
                        }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        query_result = self.client.execute(title_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"], '5'
        )

    def test_06_showPasteBin_title_2(self) -> None:
        pasteBin = PasteBinFactory()

        title_query = """query(
                            $title: String){
                        allPasteBin(
                            title: $title) {
                                edges {
                                    node {
                                        title
                                        author {
                                            id
                                        }
                                    }
                                }
                            }
                        }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }
        variables_query = {"title": pasteBin.title}

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(title_query, variable_values=variables_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"], '6'
        )

    def test_07_showPasteBin_text(self) -> None:
        pasteBin = PasteBinFactory()

        text_query = """query{
                            allPasteBin {
                                edges {
                                    node {
                                        text
                                        author {
                                            id
                                        }
                                    }
                                }
                            }
                        }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(text_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            pasteBin.text,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"], '7'
        )

    def test_08_showPasteBin_visible(self) -> None:
        pasteBin = PasteBinFactory()

        visible_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            visible
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """

        variables_mutation = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(visible_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"], '8'
        )

    def test_09_showPasteBin_expireAfter_NEVER(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "NEVER",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "NEVER",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '9',
        )

    def test_10_showPasteBin_expireAfter_MIN(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "MIN",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "MIN",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '10',
        )

    def test_11_showPasteBin_expireAfter_HOUR(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "HOUR",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "HOUR",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '11',
        )

    def test_12_showPasteBin_expireAfter_DAY(self) -> None:
        expireafter_query = (
            """query{ allPasteBin { edges { node { expireAfter author {id}}}}}"""
        )
        mutation = """mutation($title: String! $text: String! $visible: Boolean! $expireAfter: ExpireChoices!){
        addPasteBin( input: {title: $title ,text: $text ,visible: $visible ,expireAfter: $expireAfter}) {ok error
        errorCode}} """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "DAY",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "DAY",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"], '12'
        )

    def test_13_showPasteBin_expireAfter_WEEK(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "WEEK",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "WEEK",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '13',
        )

    def test_14_showPasteBin_expireAfter_MONTH(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "MONTH",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "MONTH",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '14',
        )

    def test_15_showPasteBin_expireAfter_YEAR(self) -> None:
        expireafter_query = """query{
                                allPasteBin {
                                    edges {
                                        node {
                                            expireAfter
                                            author {
                                                id
                                            }
                                        }
                                    }
                                }
                            }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        }"""
        variables_mutation = {
            "title": "Title test",
            "text": "Text test",
            "visible": True,
            "expireAfter": "YEAR",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables_mutation, context=self.user
        )
        query_result = self.client.execute(expireafter_query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["expireAfter"],
            "YEAR",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][0]["node"]["author"]["id"],
            '15',
        )

    def test_16_showPasteBins_afterAddMutation(self) -> None:
        pasteBin = PasteBinFactory()

        query = """query{
                    allPasteBin {
                        edges {
                            node {
                                id
                                title
                                text
                                visible
                                expireAfter
                                author{
                                    id
                                }
                            }
                        }
                    }
                }"""
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        query_result = self.client.execute(query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '23'
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            pasteBin.text,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["expireAfter"],
            pasteBin.expire_after,
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            "16",
        )

    # delete_paste_bin
    def test_17_deletePasteBin_mutation(self) -> None:
        pasteBin = PasteBinFactory()

        id_query = """query{
                        allPasteBin {
                            edges {
                                node {
                                    id
                                    author {
                                        id
                                    }
                                }
                            }
                        }
                    }"""
        add_mutation = """mutation(
                            $title: String!
                            $text: String!
                            $visible: Boolean!
                            $expireAfter: ExpireChoices!){
                        addPasteBin(
                            input: {
                                title: $title ,
                                text: $text ,
                                visible: $visible ,
                                expireAfter: $expireAfter}) {
                                    ok
                                    error
                                    errorCode
                                }
                            } """
        delete_mutation = """mutation(
                                $id: ID!){
                            deletePasteBin(
                                id: $id) {
                                    ok
                                    error
                                    errorCode
                                }
                            }"""
        add_variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        add_mutation_result = self.client.execute(
            add_mutation, variable_values=add_variables, context=self.user
        )
        query_result = self.client.execute(id_query)
        pasteBinID = query_result["data"]["allPasteBin"]["edges"][1]["node"]["id"]
        delete_variables = {"id": pasteBinID}

        delete_mutation_result = self.client.execute(
            delete_mutation, variable_values=delete_variables, context=self.user
        )

        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            add_mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], True)
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["error"], None
        )
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["errorCode"], "OK"
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            '17',
        )

    def test_18_deletePasteBin_dont_own_mutation(self) -> None:
        pasteBin = PasteBinFactory()

        id_query = """query{
                        allPasteBin {
                            edges {
                                node {
                                    id
                                    author {
                                        id
                                    }
                                }
                            }
                        }
                    }"""
        add_mutation = """mutation(
                            $title: String!
                            $text: String!
                            $visible: Boolean!
                            $expireAfter: ExpireChoices!){
                        addPasteBin(
                            input: {
                                title: $title ,
                                text: $text ,
                                visible: $visible ,
                                expireAfter: $expireAfter}) {
                                    ok
                                    error
                                    errorCode
                                }
                            } """
        delete_mutation = """mutation(
                                $id: ID!){
                            deletePasteBin(
                                id: $id) {
                                    ok
                                    error
                                    errorCode
                                }
                            }"""
        add_variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        add_mutation_result = self.client.execute(
            add_mutation, variable_values=add_variables, context=self.user
        )

        query_result = self.client.execute(id_query)
        pasteBinID = query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"]
        delete_variables = {"id": pasteBinID}
        self.user.user.is_superuser = False
        delete_mutation_result = self.client.execute(
            delete_mutation, variable_values=delete_variables, context=self.user
        )

        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            add_mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], False)
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["error"],
            "You can\'t delete paste that you don't own",
        )
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["errorCode"],
            "PERMISSION_DENIED",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            '18',
        )
        self.user.user.is_superuser = True

    def test_19_deletePasteBin_doesnt_exist_mutation(self) -> None:
        delete_mutation = """mutation(
                                $id: ID!){
                            deletePasteBin(
                                id: $id) {
                                    ok
                                    error
                                    errorCode
                                }
                            }"""
        delete_variables = {"id": "-1"}

        delete_mutation_result = self.client.execute(
            delete_mutation, variable_values=delete_variables, context=self.user
        )
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], False)
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["error"],
            "Requested paste doesn't exist",
        )
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["errorCode"],
            "NON_EXISTENT_PASTE",
        )

    def test_20_deletePasteBin_not_logged_in(self) -> None:
        pasteBin = PasteBinFactory()

        class User2:
            user = AnonymousUser()

        id_query = """query{
                        allPasteBin {
                            edges {
                                node {
                                    id
                                    author {
                                        id
                                    }
                                }
                            }
                        }
                    }"""
        add_mutation = """mutation(
                            $title: String!
                            $text: String!
                            $visible: Boolean!
                            $expireAfter: ExpireChoices!){
                        addPasteBin(
                            input: {
                                title: $title ,
                                text: $text ,
                                visible: $visible ,
                                expireAfter: $expireAfter}) {
                                    ok
                                    error
                                    errorCode
                                }
                            } """
        delete_mutation = """mutation(
                                $id: ID!){
                            deletePasteBin(
                                id: $id) {
                                    ok
                                    error
                                    errorCode
                                }
                            }"""
        add_variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        add_mutation_result = self.client.execute(
            add_mutation, variable_values=add_variables, context=self.user
        )
        query_result = self.client.execute(id_query)
        pasteBinID = query_result["data"]["allPasteBin"]["edges"][0]["node"]["id"]
        delete_variables = {"id": pasteBinID}
        delete_mutation_result = self.client.execute(
            delete_mutation, variable_values=delete_variables, context=User2
        )

        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(add_mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            add_mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(delete_mutation_result["data"]["deletePasteBin"]["ok"], False)
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["error"],
            "You need to be logged in",
        )
        self.assertEqual(
            delete_mutation_result["data"]["deletePasteBin"]["errorCode"],
            "NON_EXISTENT_PASTE",
        )
        self.assertEqual(
            query_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            '20',
        )

    # active_paste_bin
    def test_21_activePasteBin(self) -> None:
        pasteBin = PasteBinFactory()

        query = """query{
                    activePasteBin {
                        edges {
                            node {
                                id
                                title
                                text
                                dateOfCreation
                                visible
                                expireAfter
                                author{
                                    id
                                    lastLogin
                                    isSuperuser
                                    username
                                    firstName
                                    lastName
                                    email
                                    isStaff
                                    isActive
                                }
                            }
                        }
                    }
                } """
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["activePasteBin"]["edges"][0]["node"]["id"], '31'
        )
        self.assertEqual(
            query_result["data"]["activePasteBin"]["edges"][0]["node"]["author"]["id"],
            '21',
        )

    # expired_paste_bin
    def test_22_expiredPasteBin(self) -> None:
        pasteBin = PasteBinFactory()

        query = """query{
                    expiredPasteBin {
                        edges {
                            node {
                                id
                                title
                                text
                                dateOfCreation
                                visible
                                expireAfter
                                author{
                                    id
                                    lastLogin
                                    isSuperuser
                                    username
                                    firstName
                                    lastName
                                    email
                                    isStaff
                                    isActive
                                }
                            }
                        }
                    }
                } """
        mutation = """mutation(
                        $title: String!
                        $text: String!
                        $visible: Boolean!
                        $expireAfter: ExpireChoices!){
                    addPasteBin(
                        input: {
                            title: $title ,
                            text: $text ,
                            visible: $visible ,
                            expireAfter: $expireAfter}) {
                                ok
                                error
                                errorCode
                            }
                        } """
        variables = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": "MIN",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        time.sleep(60)
        query_result = self.client.execute(query)

        self.assertEqual(mutation_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_result["data"]["expiredPasteBin"]["edges"][0]["node"]["id"], '33'
        )
        self.assertEqual(
            query_result["data"]["expiredPasteBin"]["edges"][0]["node"]["author"]["id"],
            '22',
        )

    def test_23_allPasteTags(self) -> None:

        query = """query{
                            allPasteTags {
                                edges {
                                    node {
                                        id
                                        tagName
                                        posts{
                                            id
                                            title
                                            text
                                            expireAfter
                                            author{
                                                id
                                                username
                                                firstName
                                                lastName
                                                email
                                            }
                                        }
                                    }
                                }
                            }
                        } """

        query_result = self.client.execute(query)

        self.assertEqual(query_result["data"]["allPasteTags"]["edges"], [])

    def test_24_addPasteTags_1(self) -> None:

        mutation = """mutation($tagName: String){
                        addTag(tagName: $tagName){
                            ok
                            response
                        }
                    }"""
        variables = {
            "tagName": "TEST",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "tag saved")

    def test_25_addPasteTags_2(self) -> None:

        mutation = """mutation($tagName: String){
                        addTag(tagName: $tagName){
                            ok
                            response
                        }
                    }"""
        variables = {
            "tagName": "TEST",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "name already exist")

    def test_26_addPasteTags_3(self) -> None:

        mutation = """mutation($tagName: String){
                        addTag(tagName: $tagName){
                            ok
                            response
                        }
                    }"""
        variables = {
            "tagName": "",
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "no name given")

    def test_27_deletePasteTags_1(self) -> None:

        mutation_add = """mutation($tagName: String){
                                addTag(tagName: $tagName){
                                    ok
                                    response
                                }
                            }"""

        mutation_delete = """mutation($tagName: String){
                        deleteTag(tagName: $tagName){
                            ok
                            error
                            errorCode
                            response
                        }
                    }"""
        variables = {
            "tagName": "TEST"
        }

        mutation_add_result = self.client.execute(
            mutation_add, variable_values=variables, context=self.user
        )
        mutation_delete_result = self.client.execute(
            mutation_delete, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_add_result["data"]["addTag"]["ok"], True)
        self.assertEqual(mutation_add_result["data"]["addTag"]["response"], "tag saved")
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["ok"], True)
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["error"], None)
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["response"], "All done")

    def test_28_deletePasteTags_2(self) -> None:

        mutation_add = """mutation($tagName: String){
                                addTag(tagName: $tagName){
                                    ok
                                    response
                                }
                            }"""

        mutation_delete = """mutation($tagName: String){
                        deleteTag(tagName: $tagName){
                            ok
                            error
                            errorCode
                            response
                        }
                    }"""
        variables = {
            "tagName": "TEST"
        }

        mutation_add_result = self.client.execute(
            mutation_add, variable_values=variables, context=self.user
        )
        self.client.execute(
            mutation_delete, variable_values=variables, context=self.user
        )
        mutation_delete_result = self.client.execute(
            mutation_delete, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_add_result["data"]["addTag"]["ok"], True)
        self.assertEqual(mutation_add_result["data"]["addTag"]["response"], "tag saved")
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["ok"], False)
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["error"], None)
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_delete_result["data"]["deleteTag"]["response"], "No such tag")

    def test_29_editPasteBin_1(self) -> None:
        pasteBin = PasteBinFactory()

        query = """query{
                            allPasteBin {
                                edges {
                                    node {
                                        id
                                        title
                                        text                                        
                                        visible
                                        expireAfter
                                        author{
                                            id                                                                                                                                                                                                                
                                        }
                                    }
                                }
                            }
                        } """
        mutation_add = """mutation(
                                $title: String!
                                $text: String!
                                $visible: Boolean!
                                $expireAfter: ExpireChoices!){
                            addPasteBin(
                                input: {
                                    title: $title ,
                                    text: $text ,
                                    visible: $visible ,
                                    expireAfter: $expireAfter}) {
                                        ok
                                        error
                                        errorCode
                                    }
                                } """
        mutation_edit = """mutation(
                                        $id: ID!
                                        $title: String!
                                        $text: String!
                                        $exposure: Boolean){
                                    editPaste(   
                                            id: $id,                                     
                                            title: $title ,
                                            text: $text ,
                                            exposure: $exposure) {
                                                ok
                                                error
                                                errorCode
                                            }
                                        } """
        variables_add = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after,
        }
        variables_edit = {
            "id": "35",
            "title": "pasteBin.title",
            "text": "pasteBin.text",
            "exposure": False
        }

        mutation_add_result = self.client.execute(
            mutation_add, variable_values=variables_add, context=self.user
        )
        query_afterAdd_result = self.client.execute(query, context=self.user)
        mutation_edit_result = self.client.execute(
            mutation_edit, variable_values=variables_edit, context=self.user
        )
        query_afterEdit_result = self.client.execute(query, context=self.user)

        self.assertEqual(mutation_add_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_add_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_add_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(mutation_edit_result["data"]["editPaste"]["ok"], True)
        self.assertEqual(mutation_edit_result["data"]["editPaste"]["error"], "Paste changed")
        self.assertEqual(
            mutation_edit_result["data"]["editPaste"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '35'
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            pasteBin.text,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["expireAfter"],
            pasteBin.expire_after,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            "29",
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '35'
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            "pasteBin.title",
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            "pasteBin.text",
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["expireAfter"],
            pasteBin.expire_after,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            "29",
        )

    def test_30_editPasteBin_2(self) -> None:
        pasteBin = PasteBinFactory()

        query = """query{
                            allPasteBin {
                                edges {
                                    node {
                                        id
                                        title
                                        text                                        
                                        visible
                                        expireAfter
                                        author{
                                            id                                                                                          
                                        }
                                    }
                                }
                            }
                        } """
        mutation_add = """mutation(
                                $title: String!
                                $text: String!
                                $visible: Boolean!
                                $expireAfter: ExpireChoices!){
                            addPasteBin(
                                input: {
                                    title: $title ,
                                    text: $text ,
                                    visible: $visible ,
                                    expireAfter: $expireAfter}) {
                                        ok
                                        error
                                        errorCode
                                    }
                                } """
        mutation_edit = """mutation(
                                        $id: ID!
                                        $title: String!
                                        $text: String!
                                        $exposure: Boolean){
                                    editPaste(   
                                            id: $id,                                     
                                            title: $title ,
                                            text: $text ,
                                            exposure: $exposure) {
                                                ok
                                                error
                                                errorCode
                                            }
                                        } """
        mutation_addUser = """mutation(
                                $confirmPassword: String!
                                $email: String!
                                $password: String!
                                $username: String!){
                            addUser(
                                confirmPassword: $confirmPassword,
                                email: $email,
                                password: $password,
                                username: $username){
                                    ok
                                    response
                                }
                            } """
        variables_addUser = {
            "confirmPassword": self.user.user.password,
            "email": self.user.user.email,
            "password": self.user.user.password,
            "username": "Test02",
        }

        variables_add = {
            "title": pasteBin.title,
            "text": pasteBin.text,
            "visible": pasteBin.visible,
            "expireAfter": pasteBin.expire_after
        }
        variables_edit = {
            "id": "37",
            "title": "pasteBin.title",
            "text": "pasteBin.text",
            "exposure": False
        }

        mutation_addUser_result = self.client.execute(mutation_addUser, variable_values=variables_addUser)
        mutation_add_result = self.client.execute(
            mutation_add, variable_values=variables_add, context=self.user
        )
        query_afterAdd_result = self.client.execute(query, context=self.user)

        class User2:
            user=User.objects.get(pk=31)
        user2=User2()

        mutation_edit_result = self.client.execute(
            mutation_edit, variable_values=variables_edit, context=user2
        )
        query_afterEdit_result = self.client.execute(query, context=self.user)

        self.assertEqual(mutation_addUser_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_add_result["data"]["addPasteBin"]["ok"], True)
        self.assertEqual(mutation_add_result["data"]["addPasteBin"]["error"], None)
        self.assertEqual(
            mutation_add_result["data"]["addPasteBin"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(mutation_edit_result["data"]["editPaste"]["ok"], False)
        self.assertEqual(mutation_edit_result["data"]["editPaste"]["error"], "Not your paste")
        self.assertEqual(
            mutation_edit_result["data"]["editPaste"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '37'
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            pasteBin.text,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["expireAfter"],
            pasteBin.expire_after,
        )
        self.assertEqual(
            query_afterAdd_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            "30",
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["id"], '37'
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["title"],
            pasteBin.title,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["text"],
            pasteBin.text,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["visible"],
            pasteBin.visible,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["expireAfter"],
            pasteBin.expire_after,
        )
        self.assertEqual(
            query_afterEdit_result["data"]["allPasteBin"]["edges"][1]["node"]["author"]["id"],
            "30",
        )


