# Django
from django.contrib.auth.models import AnonymousUser

# 3rd-Party
import graphene
from graphene.test import Client
from graphene_django.utils.testing import GraphQLTestCase

# Project
from pastes.factories import PasteBinFactory
from schema import Mutation, Query
from users.factories import UserFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        class User2:
            user = AnonymousUser()

        self.pasteBin = PasteBinFactory()
        self.user = User
        self.anonymousUser = User2
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showPasteReports_beforeReportPaste(self) -> None:
        query = """query{
                        pasteReports {
                            edges {
                                node {
                                    id
                                    reason
                                    paste{
                                        id
                                        title
                                        text
                                        visible
                                        expireAfter
                                        author{
                                            id
                                        }
                                        language
                                      }
                                    author{
                                        id
                                    }
                                }
                            }
                        }
                    }"""

        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(query_result["data"]["pasteReports"]["edges"], [])

    def test_02_reportPaste_mutation(self) -> None:
        mutation = """mutation(
                      $pid: ID!
                      $reason: String!){
                      reportPaste(
                        input:{
                            pid: $pid,
                            reason: $reason})
                        {
                          ok
                          error
                          errorCode
                          clientMutationId
                        }
                    }"""

        variables = {"pid": self.pasteBin.id, "reason": "Reason test 02"}

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["reportPaste"]["ok"], True)
        self.assertEqual(mutation_result["data"]["reportPaste"]["error"], None)
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["clientMutationId"], None
        )

    def test_03_reportPaste_mutation_userNotLogged(self) -> None:
        mutation = """mutation(
                      $pid: ID!
                      $reason: String!){
                      reportPaste(
                        input:{
                            pid: $pid,
                            reason: $reason})
                        {
                          ok
                          error
                          errorCode
                          clientMutationId
                        }
                    }"""

        variables = {"pid": self.pasteBin.id, "reason": "Reason test 03"}

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.anonymousUser
        )

        self.assertEqual(mutation_result["data"]["reportPaste"]["ok"], False)
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["error"], "You need to be logged in"
        )
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["clientMutationId"], None
        )

    def test_04_reportPaste_mutation_pasteNotFound(self) -> None:
        mutation = """mutation(
                      $pid: ID!
                      $reason: String!){
                      reportPaste(
                        input:{
                            pid: $pid,
                            reason: $reason})
                        {
                          ok
                          error
                          errorCode
                          clientMutationId
                        }
                    }"""

        variables = {"pid": 999, "reason": "Reason test 04"}

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["reportPaste"]["ok"], False)
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["error"], "Reported paste not found"
        )
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["errorCode"], "POSSIBLE_FAILURE"
        )
        self.assertEqual(
            mutation_result["data"]["reportPaste"]["clientMutationId"], None
        )

    def test_05_reportPaste_correctData(self) -> None:
        query = """query{
                    pasteReports {
                        edges {
                            node {
                                id
                                reason
                                paste{
                                    id
                                    title
                                    text
                                    visible
                                    expireAfter
                                    author{
                                        id
                                    }
                                    language
                                  }
                                author{
                                    id
                                }
                            }
                        }
                    }
                }"""

        mutation = """mutation(
                      $pid: ID!
                      $reason: String!){
                      reportPaste(
                        input:{
                            pid: $pid,
                            reason: $reason})
                        {
                          ok
                          error
                          errorCode
                          clientMutationId
                        }
                    }"""

        variables = {"pid": self.pasteBin.id, "reason": "Reason test 05"}

        self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["reason"],
            "Reason test 05",
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"]["id"],
            f"{self.pasteBin.id}",
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"]["title"],
            self.pasteBin.title,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"]["text"],
            self.pasteBin.text,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"][
                "visible"
            ],
            self.pasteBin.visible,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"][
                "expireAfter"
            ],
            self.pasteBin.expire_after,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"]["author"],
            self.pasteBin.author,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["paste"][
                "language"
            ],
            self.pasteBin.language,
        )
        self.assertEqual(
            query_result["data"]["pasteReports"]["edges"][0]["node"]["author"]["id"],
            f"{self.user.user.id}",
        )

    def test_06_isNotSuperuser(self) -> None:
        query = """query{
                    pasteReports {
                        edges {
                            node {
                                id
                                reason
                                paste{
                                    id
                                    title
                                    text
                                    visible
                                    expireAfter
                                    author{
                                        id
                                    }
                                    language
                                  }
                                author{
                                    id
                                }
                            }
                        }
                    }
                }"""

        mutation = """mutation(
                              $pid: ID!
                              $reason: String!){
                              reportPaste(
                                input:{
                                    pid: $pid,
                                    reason: $reason})
                                {
                                  ok
                                  error
                                  errorCode
                                  clientMutationId
                                }
                            }"""

        variables = {"pid": self.pasteBin.id, "reason": "Reason test 06"}

        self.client.execute(mutation, variable_values=variables, context=self.user)
        self.user.user.is_superuser = False
        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(query_result["data"]["pasteReports"]["edges"], [])
