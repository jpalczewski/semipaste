# Django
from django.contrib.auth.models import AnonymousUser

# 3rd-Party
import graphene
from graphene.test import Client
from graphene_django.utils.testing import GraphQLTestCase

# Project
from schema import Mutation, Query
from users.factories import UserFactory


class TestReportUsers(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        class User2:
            user = AnonymousUser()

        self.user=User
        self.contextUser = User
        self.contextAnonymousUser = User2
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showUserReports_beforeReportUser(self) -> None:
        query = """query{
                        userReports {
                            edges {
                                node {
                                    id
                                    reason
                                    user{
                                        id
                                        username
                                        firstName
                                        lastName
                                        email                                                                                                                        
                                      }                                    
                                    author{
                                        id
                                    }
                                }
                            }
                        }
                    }"""

        query_result = self.client.execute(query, context=self.contextUser)

        self.assertEqual(query_result["data"]["userReports"]["edges"], [])

    def test_02_reportUser_mutation(self) -> None:
        mutation = """mutation(
                      $uid: ID!
                      $reason: String!){
                      reportUser(
                        input:{
                            uid: $uid,
                            reason: $reason})
                        {
                          ok
                          error
                          errorCode
                          clientMutationId
                        }
                    }"""

        variables = {
            "uid": 44,
            "reason": "Reason test 02"
        }

        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)

        self.assertEqual(mutation_result["data"]["reportUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["reportUser"]["error"], None)
        self.assertEqual(mutation_result["data"]["reportUser"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["reportUser"]["clientMutationId"], None)

    def test_03_reportUser_mutation_userNotLogged(self) -> None:
        mutation = """mutation(
                              $uid: ID!
                              $reason: String!){
                              reportUser(
                                input:{
                                    uid: $uid,
                                    reason: $reason})
                                {
                                  ok
                                  error
                                  errorCode
                                  clientMutationId
                                }
                            }"""

        variables = {
            "uid": 31,
            "reason": "Reason test 03"
        }

        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.contextAnonymousUser)

        self.assertEqual(mutation_result["data"]["reportUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["reportUser"]["error"], "You need to be logged in")
        self.assertEqual(mutation_result["data"]["reportUser"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["reportUser"]["clientMutationId"], None)

    def test_04_reportUser_mutation_pasteNotFound(self) -> None:
        mutation = """mutation(
                              $uid: ID!
                              $reason: String!){
                              reportUser(
                                input:{
                                    uid: $uid,
                                    reason: $reason})
                                {
                                  ok
                                  error
                                  errorCode
                                  clientMutationId
                                }
                            }"""

        variables = {
            "uid": 999,
            "reason": "Reason test 04"
        }

        mutation_result = self.client.execute(mutation, variable_values=variables, context=self.user)

        self.assertEqual(mutation_result["data"]["reportUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["reportUser"]["error"], "Reported user not found")
        self.assertEqual(mutation_result["data"]["reportUser"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["reportUser"]["clientMutationId"], None)

    def test_05_reportUser_correctData(self) -> None:
        query = """query{
                        userReports {
                            edges {
                                node {
                                    id
                                    reason
                                    user{
                                        id
                                        username
                                        firstName
                                        lastName
                                        email                                                                                                                        
                                      }                                    
                                    author{
                                        id
                                    }
                                }
                            }
                        }
                    }"""

        mutation = """mutation(
                              $uid: ID!
                              $reason: String!){
                              reportUser(
                                input:{
                                    uid: $uid,
                                    reason: $reason})
                                {
                                  ok
                                  error
                                  errorCode
                                  clientMutationId
                                }
                            }"""

        variables = {
            "uid": 47,
            "reason": "Reason test 05"
        }

        self.client.execute(mutation, variable_values=variables, context=self.user)
        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["reason"], "Reason test 05")
        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["user"]["id"], "47")
        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["user"]["username"],
                         self.user.user.username)
        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["user"]["firstName"],
                         self.user.user.first_name)
        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["user"]["lastName"],
                         self.user.user.last_name)
        self.assertEqual(query_result["data"]["userReports"]["edges"][0]["node"]["user"]["email"],
                         self.user.user.email)

    def test_06_isNotSuperuser(self) -> None:
        query = """query{
                        userReports {
                            edges {
                                node {
                                    id
                                    reason
                                    user{
                                        id
                                        username
                                        firstName
                                        lastName
                                        email                                                                                                                        
                                      }                                    
                                    author{
                                        id
                                    }
                                }
                            }
                        }
                    }"""

        mutation = """mutation(
                              $uid: ID!
                              $reason: String!){
                              reportUser(
                                input:{
                                    uid: $uid,
                                    reason: $reason})
                                {
                                  ok
                                  error
                                  errorCode
                                  clientMutationId
                                }
                            }"""

        variables = {
            "uid": 35,
            "reason": "Reason test 02"
        }

        self.client.execute(mutation, variable_values=variables, context=self.user)
        self.user.user.is_superuser = False
        query_result = self.client.execute(query, context=self.user)

        self.assertEqual(query_result["data"]["userReports"]["edges"], [])
