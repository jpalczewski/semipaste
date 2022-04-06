# Django
from django.test import TestCase

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query


class TestSchema(TestCase):

    def setUp(self) -> None:
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showAllUsers_beforeAddMutation(self) -> None:
        query = """query{allUsers{edges{node{id lastLogin isSuperuser username firstName lastName email isStaff 
        isActive}}}} """
        query_result = self.client.execute(query)
        self.assertEqual(query_result["data"]["allUsers"]["edges"], [])
