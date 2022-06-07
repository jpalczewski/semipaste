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

# Local
from ..factories import PasteBinFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        self.user = User
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_addTag_01(self)->None:
        mutation="""mutation($tagName: String){
                        addTag(tagName: $tagName){
   	                        ok
                            response
                        }
                    }"""
        variables={
            "tagName": "Test"
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "tag saved")

    def test_02_addTag_02(self)->None:
        mutation = """mutation($tagName: String){
                                addTag(tagName: $tagName){
           	                        ok
                                    response
                                }
                            }"""
        variables = {
            "tagName": "Test"
        }

        self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "name already exist")

    def test_03_addTag_03(self)->None:
        mutation = """mutation($tagName: String){
                                addTag(tagName: $tagName){
           	                        ok
                                    response
                                }
                            }"""
        variables = {
            "tagName": ""
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["addTag"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addTag"]["response"], "no name given")

    def test_04_deleteTag_01(self)->None:
        mutation_add = """mutation($tagName: String){
                                        addTag(tagName: $tagName){
                   	                        ok
                                            response
                                        }
                                    }"""
        variables_add = {
            "tagName": "Test"
        }
        mutation_delete = """mutation($tagName: String){
                                deleteTag(tagName: $tagName){
           	                        ok
           	                        error
           	                        errorCode
                                    response
                                }
                            }"""
        variables_delete = {
            "tagName": "Test"
        }

        self.client.execute(
            mutation_add, variable_values=variables_add, context=self.user
        )
        mutation_result = self.client.execute(
            mutation_delete, variable_values=variables_delete, context=self.user
        )

        self.assertEqual(mutation_result["data"]["deleteTag"]["ok"], True)
        self.assertEqual(mutation_result["data"]["deleteTag"]["error"], None)
        self.assertEqual(mutation_result["data"]["deleteTag"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["deleteTag"]["response"], "All done")

    def test_05_deleteTag_02(self)->None:
        mutation = """mutation($tagName: String){
                                        deleteTag(tagName: $tagName){
                   	                        ok
                   	                        error
                   	                        errorCode
                                            response
                                        }
                                    }"""
        variables = {
            "tagName": "Test"
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["deleteTag"]["ok"], False)
        self.assertEqual(mutation_result["data"]["deleteTag"]["error"], None)
        self.assertEqual(mutation_result["data"]["deleteTag"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["deleteTag"]["response"], "No such tag")